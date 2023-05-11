import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductsSectionComponent } from '../add-products-section.component';

const routes: Routes = [
  {path:'', component:AddProductsSectionComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsModuleRoutingModule { }
