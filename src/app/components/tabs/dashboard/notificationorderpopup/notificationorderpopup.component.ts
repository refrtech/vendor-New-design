import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-notificationorderpopup',
  templateUrl: './notificationorderpopup.component.html',
  styleUrls: ['./notificationorderpopup.component.scss'],
})
export class NotificationorderpopupComponent implements OnInit {
  constructor(
    public notify: NotifyService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<NotificationorderpopupComponent>,
    public router: Router
  ) {
    console.log('notification', data);
  }

  orderData = {
    logistics: {
      typeCat: 'fashion_brand',
      addressPickT: 'shop',
      name: 'Roshan',
      typeShop: 'Both',
      email: 'roshanshilimar123@gmail.com',
      typeOrdr: 'DIRECT_ONLINE',
      PnD_freeStart: 499,
      require: false,
      PnD_nationCharge: 10,
      PnD_parcelNotFree: true,
      addressPick: {
        locality: 'Mumbai',
        lat: 19.0662066,
        region: 'Maharashtra',
        state: 'MH',
        line2: '',
        area: 'Dent Heal',
        zip: '400050',
        id: 'IND_MH_1648672299398',
        line1: 'Dipesadsadas sadasdas',
        lon: 72.83105909999999,
        nation: 'IND',
        city: 'Mumbai Suburban',
      },
      addressDropT: 'home',
      addressDrop: {
        address:
          '706 C wing, Pratap nagar SRA building,pratap nagar,shivaji nagar Road',
        type: 'home',
        landmark: 'Opposite of maple height building ',
        zip: 400097,
      },
      typeSuCat: 'sc-fashion_brand-kids_fashion',
      PnD_cityCharge: 10,
      status: 0,
      phone: '9167452128',
    },
    status: 0,
    earn: 0,
    to: 'zn99lfRpB4bDy4KBvu4K1QpSMBk2',
    id: 'Ck9ifSR64gTvUfneiUuX',
    amGateway: 0,
    sin: {
      seconds: 1680864744,
      nanoseconds: 533000000,
    },
    type: [
      'RefrCASH',
      'aBbP0FKIXvYdxNE7ictPnPo33th1',
      'zn99lfRpB4bDy4KBvu4K1QpSMBk2',
      '8B9ozj7aTPvywkIvVWiK',
      'addORDER',
      'storeORDER',
      'clientAc',
      'DIRECT',
      'clientAc_aBbP0FKIXvYdxNE7ictPnPo33th1',
    ],
    cart: [
      {
        price: 10,
        category: 'chocolate',
        code: '12312312312',
        description: 'asdasd',
        title: 'abc',
        content: true,
        burn: false,
        sid: '8B9ozj7aTPvywkIvVWiK',
        warranty: true,
        TotalPrice: 10,
        quota: 0,
        sin: {
          seconds: 1669705599,
          nanoseconds: 756000000,
        },
        sold: 0,
        reqBurn: false,
        banners: [],
        by: 'zn99lfRpB4bDy4KBvu4K1QpSMBk2',
        Q: 1,
        vX: [],
        id: 'E2knEd1cHCHeqg87Q7Kg',
        upd: {
          seconds: 1669874057,
          nanoseconds: 869000000,
        },
        variants: [],
        cost: 2,
      },
      {
        burnDecShort: 'demo',
        category: '1',
        reqBurn: false,
        content: true,
        flash: false,
        burn: false,
        sold: 0,
        upd: {
          seconds: 1678274195,
          nanoseconds: 943000000,
        },
        burnPic:
          'https://firebasestorage.googleapis.com/v0/b/refr/o/store%2Fmsps63YAhhyNqIQ5zAqQ1670319230354?alt=media&token=e2b918c2-4397-4888-8c61-ca9ce518826b',
        burnCatSub: 'Nope',
        burnDec: 'demo product',
        variants: [
          {
            type: 'variant',
            name: 'asasd',
            title: 'asa',
          },
        ],
        banners: [
          'https://firebasestorage.googleapis.com/v0/b/refr/o/store%2Fmsps63YAhhyNqIQ5zAqQ1668165990031?alt=media&token=848c65d2-361e-465a-978c-ea180f411764',
        ],
        vX: [
          {
            countQ: 1,
            id: 'msps63YAhhyNqIQ5zAqQ',
            nowVarient: [
              {
                type: 'variant',
                name: 'asasd',
              },
            ],
          },
        ],
        code: '1',
        title: 'Cafe',
        costBurn: 8.1,
        relate: [],
        by: 'zn99lfRpB4bDy4KBvu4K1QpSMBk2',
        burnBrand: 'fit food',
        burnHigh: 'bests',
        quota: 0,
        TotalPrice: 10,
        burnSpec: 'q',
        warranty: false,
        burnPics: [
          'https://firebasestorage.googleapis.com/v0/b/refr/o/store%2Fmsps63YAhhyNqIQ5zAqQ1670319230354?alt=media&token=e2b918c2-4397-4888-8c61-ca9ce518826b',
        ],
        sin: {
          seconds: 1668165992,
          nanoseconds: 604000000,
        },
        cost: 9,
        Q: 1,
        burnCat: 'food_and_beverages',
        sid: '8B9ozj7aTPvywkIvVWiK',
        id: 'msps63YAhhyNqIQ5zAqQ',
        description: 'abc',
        price: 10,
      },
    ],
    sid: '8B9ozj7aTPvywkIvVWiK',
    amRefr: 0,
    shortID: 'A002aR',
    amTax: 0,
    invoice: {
      COD: false,
      amtRefrCash: 21,
      useRefrCash: true,
    },
    amTotal: 21,
    upd: {
      seconds: 1680864744,
      nanoseconds: 533000000,
    },
    amTaxTDS: 0,
    com: {
      seconds: 1680864744,
      nanoseconds: 533000000,
    },
    setShortID: true,
    code: null,
    journey: 'DIRECT',
    refr: null,
    amSale: 30,
    amCost: 0,
    by: 'aBbP0FKIXvYdxNE7ictPnPo33th1',
    ordrTYPE: 'RefrCASH',
    userName: 'Roshan',
    amTaxTCS: 0.21,
    amSave: 30,
    amParcelCity: false,
    amParcel: 10,
    camp: {
      sin: {
        seconds: 1675245628,
        nanoseconds: 695000000,
      },
      customAct: false,
      type: 'flat',
      id: 'reyhsRh6ONBitA7ywtMo',
      cbDir: 20,
      sid: '8B9ozj7aTPvywkIvVWiK',
      countM: 0,
      dateS: {
        seconds: 1675189800,
        nanoseconds: 0,
      },
      expiry: false,
      countP: 0,
      countS: 0,
      customPay: 0,
      ban: false,
      min: 499,
      max: 0,
      upd: {
        seconds: 1675245628,
        nanoseconds: 695000000,
      },
      cbNew: 50,
      stage: 0,
      name: 'Launch Offer',
      stoped: false,
      dateE: {
        seconds: 1688063400,
        nanoseconds: 0,
      },
      cbExi: 25,
      tX: 't1',
      storeTyp: 'Both',
      paid: false,
      paused: false,
      by: 'zn99lfRpB4bDy4KBvu4K1QpSMBk2',
    },
    amBurst: 11,
    storeName: 'Fit Food',
  };

  ngOnInit(): void {}

  close() {
    this.dialogRef.close();
  }

  order() {
    this.router.navigateByUrl('my-order-list');
    this.dialogRef.close();
  }
}
