import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { LayoutService } from "../layout/service/layout.service";
import { Constants } from "./_constants";
import { AuthService } from "./auth.service";
import { GradingTopicsService } from "./grading-topics.service";
import { UsersService } from "./users.service";
import { Directive } from "@angular/core";
import { RegionCenterService } from "./_regionCenters.service";
import { CompetitionEventsService } from "./competitionEvents.service";
import { PermissionsEnum, RolePermissionsService } from "./rolePermissions.service";
import { ParticipantsService } from "./participants.service";
import { GradesService } from "./grades.service";

@Directive({ selector: "base-component" })
export abstract class BaseComponent {
    constructor(
        public router: Router,
        public messageService: MessageService,
        public layoutService: LayoutService,

        public constants: Constants,
        public authService: AuthService,
        public usersService: UsersService,
        
        public regionsService: RegionCenterService,
        public eventsService: CompetitionEventsService,
        public rolePermissionsService: RolePermissionsService,
        public participantsService: ParticipantsService,
        public gradingTopicsService: GradingTopicsService,
        public gradesService: GradesService,
    ) {}

    public permissionsEnum: typeof PermissionsEnum = PermissionsEnum;
}