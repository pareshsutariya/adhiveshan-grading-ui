import { Router } from "@angular/router";
import { MessageService } from "primeng/api";
import { Directive } from "@angular/core";
import { LayoutService } from "../../layout/service/layout.service";
import { AuthService, CompetitionEventsService, Constants, GradesService, GradingCriteriasService, ParticipantsService, PermissionsEnum, RegionCenterService, RolePermissionsService, RolesEnum, UsersService } from "../../services/_index";

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
        public gradingCriteriasService: GradingCriteriasService,
        public gradesService: GradesService,
    ) {}

    public permissionsEnum: typeof PermissionsEnum = PermissionsEnum;
    public rolesEnum: typeof RolesEnum = RolesEnum;
}