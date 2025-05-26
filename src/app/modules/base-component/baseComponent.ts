import { Router } from "@angular/router";
import { FilterService, MessageService } from "primeng/api";
import { Directive } from "@angular/core";
import { LayoutService } from "../../layout/service/layout.service";
import { AuthService, CompetitionEventsService, Constants, DataService, EventSchedulesService, FileDataService, GradesService, GradingCriteriasService, ParticipantsService, PermissionsEnum, RegionCenterService, RolePermissionsService, RolesEnum, SlotsService, UsersService } from "../../services/_index";

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
        public eventSchedulesService: EventSchedulesService,
        public rolePermissionsService: RolePermissionsService,
        public participantsService: ParticipantsService,
        public gradingCriteriasService: GradingCriteriasService,
        public gradesService: GradesService,

        public fileDataService: FileDataService,
        public slotsService: SlotsService,
        public dataService: DataService,
        public filterService: FilterService,
    ) {}

    public permissionsEnum: typeof PermissionsEnum = PermissionsEnum;
    public rolesEnum: typeof RolesEnum = RolesEnum;
}