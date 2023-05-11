import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsModuleRoutingModule } from './products-module-routing.module';
import { AddProductsSectionComponent } from '../add-products-section.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';


@NgModule({
  declarations: [AddProductsSectionComponent],
  imports: [
    CommonModule,
    ProductsModuleRoutingModule,
    MatFormFieldModule,
    MatSelectModule,
    MatProgressBarModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatSlideToggleModule
  ]
})
export class ProductsModuleModule { }
