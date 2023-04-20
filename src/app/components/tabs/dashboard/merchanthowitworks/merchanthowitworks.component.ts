import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DependencyService } from 'src/app/services/dependency.service';

@Component({
  selector: 'app-merchanthowitworks',
  templateUrl: './merchanthowitworks.component.html',
  styleUrls: ['./merchanthowitworks.component.scss'],
})
export class MerchanthowitworksComponent implements OnInit {
  howitoworks: Array<any> = [];

  constructor( public router:Router,
    public dependancy:DependencyService) {
    this.dependancy.activeroute = this.router.url;

    this.howitoworks.push(
      {
        title: 'What is Refr?',
      },
      {
        title: 'How Refr works?',
      },
      {
        title: 'How to use Refr ?',
      },
      {
        title: 'Refr Campaigns & Rewards',
      },
      {
        title: 'Refr Wallets ',
      },
      {
        title: 'Redeem requests and Recent orders',
      },
      {
        title: 'Recent Orders ',
      },
      {
        title: 'Product cataloguing ',
      },
      {
        title: 'Customers',
      },
      {
        title: 'Refer a merchant & earn',
      }
    );
  }

  ngOnInit(): void {}
}
