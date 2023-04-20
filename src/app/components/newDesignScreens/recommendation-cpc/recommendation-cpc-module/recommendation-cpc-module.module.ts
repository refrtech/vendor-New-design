import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecommendationCPCModuleRoutingModule } from './recommendation-cpc-module-routing.module';
import { RecommendationCPCComponent } from '../recommendation-cpc.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';


@NgModule({
  declarations: [RecommendationCPCComponent],
  imports: [
    CommonModule,
    RecommendationCPCModuleRoutingModule,
    MatProgressBarModule,
  ]
})
export class RecommendationCPCModuleModule { }
