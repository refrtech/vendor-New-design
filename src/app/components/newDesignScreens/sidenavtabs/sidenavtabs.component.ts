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
    { tit: "Orders", link: "/" },
    { tit: "Wallets", link: "/" },
    { tit: "Campaign", link: "/" },
    { tit: "Recommendation", link: "/" },
    { tit: "Loyalty", link: "/" },
    { tit: "Offers", link: "/" },
    { tit: "Customers", link: "/" },
    { tit: "Billing", link: "/" },
    { tit: "Inventory Management", link: "/" },
    { tit: "Influencer support", link: "/" },
    { tit: "Insights", link: "/" },
    { tit: "Setting", link: "/" },
  ]

  constructor(
    public router: Router,
    public auth: AuthService,
    public themeService: ThemeService,
    public dependancy: DependencyService,
  )
  {
    console.log(" router  " + this.router.url);
  }



  ngOnInit(): void
  {
    if (this.auth.resource.getWidth > 900)
    {
      this.showMenu = true;
    }
  }

  


}
