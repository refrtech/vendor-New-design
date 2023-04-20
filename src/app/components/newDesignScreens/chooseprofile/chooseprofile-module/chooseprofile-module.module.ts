import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseprofileModuleRoutingModule } from './chooseprofile-module-routing.module';
import { ChooseprofileComponent } from '../chooseprofile.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [ChooseprofileComponent],
  imports: [
    CommonModule,
    ChooseprofileModuleRoutingModule,
    MatProgressBarModule,
    MatButtonModule,
  ],
})
export class ChooseprofileModuleModule {}
