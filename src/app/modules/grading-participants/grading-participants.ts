import { Component, OnInit } from "@angular/core";
import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";
import { MessageService } from "primeng/api";
import { BaseComponent } from "../../services/_baseComponent";
import { Participant } from "../../models/participant";
import { HttpErrorResponse } from "@angular/common/http";

@Component({
  selector: "app-grading-participants",
  imports: [AngularModules, PrimeNgModules],
  providers: [MessageService],
  templateUrl: "grading-participants.html",
})
export class GradingParticipants extends BaseComponent implements OnInit {

    proctorSkillCategories: any[] = [];
    participantMISId: number | undefined = 2183256;
    participant: Participant | undefined;
    loginUserId: number = 1;
    searchError: string | undefined;
    selectedSkillCategory: string | undefined;

    ngOnInit() {
        this.loadData();
    }

    loadData(){
        this.layoutService.isDataLoading.set(true);

        // TODO : Get login user roles and assigned skills, and display the tabs accordingly
        this.usersService.GetById(this.loginUserId).subscribe(user=>{
            this.proctorSkillCategories = [];
            if(user.assignedSkillCategories){
                this.proctorSkillCategories = this.constants.SkillCategories.filter((s: { label: string; title: string; })=> user.assignedSkillCategories!.indexOf(s.label) >=0 );
            }

            this.layoutService.isDataLoading.set(false);
        });
    }

    onTabChange($event: any){
        this.participant = {};
        this.searchError = undefined;
        this.selectedSkillCategory = $event;
        console.log($event);
    }

    searchParticipant(skillCategory: string){

        this.participant = {};

        if(!this.participantMISId || this.participantMISId <= 0){
            this.messageService.add({ severity: "error", summary: "Validation", detail: "Please enter valid MIS Id", life: 3000 });
            return;
        }

        this.layoutService.isDataLoading.set(true);

        this.participantsService.GetParticipantForProctoring(this.participantMISId, skillCategory, this.loginUserId)
        .subscribe({
            next: (data: any) => {
                
                this.searchError = undefined;
                this.layoutService.isDataLoading.set(false);

                this.participant = JSON.parse(data);
                if(!this.participant){
                    this.messageService.add({ severity: "error", summary: "Validation", detail: `Participant not found for the given MIS Id:${this.participantMISId} for ${skillCategory}`, life: 3000 });
                    return;
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
}