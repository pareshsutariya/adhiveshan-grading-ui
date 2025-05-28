import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ConfirmationService, MessageService } from "primeng/api";
import { AuthInterceptor } from "../services/_index";

export const Providers = [
    MessageService,
    ConfirmationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]