import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CpcMessagePreviewComponent } from '../cpc-message-preview.component';

const routes: Routes = [{
  path:'',component: CpcMessagePreviewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CpcmessagepreviewModelRoutingModule { }
