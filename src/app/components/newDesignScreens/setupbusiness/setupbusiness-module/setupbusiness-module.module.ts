import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupbusinessModuleRoutingModule } from './setupbusiness-module-routing.module';
import { SetupbusinessComponent } from '../setupbusiness.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [SetupbusinessComponent],
  imports: [
    CommonModule,
    SetupbusinessModuleRoutingModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSlideToggleModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class SetupbusinessModuleModule {}
