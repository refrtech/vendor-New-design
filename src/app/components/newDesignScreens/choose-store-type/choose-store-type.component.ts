import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-choose-store-type',
  templateUrl: './choose-store-type.component.html',
  styleUrls: ['./choose-store-type.component.scss'],
})
export class ChooseStoreTypeComponent implements OnInit {
  storeTypes = [
    { value: '0', viewValue: 'Offline Store' },
    { value: '1', viewValue: 'Hybrid' },
  ];
  constructor() {

  }

  ngOnInit(): void {}
}
