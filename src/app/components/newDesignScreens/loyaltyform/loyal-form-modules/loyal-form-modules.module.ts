import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoyalFormModulesRoutingModule } from './loyal-form-modules-routing.module';
import { LoyaltyformComponent } from '../loyaltyform.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
@NgModule({
  declarations: [LoyaltyformComponent],
  imports: [
    CommonModule,
    LoyalFormModulesRoutingModule,
    MatButtonModule,
    MatInputModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDialogModule,
    MatButtonToggleModule,
  ],
})
export class LoyalFormModulesModule {}
