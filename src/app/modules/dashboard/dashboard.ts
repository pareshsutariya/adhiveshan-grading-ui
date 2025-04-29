import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";
import { MessageService } from "primeng/api";
import { BaseComponent } from "../../services/_baseComponent";

@Component({
    selector: 'app-dashboard',
    imports: [AngularModules, PrimeNgModules],
    providers: [MessageService],
    templateUrl: "dashboard.html"
})
export class Dashboard extends BaseComponent implements OnInit, AfterViewInit {
    
    logs: string[] = [];

    ngOnInit() {
    }

    ngAfterViewInit(): void {
    }
}
