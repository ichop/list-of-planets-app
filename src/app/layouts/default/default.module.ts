import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {MatListModule} from '@angular/material/list';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {MatDialogModule} from '@angular/material/dialog';
import {MatSidenavModule} from '@angular/material/sidenav';


import {SharedModule} from '../../shared/shared.module';
import {DefaultComponent} from './default.component';
import {HomeComponent} from '../../modules/home/home.component';
import {PlanetPageComponent} from '../../modules/planet-page/planet-page.component';
import {PlanetsListComponent} from '../../modules/planets-list/planets-list.component';
import {DataService} from '../../modules/services/data.service';
import {CommunicationService} from '../../modules/services/communication.service';
import {PlanetCardComponent} from '../../modules/planet-card/planet-card.component';
import {MatTableModule} from "@angular/material/table";
import {MatIconModule} from "@angular/material/icon";






@NgModule({
  declarations: [
    DefaultComponent,
    HomeComponent,
    PlanetPageComponent,
    PlanetsListComponent,
    PlanetCardComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
    MatListModule,
    MatGridListModule,
    MatCardModule,
    MatPaginatorModule,
    HttpClientModule,
    FormsModule,
    MatDialogModule,
    MatSidenavModule,
    MatTableModule,
    MatIconModule,
  ],
  providers: [DataService, CommunicationService],
  entryComponents: [PlanetPageComponent]
})
export class DefaultModule { }
