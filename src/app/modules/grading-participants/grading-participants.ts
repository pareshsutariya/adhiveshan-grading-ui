import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";
import { Participant, Grade, GradingCriteria } from "../../models/_index";

import { MessageService } from "primeng/api";
import { BaseComponent } from "../base-component/baseComponent";
import { HttpErrorResponse } from "@angular/common/http";
import { Table } from "primeng/table";

@Component({
  selector: "app-grading-participants",
  imports: [AngularModules, PrimeNgModules],
  providers: [MessageService],
  templateUrl: "grading-participants.html",
})
export class GradingParticipants extends BaseComponent implements OnInit {

    judgeSkillCategories: any[] = [];
    participantBAPSId: string | undefined = "AL6415001";
    participant: Participant | undefined;
    loginUserId: number = 1;
    searchError: string | undefined;
    selectedSkillCategory: string | undefined;
    selectedSkillCategoryColor: string | undefined;
    participantGrades = signal<Grade[]>([]);
    gradingCriterias = signal<GradingCriteria[]>([]);
    dialog: boolean = false;

    ngOnInit() {
        this.loadData();
    }

    loadData(){
        this.layoutService.isDataLoading.set(true);

        // TODO : Get login user roles and assigned skills, and display the tabs accordingly
        this.usersService.GetById(this.loginUserId).subscribe(response=>{
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

    onChangeCandidateMISId($event: any) {
        this.participant = {};
    }

    searchParticipant(skillCategory: string){

        this.participant = {};

        if(!this.participantBAPSId){
            this.messageService.add({ severity: "error", summary: "Validation", detail: "Please enter valid MIS Id", life: 3000 });
            return;
        }

        this.layoutService.isDataLoading.set(true);

        this.participantsService.GetParticipantForJudging(this.participantBAPSId, this.loginUserId)
        .subscribe({
            next: (data: any) => {
                
                this.searchError = undefined;
                this.layoutService.isDataLoading.set(false);

                this.participant = JSON.parse(data);
                if(!this.participant){
                    this.messageService.add({ severity: "error", summary: "Validation", detail: `Participant not found for the given MIS Id:${this.participantBAPSId}`, life: 3000 });
                    return;
                }
                else {
                    //this.getParticipantGrades();
                }
            },
            error: (err) => {

                this.searchError = err.error;
                console.log(err);

                this.messageService.add({ severity: "error", summary: "Validation", detail: `${err.error}`, life: 3000 });
                this.layoutService.isDataLoading.set(false);
            }
          });
    }

    getParticipantGrades(){
        this.layoutService.isDataLoading.set(true);

        this.gradesService.GetForParticipantAndJudge(this.participantBAPSId!, this.selectedSkillCategory!, this.loginUserId).subscribe(response=>{
            this.participantGrades.set(response.data);

            this.layoutService.isDataLoading.set(false);
        });
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

    hideDialog() {
        this.dialog = false;
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
        model.judgeUserId= this.loginUserId;
        
        this.gradesService.Save(model).subscribe(data=>{
            this.layoutService.isDataLoading.set(false);
            this.messageService.add({ severity: "success", summary: "Success", detail: "Grade updated successfully", life: 3000 });
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