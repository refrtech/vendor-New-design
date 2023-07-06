import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-user-settings',
  templateUrl: './user-settings.component.html',
  styleUrls: ['./user-settings.component.scss'],
})
export class UserSettingsComponent implements OnInit {
  id: number = 0;
  b2u$: Observable<any[]> = of();

  levels: Array<any> = [
    {
      id: 1,
      title: 'Stores shared',
      imgurl: 'assets/badges/locked/s1.webp',
      // level: '2/10',
      levelstep: 0,
      cardClass: 'card1',
      className: 'p3',
      classname2: 'progressbar' + (7).toString(),
    },
    {
      id: 2,
      title: 'Refr cash earned',
      imgurl: 'assets/badges/locked/s2.webp',
      // level: '1400',
      levelstep: 0,
      cardClass: 'card2',
      className: 'p3',
      classname2: 'progressbar' + (4).toString(),
    },
    {
      id: 3,
      title: 'Recommendations used',
      imgurl: 'assets/badges/locked/s3.webp',
      // level: '5/10',
      levelstep: 0,
      cardClass: 'card3',
      className: 'p3',
      classname2: 'progressbar' + (1).toString(),
    },
  ];

  constructor(
    public auth: AuthService,
    private matDialogRef: MatDialogRef<UserSettingsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any //private router: Router, private actRoute: ActivatedRoute
  ) {
    this.auth.user$.pipe(take(1)).subscribe((mine) => {
    });

    //const aR = this.actRoute.snapshot.params;
    //this.id = aR['id'] || null;

    // this.id = 1; // invite
    /// this.id = 2; //profile
    // this.id = 3; // privacy & terms
    // this.id = 4; // address

    // if (data == 'invite') {
    //   this.id = 1; // invite
    // }

    // if (data == 'level') {
    //   this.id = 2; // levels
    // }

    if (data == 'privacy') {
      this.id = 3; // privacy & terms
    }

    if (data == 'terms') {
      this.id = 4; // privacy & terms
    }

    // if (data == 'address') {
    //   this.id = 5; // address
    // }

    // if(data == 'Pastexp'){
    //   this.id = 6;
    //   this.execute();
    // }

  }

  ngOnInit(): void {}

  closeDialog() {
    this.matDialogRef.close();
  }

  // execute() {
  //   this.auth.user$.pipe(take(1)).subscribe((mine) => {
  //     this.auth.getAllB2U(mine.uid, 25,'POS').then((ref) => {
  //       console.log("ref",ref);
  //       this.b2u$ = of(ref);
  //     });
  //   });
  // }
}
