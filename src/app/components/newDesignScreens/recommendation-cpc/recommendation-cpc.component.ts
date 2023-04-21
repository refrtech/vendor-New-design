import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recommendation-cpc',
  templateUrl: './recommendation-cpc.component.html',
  styleUrls: ['./recommendation-cpc.component.scss']
})
export class RecommendationCPCComponent implements OnInit {
  message:string = `
Hey 👋
I highly recommend 'Store Name' for its highlights.

Click the link below to use my recommendation & get rewarded on your purchase!

 https://refrclub.com/yourstore 
REFR- Discover the best through friends`;
  constructor() { }

  ngOnInit(): void {
  }

}
