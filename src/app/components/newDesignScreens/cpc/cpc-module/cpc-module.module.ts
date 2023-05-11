import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CPCModuleRoutingModule } from './cpc-module-routing.module';
import { CPCComponent } from '../cpc.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [CPCComponent],
  imports: [
    CommonModule,
    CPCModuleRoutingModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatTooltipModule,
    MatIconModule
  ],
})
export class CPCModuleModule {}
