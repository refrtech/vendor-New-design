import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupbusinessComponent } from '../setupbusiness.component';

const routes: Routes = [ {
  path:'',component:SetupbusinessComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupbusinessModuleRoutingModule { }
