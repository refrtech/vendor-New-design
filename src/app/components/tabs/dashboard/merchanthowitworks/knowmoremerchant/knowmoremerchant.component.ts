import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DependencyService } from 'src/app/services/dependency.service';

@Component({
  selector: 'app-knowmoremerchant',
  templateUrl: './knowmoremerchant.component.html',
  styleUrls: ['./knowmoremerchant.component.scss'],
})
export class KnowmoremerchantComponent implements OnInit {
  index: number = 0;

  constructor(private actRoute: ActivatedRoute,public router:Router,
    public dependancy:DependencyService) {
    this.dependancy.activeroute = this.router.url;

    const aR = this.actRoute.snapshot.params;
    this.index = aR['id'] || null;
  }

  ngOnInit(): void {}
}
