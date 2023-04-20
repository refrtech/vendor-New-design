import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CPCModuleRoutingModule } from './cpc-module-routing.module';
import { CPCComponent } from '../cpc.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [CPCComponent],
  imports: [
    CommonModule,
    CPCModuleRoutingModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule
  ],
})
export class CPCModuleModule {}
