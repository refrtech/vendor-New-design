import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  TransationdataSource!: MatTableDataSource<any>;
  OrderColumns: string[] = [
    'Order_details',
    'Customer_name',
    'Payment_type',
    'Sale_Type',
    'Bill_Amount',
    'Payment_status',
    'show',
  ];

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
  }
];

  constructor() { }

  ngOnInit(): void {
    this.TransationdataSource = new MatTableDataSource(this.data);
  }

}
