import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupguideComponent } from '../setupguide.component';

const routes: Routes = [{
  path:'',component:SetupguideComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupguideModuleRoutingModule { }
