import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Directive } from "@angular/core";
import { LayoutService } from "../../layout/service/layout.service";
import { Constants } from "../../services/_constants";
import { RegionCenterService } from "../../services/_regionCenters.service";
import { AuthService } from "../../services/auth.service";
import { CompetitionEventsService } from "../../services/competitionEvents.service";
import { GradesService } from "../../services/grades.service";
import { GradingTopicsService } from "../../services/grading-topics.service";
import { ParticipantsService } from "../../services/participants.service";
import { RolePermissionsService, PermissionsEnum, RolesEnum } from "../../services/rolePermissions.service";
import { UsersService } from "../../services/users.service";

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
    public rolesEnum: typeof RolesEnum = RolesEnum;
}