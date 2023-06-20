import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-new-wallet',
  templateUrl: './new-wallet.component.html',
  styleUrls: ['./new-wallet.component.scss']
})
export class NewWalletComponent implements OnInit {
  TransationdataSource!: MatTableDataSource<any>;
  data:any = [{
    tranID:'1234567890',
    tranDate:'23/03/23 4:30pm',
    User_details:'Vishal Pise',
    Payment_type:'Online',
    Bill_Amount:200,
    Status:1
  },
  {
    tranID:'1234567890',
    tranDate:'23/03/23 4:30pm',
    User_details:'Vishal Pise',
    Payment_type:'Online',
    Bill_Amount:200,
    Status:1
  },
  {
    tranID:'1234567890',
    tranDate:'23/03/23 4:30pm',
    User_details:'Vishal Pise',
    Payment_type:'Online',
    Bill_Amount:200,
    Status:1
  },
  {
    tranID:'1234567890',
    tranDate:'23/03/23 4:30pm',
    User_details:'Vishal Pise',
    Payment_type:'Online',
    Bill_Amount:200,
    Status:1
  }
];

  TransactionColumns: string[] = [
    'Transaction_info',
    'User_info',
    'Pay_type',
    'Action',
    'Bill_Amt',
    'Status',
    'show',
  ];


  constructor() { }

  ngOnInit(): void {
    this.TransationdataSource = new MatTableDataSource(this.data);
  }

}
