import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CPCComponent } from '../cpc.component';

const routes: Routes = [
  {
    path:'',component:CPCComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CPCModuleRoutingModule { }
