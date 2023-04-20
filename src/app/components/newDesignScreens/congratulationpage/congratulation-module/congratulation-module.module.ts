import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CongratulationModuleRoutingModule } from './congratulation-module-routing.module';
import { CongratulationpageComponent } from '../congratulationpage.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [CongratulationpageComponent],
  imports: [
    CommonModule,
    CongratulationModuleRoutingModule,
    MatButtonModule
  ]
})
export class CongratulationModuleModule { }
