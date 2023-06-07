import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewWalletComponent } from '../new-wallet.component';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [{
  path:'',component : NewWalletComponent,canActivate : [AuthGuard]
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewwalletmodulesRoutingModule { }
