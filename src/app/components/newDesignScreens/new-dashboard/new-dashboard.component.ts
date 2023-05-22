import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.scss']
})
export class NewDashboardComponent
{
  showMenu = false;

  redeemUser:Array<any>=[
    { name:'Vishal pise'},
    { name:'Roshan Shilimkar'},
  ]
  constructor(public auth: AuthService)
  {
  }

  ngOnInit(): void
  {
    if (this.auth.resource.getWidth > 900)
    {
      this.showMenu = true;
    }
  }

}
