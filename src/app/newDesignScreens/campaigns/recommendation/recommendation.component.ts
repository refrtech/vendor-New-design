import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';



@Component({
  selector: 'app-recommendation',
  templateUrl: './recommendation.component.html',
  styleUrls: ['./recommendation.component.scss'],
})
export class RecommendationComponent implements OnInit {

  recommend:Array<any>= [
    {value: 'All', viewValue: 'All'},
    {value: 'Recommendation campaign - 1', viewValue: 'Recommendation campaign - 1'},
    {value: 'Recommendation campaign - 2', viewValue: 'Recommendation campaign - 2'},
  ];

  reachTable=[
    {transaction:'123456789',user:'Aditya Kirtane',interaction:'12',token:'20'},
    {transaction:'123456789',user:'Vishal Pise',interaction:'12',token:'20'},
    {transaction:'123456789',user:'Aditya Kirtane',interaction:'12',token:'20'},
    {transaction:'123456789',user:'Aditya Kirtane',interaction:'12',token:'20'},
  ]

  conversionsTable=[
    {transaction:'123456789',user:'Aditya Kirtane',recommend:'vishal pise',token:'20',totalamount:'200'},
    {transaction:'123456789',user:'Vishal Pise',recommend:'vishal pise',token:'20',totalamount:'200'},
    {transaction:'123456789',user:'Aditya Kirtane',recommend:'vishal pise',token:'20',totalamount:'200'},
    {transaction:'123456789',user:'Aditya Kirtane',recommend:'vishal pise',token:'20',totalamount:'200'},
  ]

  

  displayedColumns: string[] = ['transaction', 'userdetails', 'interaction', 'token'];
  
  conversionTables: string[] = ['transaction', 'userdetails','recommend', 'token', 'totalamount'];
  constructor() { }

  ngOnInit(): void {
  }


}
