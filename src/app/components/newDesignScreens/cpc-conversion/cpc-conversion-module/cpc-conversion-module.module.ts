import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CpcConversionModuleRoutingModule } from './cpc-conversion-module-routing.module';
import { CpcConversionComponent } from '../cpc-conversion.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
  declarations: [CpcConversionComponent],
  imports: [
    CommonModule,
    CpcConversionModuleRoutingModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule
  ]
})
export class CpcConversionModuleModule { }
