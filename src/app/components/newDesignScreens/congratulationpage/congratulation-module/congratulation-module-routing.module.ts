import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CongratulationpageComponent } from '../congratulationpage.component';

const routes: Routes = [{
  path:'',component:CongratulationpageComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CongratulationModuleRoutingModule { }
