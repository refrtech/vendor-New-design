import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { OrderDetailsComponent } from './order-details/order-details.component';

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

  constructor(
    private dailog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.TransationdataSource = new MatTableDataSource(this.data);
  }


  orderDetails(){
    const dialogRef = this.dailog.open(OrderDetailsComponent, {
      width: "30%",
      maxHeight:'80%',
      hasBackdrop: true,
      disableClose: false,
      panelClass: 'OrderDetails'
    });

  }
}
