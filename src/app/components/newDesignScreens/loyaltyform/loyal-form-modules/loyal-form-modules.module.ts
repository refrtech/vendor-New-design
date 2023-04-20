import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoyalFormModulesRoutingModule } from './loyal-form-modules-routing.module';
import { LoyaltyformComponent } from '../loyaltyform.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
  declarations: [LoyaltyformComponent],
  imports: [
    CommonModule,
    LoyalFormModulesRoutingModule,
    MatButtonModule,
    MatInputModule,
  ],
})
export class LoyalFormModulesModule {}
