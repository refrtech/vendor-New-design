import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewRecommendationComponent } from '../new-recommendation.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path:'',
    component:NewRecommendationComponent,
    canActivate:[AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewrecommendationmoduleRoutingModule { }
