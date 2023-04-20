import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChooseStoreTypeComponent } from '../choose-store-type.component';

const routes: Routes = [{
  path:'',component:ChooseStoreTypeComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChooseStoreTypeModuleRoutingModule { }
