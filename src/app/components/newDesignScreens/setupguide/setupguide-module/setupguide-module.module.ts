import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupguideModuleRoutingModule } from './setupguide-module-routing.module';
import { SetupguideComponent } from '../setupguide.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [SetupguideComponent],
  imports: [
    CommonModule,
    SetupguideModuleRoutingModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class SetupguideModuleModule { }
