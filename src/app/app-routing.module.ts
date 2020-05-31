import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {PlanetsListComponent} from './modules/planets-list/planets-list.component';
import {DefaultComponent} from './layouts/default/default.component';
import {HomeComponent} from './modules/home/home.component';


const routes: Routes = [
  {
    path: '', component: DefaultComponent,
    children: [{
      path: 'planets',
      component: PlanetsListComponent
    },
      {
        path: 'home',
        component: HomeComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
