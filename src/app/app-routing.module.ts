import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PlanetsListComponent} from './planets-list/planets-list.component';
import {HomeComponent} from './home/home.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'planets', component: PlanetsListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
