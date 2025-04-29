import { Component, OnInit } from "@angular/core";
import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";
import { MessageService } from "primeng/api";
import { BaseComponent } from "../../services/_baseComponent";

@Component({
  selector: "app-grading-participants",
  imports: [AngularModules, PrimeNgModules],
  providers: [MessageService],
  templateUrl: "grading-participants.html",
})
export class GradingParticipants extends BaseComponent implements OnInit {

    proctorSkillCategories: any[] = [];

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
}