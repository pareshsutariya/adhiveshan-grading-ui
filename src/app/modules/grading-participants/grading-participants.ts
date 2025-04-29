import { Component, OnInit } from "@angular/core";
import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";
import { MessageService } from "primeng/api";
import { BaseComponent } from "../../services/_baseComponent";
import { Participant } from "../../models/participant";

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

    ngOnInit() {
        this.loadData();
    }

    loadData(){

        // TODO : Get login user roles and assigned skills, and display the tabs accordingly
        this.usersService.GetById(1).subscribe(user=>{
            this.proctorSkillCategories = [];
            if(user.assignedSkillCategories){
                this.proctorSkillCategories = this.constants.SkillCategories.filter((s: { label: string; title: string; })=> user.assignedSkillCategories!.indexOf(s.label) >=0 );
            }
        });
    }

    searchByMisId(){

        if(!this.participantMISId || this.participantMISId <= 0){
            this.messageService.add({ severity: "error", summary: "Validation", detail: "Please enter valid MIS Id", life: 3000 });
            return;
        }

        this.participantsService.GetByMisId(this.participantMISId).subscribe(data=>{

            this.participant = data;
            if(!this.participant){
                this.messageService.add({ severity: "error", summary: "Validation", detail: `Participant not found for the given MIS Id:${this.participantMISId}`, life: 3000 });
                return;
            }
        });
    }
}