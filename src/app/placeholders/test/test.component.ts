import { Component, OnInit } from '@angular/core';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(
    public notify: NotifyService
    ) { }

  ngOnInit(): void {
  }

  go1(){
  this.notify.requestPermission('uid', []);
  }

  go2(){
  this.notify.listen();
  }
}
