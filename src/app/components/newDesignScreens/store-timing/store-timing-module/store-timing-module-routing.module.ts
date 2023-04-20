import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreTimingComponent } from '../store-timing.component';

const routes: Routes = [
  {
    path:'',component:StoreTimingComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoreTimingModuleRoutingModule { }
