import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss']
})
export class OrderDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<OrderDetailsComponent>,) { }

  ngOnInit(): void {
  }

  close(){
    this.dialogRef.close();
  }


}
