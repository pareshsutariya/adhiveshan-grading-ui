import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { SelectButtonModule } from 'primeng/selectbutton';
import { InputTextModule } from 'primeng/inputtext';
import { AccordionModule } from 'primeng/accordion';
import { CommonModule } from '@angular/common';
import moment, { Moment } from "moment";
import { TableModule } from 'primeng/table';
import { ToolbarModule } from 'primeng/toolbar';

import { Constants } from "../../services/_constants";
import { LayoutService } from '../../layout/service/layout.service';
import { MessageService } from 'primeng/api';
import { TabsModule } from 'primeng/tabs';
import { BadgeModule } from 'primeng/badge';
import { AvatarModule } from 'primeng/avatar';
import { ToastModule } from "primeng/toast";

@Component({
    selector: 'app-dashboard',
    imports: [CommonModule, TabsModule, ToastModule, BadgeModule, AvatarModule, SelectButtonModule, FormsModule, ButtonModule, TableModule, ToolbarModule, InputTextModule, AccordionModule],
    providers: [MessageService],
    templateUrl: "dashboard.html"
})
export class Dashboard implements OnInit, AfterViewInit {
    
    logs: string[] = [];

    constructor(private layoutService: LayoutService, 
                private messageService: MessageService) {
    }

    ngOnInit() {
    }

    ngAfterViewInit(): void {
    }
}
