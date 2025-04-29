import { Component, OnInit, signal, ViewChild } from "@angular/core";
import { Router } from "@angular/router";

import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";

import { MessageService } from "primeng/api";
import { Table } from "primeng/table";

import { LayoutService } from "../../layout/service/layout.service";
import { Constants } from "../../services/_constants";
import { AuthService } from "../../services/auth.service";
import { SkillCategory } from "../../models/skill-category";
import { GradingTopicsService } from "../../services/grading-topics.service";
import { GradingTopic } from "../../models/grading-topic";
import { UsersService } from "../../services/users.service";

@Component({
  selector: "app-grading-participants",
  standalone: true,
  imports: [AngularModules, PrimeNgModules],
  providers: [MessageService, Constants],
  templateUrl: "grading-participants.html",
})
export class GradingParticipants implements OnInit {

    proctorSkillCategories: any[] = [];

    constructor(
        public gradingTopicsService: GradingTopicsService,
        public router: Router,
        public constants: Constants,
        public authService: AuthService,
        public usersService: UsersService,
        private messageService: MessageService,
        public layoutService: LayoutService
    ) {}

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