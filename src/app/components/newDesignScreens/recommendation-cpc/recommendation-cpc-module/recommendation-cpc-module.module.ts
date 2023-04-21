import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationCPCModuleRoutingModule } from './recommendation-cpc-module-routing.module';
import { RecommendationCPCComponent } from '../recommendation-cpc.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [RecommendationCPCComponent],
  imports: [
    CommonModule,
    RecommendationCPCModuleRoutingModule,
    MatProgressBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule

  ]
})
export class RecommendationCPCModuleModule { }
