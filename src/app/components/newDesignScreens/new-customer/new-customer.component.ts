import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {
  recom:Array<string>=["1","2","3"]
  constructor() {
    this.recom.length = 3;
  }

  ngOnInit(): void {
  }

}
