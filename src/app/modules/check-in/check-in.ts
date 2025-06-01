import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";
import { Participant, EventCheckIn, ServiceResponse } from "../../models/_index";

import { BaseComponent } from "../base-component/baseComponent";
import { Table } from "primeng/table";
import { Providers } from "../../models/_providers";

@Component({
  selector: "app-check-in",
  imports: [AngularModules, PrimeNgModules],
  providers: [Providers],
  templateUrl: "check-in.html",
})
export class CheckIn extends BaseComponent implements OnInit {

    participantBAPSId: string | undefined;
    participant: Participant | undefined;
    searchError: string | undefined;
    
    ngOnInit() {
    }

    onChangeCandidateBAPSId($event: any) {
        this.participant = {};
    }

    searchParticipant(){

        this.participant = {};

        if(!this.participantBAPSId){
            this.messageService.add({ severity: "error", summary: "Validation", detail: "Please enter valid BAPS Id", life: 3000 });
            return;
        }

        this.layoutService.isDataLoading.set(true);

        this.participantsService.GetParticipantForCheckIn(this.participantBAPSId, this.authService.GetLoginUserId()).subscribe((response: ServiceResponse) => {
            
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

    onCheckIn(){

        this.layoutService.isDataLoading.set(true);

        let model: EventCheckIn = {};
        model.participantBAPSId = this.participantBAPSId;
        model.loginUserId = this.authService.GetLoginUserId();
        model.participantBAPSId = this.participantBAPSId;
        
        this.eventCheckInService.CheckIn(model).subscribe(data=>{
            this.layoutService.isDataLoading.set(false);
            this.messageService.add({ severity: "success", summary: "Success", detail: "Participant Checked In successfully", life: 3000 });
        });
    }
}
