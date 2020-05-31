import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {FlexLayoutModule} from '@angular/flex-layout';

import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {RouterModule} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FlexLayoutModule,
    MatFormFieldModule,
    RouterModule,
    FormsModule,
    MatPaginatorModule
  ],
  exports: [HeaderComponent, FooterComponent]
})
export class SharedModule {
}
