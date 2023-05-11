import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setupbusiness',
  templateUrl: './setupbusiness.component.html',
  styleUrls: ['./setupbusiness.component.scss'],
})
export class SetupbusinessComponent implements OnInit {

  storeType:boolean=true

  constructor() {}

  ngOnInit(): void {}

  toggle: boolean = false;
}
