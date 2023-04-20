import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RecommendationCPCComponent } from '../recommendation-cpc.component';

const routes: Routes = [{
  path:'',component:RecommendationCPCComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecommendationCPCModuleRoutingModule { }
