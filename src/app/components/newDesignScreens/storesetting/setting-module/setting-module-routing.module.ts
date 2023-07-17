import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoresettingComponent } from '../storesetting.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path:'',component : StoresettingComponent,canActivate : [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingModuleRoutingModule { }
