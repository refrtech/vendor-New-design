import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddsuperpowerstoresComponent } from '../addsuperpowerstores.component';

const routes: Routes = [{
  path:'',component:AddsuperpowerstoresComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddsuperpowerstoresModuleRoutingModule { }
