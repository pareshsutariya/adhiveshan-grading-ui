import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { MessageService } from "primeng/api";
import { AuthInterceptor } from "../services/_index";

export const Providers = [
    MessageService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
]