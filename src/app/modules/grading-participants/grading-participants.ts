import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";
import { Participant, Grade, GradingCriteria, ServiceResponse } from "../../models/_index";
import { ConfirmDialog } from 'primeng/confirmdialog';

import { ConfirmationService, MessageService } from "primeng/api";
import { BaseComponent } from "../base-component/baseComponent";
import { HttpErrorResponse } from "@angular/common/http";
import { Table } from "primeng/table";
import { Providers } from "../../models/_providers";

@Component({
  selector: "app-grading-participants",
  imports: [AngularModules, PrimeNgModules, ConfirmDialog],
  providers: [Providers, ConfirmationService],
  templateUrl: "grading-participants.html",
})
export class GradingParticipants extends BaseComponent implements OnInit {

    judgeSkillCategories: any[] = [];
    participantBAPSId: string | undefined = "AL6415001";
    participant: Participant | undefined;
    searchError: string | undefined;
    selectedSkillCategory: string | undefined;
    selectedSkillCategoryColor: string | undefined;
    participantGrades = signal<Grade[]>([]);
    //gradingCriterias = signal<GradingCriteria[]>([]);
    dialog: boolean = false;
    gradedTopicCounts: number = 0;
    topicsCounts: number = 0;
    
    ngOnInit() {
        this.loadData();
    }

    loadData(){
        this.layoutService.isDataLoading.set(true);

        // TODO : Get login user roles and assigned skills, and display the tabs accordingly
        this.usersService.GetById(this.authService.GetLoginUserId()).subscribe(response=>{
            this.judgeSkillCategories = [];
            if(response.data.assignedSkillCategories){
                this.judgeSkillCategories = this.constants.SkillCategories.filter((s: { label: string; title: string; })=> response.data.assignedSkillCategories!.indexOf(s.label) >=0 );
            }

            this.layoutService.isDataLoading.set(false);
        });
    }

    onTabChange($event: any){
        this.participant = {};
        this.searchError = undefined;
        console.log($event);
    }

    onChangeCandidateBAPSId($event: any) {
        this.participant = {};
    }

    searchParticipant(skillCategory: string){

        this.participant = {};

        if(!this.participantBAPSId){
            this.messageService.add({ severity: "error", summary: "Validation", detail: "Please enter valid MIS Id", life: 3000 });
            return;
        }

        this.layoutService.isDataLoading.set(true);

        this.participantsService.GetParticipantForJudging(this.participantBAPSId, this.authService.GetLoginUserId()).subscribe((response: ServiceResponse) => {
            
            this.searchError = undefined;
            this.layoutService.isDataLoading.set(false);

            if(response.isSuccessful) { 
                this.participant = response.data;
                return;
            }
            else {
                this.searchError = response.errorMessage;
                this.messageService.add({ severity: "error", summary: "Validation", detail: this.searchError, life: 3000 });
                return;
            }
        });
    }

    getParticipantGrades(){
        this.layoutService.isDataLoading.set(true);

        this.gradesService.GetForParticipantAndJudge(this.participantBAPSId!, this.selectedSkillCategory!, this.authService.GetLoginUserId()).subscribe(response=>{
            this.participantGrades.set(response.data);

            this.layoutService.isDataLoading.set(false);

            this.performCount();
        });
    }

    performCount(){
        this.topicsCounts = this.participantGrades().length;
        this.gradedTopicCounts = this.participantGrades().filter(c=>c.marks && c.marks > 0).length;
    }

    startGrading(skill: string, category: string) {
        this.dialog = true;

        category = category.replace("(", "").replace(")", "").replace("Gujarati", "").replace("English", "").trim();
        let skillCategory = `${skill}: ${category}`;

        this.selectedSkillCategory = skillCategory;
        this.selectedSkillCategoryColor = this.judgeSkillCategories.filter(c=>c.value == skillCategory)[0]?.color;

        console.log(skillCategory, this.judgeSkillCategories, this.selectedSkillCategoryColor);

        this.getParticipantGrades();
    }

    onDialogHide($event: Event) {
        if (this.gradedTopicCounts < this.topicsCounts) {
            $event.stopPropagation();

            // Prevents PrimeNG to close dialog by intercepting event
            this.confirmationService.confirm({
                //target: event.target as EventTarget,
                message: 'Are you sure that you want to proceed?',
                header: `Graded ${this.gradedTopicCounts} of ${this.topicsCounts} topics`,
                closable: true,
                closeOnEscape: true,
                icon: 'pi pi-exclamation-triangle',
                rejectButtonProps: { label: 'Cancel', severity: 'secondary', outlined: true },
                acceptButtonProps: { label: 'Continue', severity: 'danger',  },
                accept: () => {
                    this.dialog = false;
                    // this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted' });
                },
                reject: () => {
                    this.dialog = true;
                    // this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
                },
            });
        }
    }

    isRoundedToHalf(num: number): boolean {
       return num * 2 === Math.round(num * 2);
    }

    roundUpToHalf(num: number): number {
       return Math.ceil(num * 2) / 2;
    }

    onGradeChanged(model: Grade){

        if(model.marks! < 0 || model.marks! > model.maximumMarks!)
            return;

        // if(!this.isRoundedToHalf(model.marks!)) {
        //     this.messageService.add({ severity: "error", summary: "Validation", detail: `${model.marks} is not a valid number`, life: 3000 });
        //     return;
        // }

        model.marks = this.roundUpToHalf(model.marks!);

        this.layoutService.isDataLoading.set(true);

        model.bapsId = this.participantBAPSId;
        model.judgeUserId= this.authService.GetLoginUserId();
        
        this.gradesService.Save(model).subscribe(data=>{
            this.layoutService.isDataLoading.set(false);
            this.messageService.add({ severity: "success", summary: "Success", detail: "Grade updated successfully", life: 3000 });
            this.performCount();
        });
    }
}

// getBySkillCategory(){
//     this.layoutService.isDataLoading.set(true);

//     this.gradingCriteriasService.GetBySkillCategory(this.selectedSkillCategory!)
//     .subscribe({
//         next: (data: any) => {

//             console.log(data);

//             this.layoutService.isDataLoading.set(false);
//             this.gradingCriterias.set(data);
//         }
//       });
// }