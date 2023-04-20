import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupAddressModuleRoutingModule } from './setup-address-module-routing.module';
import { SetupAddressComponent } from '../setup-address.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [SetupAddressComponent],
  imports: [
    CommonModule,
    SetupAddressModuleRoutingModule,
    MatFormFieldModule,
    MatProgressBarModule,
  ]
})
export class SetupAddressModuleModule { }
