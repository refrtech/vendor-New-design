import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseprofileComponent } from '../chooseprofile.component';

const routes: Routes = [{
  path:'',component:ChooseprofileComponent,
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChooseprofileModuleRoutingModule { }
