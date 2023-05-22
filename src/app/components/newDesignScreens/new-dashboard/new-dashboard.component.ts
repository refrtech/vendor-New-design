import { Component } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-new-dashboard',
  templateUrl: './new-dashboard.component.html',
  styleUrls: ['./new-dashboard.component.scss']
})

export class NewDashboardComponent
{
  showMenu = false;

  redeemUser:Array<any>=[
    { name:'Vishal pise'},
    { name:'Roshan Shilimkar'},
  ]

  tableData:Array<any>=[
    {name:'aditya kirtane',contact:'1234567890',interaction:'10',token:'10',},
    {name:'Vishal pise',contact:'1234567890',interaction:'10',token:'10',},
    {name:'Roshan Shilimkar',contact:'1234567890',interaction:'10',token:'10',},
    {name:'aditya kirtane',contact:'1234567890',interaction:'10',token:'10',},
    {name:'aditya kirtane',contact:'1234567890',interaction:'10',token:'10',}
  ]

  // dataSource!: element;

  element:Array<any>=[
    {name:'aditya kirtane',contact:'1234567890',interaction:'10',token:'10',},
    {name:'Vishal pise',contact:'1234567890',interaction:'10',token:'10',},
    {name:'Roshan Shilimkar',contact:'1234567890',interaction:'10',token:'10',},
    {name:'aditya kirtane',contact:'1234567890',interaction:'10',token:'10',},
    {name:'aditya kirtane',contact:'1234567890',interaction:'10',token:'10',}
  ]

  orders:Array<any>=[
    {name:'Vishal Pise'},
    {name:'Rohan Rao'},
    {name:'Vishal Pise'},
    {name:'Rohan Rao'},
  ]

  displayedColumns: string[] = ['name','contact','interaction','token','action'];
  
  constructor(public auth: AuthService)
  {
  }

  ngOnInit(): void
  {
    if (this.auth.resource.getWidth > 900)
    {
      this.showMenu = true;
    }
  }

}
