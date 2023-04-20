import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseprofileModuleRoutingModule } from './chooseprofile-module-routing.module';
import { ChooseprofileComponent } from '../chooseprofile.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [ChooseprofileComponent],
  imports: [
    CommonModule,
    ChooseprofileModuleRoutingModule,
    MatProgressBarModule,
  ]
})
export class ChooseprofileModuleModule { }
