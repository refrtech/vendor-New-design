import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cpc-message-preview',
  templateUrl: './cpc-message-preview.component.html',
  styleUrls: ['./cpc-message-preview.component.scss'],
})
export class CpcMessagePreviewComponent implements OnInit {
  message:string = `
Hey 👋
I highly recommend 'Store Name' for its highlights.

Click the link below to use my recommendation & get rewarded on your purchase!

 https://refrclub.com/yourstore 
REFR- Discover the best through friends`;
  constructor() {}

  ngOnInit(): void {}
}
