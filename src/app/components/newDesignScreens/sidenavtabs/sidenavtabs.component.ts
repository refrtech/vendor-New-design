import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { DependencyService } from 'src/app/services/dependency.service';
import { ThemeService } from 'src/app/services/theme.service';

@Component({
  selector: 'app-sidenavtabs',
  templateUrl: './sidenavtabs.component.html',
  styleUrls: ['./sidenavtabs.component.scss']
})
export class SidenavtabsComponent implements OnInit {

  title = 'Refr';
  infocus = false;
  showMenu = false;

  navRoutes = [
    { tit: "Dashboard", link: "/dash" },
    { tit: "Orders", link: "/New_orders" },
    { tit: "Wallets", link: "/New_wallet" },
    { tit: "Campaign",
    iconName: 'expand_more',
      isexpanded: false,
      childern:[
        {tit:"Recommendation",link:'/New_recomm'},
      ]
  },
    { tit: "Loyalty", link: "/" },
    { tit: "Offers", link: "/" },
    { tit: "Customers", link: "/New_cust" },
    { tit: "Billing", link: "/" },
    { tit: "Inventory Management", link: "/" },
    { tit: "Influencer support", link: "/" },
    { tit: "Insights", link: "/" },
    { tit: "Setting", link: "/New_setting" },
  ]

  constructor(
    public router: Router,
    public auth: AuthService,
    public themeService: ThemeService,
    public dependancy: DependencyService,
  )
  {
  }



  ngOnInit(): void
  {
    if (this.auth.resource.getWidth > 900)
    {
      this.showMenu = true;
    }
  }
  expand(index: any) {
    if (index == 3) {
      this.navRoutes[index].isexpanded = !this.navRoutes[index].isexpanded;
    }
  }




}
