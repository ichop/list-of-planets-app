import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { PlanetsListComponent } from './planets-list/planets-list.component';
import {DataService} from './services/data.service';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {MatCardModule} from "@angular/material/card";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatPaginatorModule} from "@angular/material/paginator";
import {FormsModule} from "@angular/forms";
import {SharedService} from "./services/SharedService";


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    PlanetsListComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule,
        MatCardModule,
        MatGridListModule,
        MatPaginatorModule,
        FormsModule
    ],
  providers: [DataService, SharedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
