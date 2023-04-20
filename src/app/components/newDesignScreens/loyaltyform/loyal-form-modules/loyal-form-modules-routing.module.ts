import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoyaltyformComponent } from '../loyaltyform.component';

const routes: Routes = [{ path: '', component: LoyaltyformComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoyalFormModulesRoutingModule {}
