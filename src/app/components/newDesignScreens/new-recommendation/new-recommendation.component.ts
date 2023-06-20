import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-new-recommendation',
  templateUrl: './new-recommendation.component.html',
  styleUrls: ['./new-recommendation.component.scss']
})
export class NewRecommendationComponent implements OnInit {
  TransationdataSource!: MatTableDataSource<any>;
  OrderColumns: string[] = [
    'Tran_details',
    'User_details',
    'Interaction',
    'Refr_Token',
  ];

  data:any = [{
    tranID:'1234567890',
    tranDate:'23/03/23 4:30pm',
    User_Name:'Vishal Pise',
    user_No:'9876543210',
    clicks:12,
    Refrtoken:200,
  },
  {
    tranID:'1234567890',
    tranDate:'23/03/23 4:30pm',
    User_Name:'Vishal Pise',
    user_No:'9876543210',
    clicks:12,
    Refrtoken:200,
  },
  {
    tranID:'1234567890',
    tranDate:'23/03/23 4:30pm',
    User_Name:'Vishal Pise',
    user_No:'9876543210',
    clicks:12,
    Refrtoken:200,
  },
  {
    tranID:'1234567890',
    tranDate:'23/03/23 4:30pm',
    User_Name:'Vishal Pise',
    user_No:'9876543210',
    clicks:12,
    Refrtoken:200,
  },
  {
    tranID:'1234567890',
    tranDate:'23/03/23 4:30pm',
    User_Name:'Vishal Pise',
    user_No:'9876543210',
    clicks:12,
    Refrtoken:200,
  },

];

  constructor(
    private dailog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.TransationdataSource = new MatTableDataSource(this.data);
  }


  // orderDetails(){
  //   const dialogRef = this.dailog.open(OrderDetailsComponent, {
  //     width: "30%",
  //     maxHeight:'80%',
  //     hasBackdrop: true,
  //     disableClose: false,
  //     panelClass: 'OrderDetails'
  //   });

  // }

}
