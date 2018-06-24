import { platformBrowserDynamic }  from '@angular/platform-browser-dynamic';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { HttpModule } from "@angular/http";
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Ng2OdometerModule } from 'ng2-odometer';
import { CalendarModule} from 'primeng/calendar';
import {SelectModule} from 'ng2-select';
import { AppComponent } from "./app.component";
import { AuthenticationComponent } from "./auth/authentication.component";
import { HeaderComponent } from "./header.component";
import { routing } from "./app.routing";
import { AuthService } from "./auth/auth.service";
import { ErrorComponent } from "./errors/error.component";
import { ErrorService } from "./errors/error.service";
import { DataTableModule, SharedModule, DialogModule,DataGridModule ,InputTextModule,ButtonModule} from 'primeng/primeng';
import { TableModule } from 'primeng/table';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';
import { ChartsModule } from 'ng2-charts';
import { MessagesComponent } from "./messages/messages.component";
import { MessageListComponent } from "./messages/message-list.component";
import { ContentComponent } from "./content/content.component";
import { MessageComponent } from "./messages/message.component";
import { MessageInputComponent } from "./messages/message-input.component";
import { ContentService } from "./content/content.service";
import { MessageService } from "./messages/message.service";


@NgModule({   
    declarations: [        
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        ErrorComponent,
        MessagesComponent,
        MessageListComponent,
        ContentComponent,
        MessageComponent,
        MessageInputComponent
    ], 
    imports: [
        CommonModule,
        FormsModule,
        BrowserModule,
        BrowserAnimationsModule,
        routing,
        HttpModule,
        Ng4LoadingSpinnerModule.forRoot(),
        Ng2OdometerModule.forRoot(),
        ChartsModule,
        DataTableModule,
        DataGridModule,
        ButtonModule,
        TableModule,
        InputTextModule,
        SharedModule,
        DialogModule,
        CalendarModule,
        SelectModule,
    ],
    providers: [AuthService, ErrorService,MessageService, ContentService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
