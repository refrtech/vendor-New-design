import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatRadioModule} from '@angular/material/radio';
import { SettingModuleRoutingModule } from './setting-module-routing.module';
import { StoresettingComponent } from '../storesetting.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [StoresettingComponent],
  imports: [
    CommonModule,
    FormsModule,
    MatRadioModule,
    SettingModuleRoutingModule
  ]
})
export class SettingModuleModule { }
