import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChooseStoreTypeModuleRoutingModule } from './choose-store-type-module-routing.module';
import { ChooseStoreTypeComponent } from '../choose-store-type.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatButtonModule} from '@angular/material/button';

@NgModule({
  declarations: [ChooseStoreTypeComponent],
  imports: [
    CommonModule,
    ChooseStoreTypeModuleRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    MatButtonModule
  ]
})
export class ChooseStoreTypeModuleModule { }
