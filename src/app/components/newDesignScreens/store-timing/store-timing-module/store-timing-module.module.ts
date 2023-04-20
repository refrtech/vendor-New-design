import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreTimingModuleRoutingModule } from './store-timing-module-routing.module';
import { StoreTimingComponent } from '../store-timing.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [StoreTimingComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CommonModule,
    StoreTimingModuleRoutingModule,
    MatSlideToggleModule,
    MatProgressBarModule,
    MatFormFieldModule
  ]
})
export class StoreTimingModuleModule { }
