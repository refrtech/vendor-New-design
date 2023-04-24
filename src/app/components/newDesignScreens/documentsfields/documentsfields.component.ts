import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-documentsfields',
  templateUrl: './documentsfields.component.html',
  styleUrls: ['./documentsfields.component.scss'],
})
export class DocumentsfieldsComponent implements OnInit {
  form = 'restaurant';
  // form:string='healthcare';

  constructor() {}

  ngOnInit(): void {}
}
