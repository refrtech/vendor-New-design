import { Component, OnInit } from '@angular/core';
import { Observable, of, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-storesetting',
  templateUrl: './storesetting.component.html',
  styleUrls: ['./storesetting.component.scss'],
})
export class StoresettingComponent implements OnInit {
  store$: Observable<any> = of();
  question1: boolean = false;

  db = [
    {
      id: '1',
      question:
        'Do you offer cosmetic dentistry services such as teeth whitening, veneers, or dental bonding?',
      type: 'radio',
      options: [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
      ],
      required: true,
    },
    {
      id: '2',
      question:
        'Are there any special considerations or accommodations for patients with dental anxiety or special needs?',
      type: 'radio',
      options: [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
      ],
      required: true,
    },
    {
      id: '3',
      question:
        'Do you offer sedation dentistry options for patients who experience dental phobia or require extensive procedures?',
      type: 'radio',
      options: [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
      ],
      required: true,
    },
    {
      id: '4',
      question: 'Do you offer Home visits?',
      type: 'radio',
      options: [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
      ],
      required: true,
    },
    {
      id: '5',
      question: 'Do you accomodate walk -in patients?',
      type: 'radio',
      options: [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
      ],
      required: true,
    },
    {
      id: '6',
      question: 'Is your practice on the ground floor?',
      type: 'radio',
      options: [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
      ],
      required: true,
    },
    {
      id: '7',
      question: 'Are you open on Sundays?',
      type: 'radio',
      options: [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
      ],
      required: true,
    },
    {
      id: '8',
      question: 'Do you have valet service?',
      type: 'radio',
      options: [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
      ],
      required: true,
    },
    {
      id: '9',
      question: 'Do you offer EMI options for payment?',
      type: 'radio',
      options: [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
      ],
      required: true,
    },
    {
      id: '10',
      question: 'Do you offer emergency dental services?',
      type: 'radio',
      options: [
        { label: 'Yes', value: 'Yes' },
        { label: 'No', value: 'No' },
      ],
      required: true,
    },

    {
      id: '11',
      question: 'What services does your dental clinic offer?',
      type: 'text',
      options: [],
      required: true,
    },

    {
      id: '12',
      question: 'Can you provide some information about the dentists and staff at your clinic?',
      type: 'text',
      options: [],
      required: true,
    },
  ];

  constructor(public auth: AuthService) {
    this.auth.user$.pipe(take(1)).subscribe((mine) => {
      this.auth
        .getMyStore(mine.uid) //.pipe(take(1))
        .subscribe((storeRef: any) => {
          this.store$ = of(storeRef);
          console.log(storeRef);
        });
    });
  }

  ngOnInit(): void {}

  SubmitAns() {
    console.log(this.question1);
  }
}
