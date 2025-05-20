import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { AngularModules } from "../../models/_angular-imports";
import { PrimeNgModules } from "../../models/_prime-ng-imports";
import { MessageService } from "primeng/api";
import { BaseComponent } from "../base-component/baseComponent";
import { Providers } from '../../models/_providers';

@Component({
    selector: 'app-dashboard',
    imports: [AngularModules, PrimeNgModules],
    providers: [Providers],
    templateUrl: "dashboard.html"
})
export class Dashboard extends BaseComponent implements OnInit, AfterViewInit {
    
    logs: string[] = [];

    ngOnInit() {
    }

    ngAfterViewInit(): void {
    }
}
