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
    participantMISId: number | undefined;
    participant: Participant | undefined;
    loginUserId: number = 1;

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

    searchByMisId(skillCategory: string){

        if(!this.participantMISId || this.participantMISId <= 0){
            this.messageService.add({ severity: "error", summary: "Validation", detail: "Please enter valid MIS Id", life: 3000 });
            return;
        }

        this.layoutService.isDataLoading.set(true);

        this.participantsService.GetCandidateForProctoring(this.participantMISId, skillCategory, this.loginUserId)
        .subscribe({
            next: (data: any) => {
                
                console.log(data);
                
                this.layoutService.isDataLoading.set(false);

                this.participant = data;
                if(!this.participant){
                    this.messageService.add({ severity: "error", summary: "Validation", detail: `Participant not found for the given MIS Id:${this.participantMISId} for ${skillCategory}`, life: 3000 });
                    return;
                }
            },
            error: (err) => {

                console.log(err);

                this.messageService.add({ severity: "error", summary: "Validation", detail: `${err.error}`, life: 3000 });
                this.layoutService.isDataLoading.set(false);
            }
          });
    }
}