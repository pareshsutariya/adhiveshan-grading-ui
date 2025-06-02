import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";
import { Participant, EventCheckIn, ServiceResponse, CompetitionEvent } from "../../models/_index";

import { BaseComponent } from "../base-component/baseComponent";
import { Table } from "primeng/table";
import { Providers } from "../../models/_providers";

@Component({
  selector: "app-check-in-report",
  imports: [AngularModules, PrimeNgModules],
  providers: [Providers],
  templateUrl: "check-in-report.html",
})
export class CheckInReport extends BaseComponent implements OnInit {

    events = signal<CompetitionEvent[]>([]);
    selectedEventId: number | undefined;
    participants = signal<Participant[]>([]);
    
    ngOnInit() {
        this.loadData();
    }

    loadData() {
        this.layoutService.isDataLoading.set(true);
        this.eventsService.GetEventsForLoginUser(this.authService.GetLoginUserBAPSId()).subscribe(response => { 
            this.events.set(response.data);
            this.layoutService.isDataLoading.set(false);
        });
    }

    onEventChange($event: any) {
       
        this.participants.set([]);

        if(!this.selectedEventId){
            this.messageService.add({ severity: "error", summary: "Validation", detail: "Please select an event", life: 3000 });
            return;
        }

        this.layoutService.isDataLoading.set(true);

        this.eventCheckInService.GetCheckedInParticipants(this.selectedEventId).subscribe((response: ServiceResponse) => {
            
            console.log(response)

            this.layoutService.isDataLoading.set(false);

            if(response.isSuccessful) { 
                this.participants.set(response.data)    ;
                return;
            }
            else {
                this.messageService.add({ severity: "error", summary: "Validation", detail: response.errorMessage, life: 3000 });
                return;
            }
        });
    }
}
