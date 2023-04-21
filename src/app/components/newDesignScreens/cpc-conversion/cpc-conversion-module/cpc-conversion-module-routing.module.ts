import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CpcConversionComponent } from '../cpc-conversion.component';

const routes: Routes = [
  {
    path: '',
    component: CpcConversionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CpcConversionModuleRoutingModule {}
