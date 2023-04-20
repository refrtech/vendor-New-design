import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SetupAddressComponent } from '../setup-address.component';

const routes: Routes = [
  {
    path:'',component:SetupAddressComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SetupAddressModuleRoutingModule { }
