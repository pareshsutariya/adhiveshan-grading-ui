import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";
import { MessageService } from "primeng/api";
import { BaseComponent } from "../../services/_baseComponent";
import { Participant } from "../../models/participant";
import { HttpErrorResponse } from "@angular/common/http";
import { GradingTopic } from "../../models/grading-topic";
import { Table } from "primeng/table";
import { Grade } from "../../models/grade";

@Component({
  selector: "app-grading-participants",
  imports: [AngularModules, PrimeNgModules],
  providers: [MessageService],
  templateUrl: "grading-participants.html",
})
export class GradingParticipants extends BaseComponent implements OnInit {

    judgeSkillCategories: any[] = [];
    participantMISId: number | undefined = 2183256;
    participant: Participant | undefined;
    loginUserId: number = 1;
    searchError: string | undefined;
    selectedSkillCategory: string | undefined;
    selectedSkillCategoryColor: string | undefined;
    participantGrades = signal<Grade[]>([]);
    gradingTopics = signal<GradingTopic[]>([]);
    dialog: boolean = false;

    ngOnInit() {
        this.loadData();
    }

    loadData(){
        this.layoutService.isDataLoading.set(true);

        // TODO : Get login user roles and assigned skills, and display the tabs accordingly
        this.usersService.GetById(this.loginUserId).subscribe(user=>{
            this.judgeSkillCategories = [];
            if(user.assignedSkillCategories){
                this.judgeSkillCategories = this.constants.SkillCategories.filter((s: { label: string; title: string; })=> user.assignedSkillCategories!.indexOf(s.label) >=0 );
            }

            this.layoutService.isDataLoading.set(false);
        });
    }

    onTabChange($event: any){
        this.participant = {};
        this.searchError = undefined;
        this.selectedSkillCategory = $event;
        this.selectedSkillCategoryColor = this.judgeSkillCategories.filter(c=>c.value == this.selectedSkillCategory)[0]?.color;
        console.log($event);
    }

    searchParticipant(skillCategory: string){

        this.participant = {};

        if(!this.participantMISId || this.participantMISId <= 0){
            this.messageService.add({ severity: "error", summary: "Validation", detail: "Please enter valid MIS Id", life: 3000 });
            return;
        }

        this.layoutService.isDataLoading.set(true);

        this.participantsService.GetParticipantForJudging(this.participantMISId, skillCategory, this.loginUserId)
        .subscribe({
            next: (data: any) => {
                
                this.searchError = undefined;
                this.layoutService.isDataLoading.set(false);

                this.participant = JSON.parse(data);
                if(!this.participant){
                    this.messageService.add({ severity: "error", summary: "Validation", detail: `Participant not found for the given MIS Id:${this.participantMISId} for ${skillCategory}`, life: 3000 });
                    return;
                }
                else {
                    this.getParticipantGrades();
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

    // getBySkillCategory(){
    //     this.layoutService.isDataLoading.set(true);

    //     this.gradingTopicsService.GetBySkillCategory(this.selectedSkillCategory!)
    //     .subscribe({
    //         next: (data: any) => {

    //             console.log(data);

    //             this.layoutService.isDataLoading.set(false);
    //             this.gradingTopics.set(data);
    //         }
    //       });
    // }

    getParticipantGrades(){
        this.layoutService.isDataLoading.set(true);

        this.gradesService.GetForParticipantAndJudge(this.participantMISId!, this.selectedSkillCategory!, this.loginUserId).subscribe(data=>{
            this.participantGrades.set(data);

            this.layoutService.isDataLoading.set(false);
        });
    }

    startGrading() {
        this.dialog = true;

        this.getParticipantGrades();
    }

    hideDialog() {
        this.dialog = false;
    }

    onGradeChanged(model: Grade){

        if(model.marks! > model.maximumMarks!)
            return;

        this.layoutService.isDataLoading.set(true);

        model.misId= this.participantMISId;
        model.judgeUserId= this.loginUserId;
        
        this.gradesService.Save(model).subscribe(data=>{
            this.layoutService.isDataLoading.set(false);
            this.messageService.add({ severity: "success", summary: "Success", detail: "Grade updated successfully", life: 3000 });
        });
    }
}