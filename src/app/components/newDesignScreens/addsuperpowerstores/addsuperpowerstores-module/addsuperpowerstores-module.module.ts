import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddsuperpowerstoresModuleRoutingModule } from './addsuperpowerstores-module-routing.module';
import { AddsuperpowerstoresComponent } from '../addsuperpowerstores.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [AddsuperpowerstoresComponent],
  imports: [
    CommonModule,
    AddsuperpowerstoresModuleRoutingModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class AddsuperpowerstoresModuleModule { }
