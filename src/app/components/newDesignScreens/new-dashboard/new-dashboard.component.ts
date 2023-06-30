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

  element:Array<any>=[
    // {name:'aditya kirtane',contact:'1234567890',interaction:'10',token:'10',},
    // {name:'Vishal pise',contact:'1234567890',interaction:'10',token:'10',},
    // {name:'Roshan Shilimkar',contact:'1234567890',interaction:'10',token:'10',},
    // {name:'aditya kirtane',contact:'1234567890',interaction:'10',token:'10',},
    // {name:'aditya kirtane',contact:'1234567890',interaction:'10',token:'10',}



      {
          "amTaxTCS": 0.01,
          "setShortID": true,
          "type": [
              "RefrCASH",
              "aBbP0FKIXvYdxNE7ictPnPo33th1",
              "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "8B9ozj7aTPvywkIvVWiK",
              "addORDER",
              "storeORDER",
              "clientAc",
              "DIRECT",
              "clientAc_aBbP0FKIXvYdxNE7ictPnPo33th1"
          ],
          "refr": null,
          "sin": {
              "seconds": 1687951181,
              "nanoseconds": 157000000
          },
          "invoice": {
              "COD": false,
              "useRefrCash": true,
              "amtRefrCash": 1
          },
          "upd": {
              "seconds": 1687951181,
              "nanoseconds": 157000000
          },
          "amParcel": 0,
          "camp": {
              "type": "percent",
              "sin": {
                  "seconds": 1687849330,
                  "nanoseconds": 225000000
              },
              "countM": 0,
              "paused": false,
              "stoped": false,
              "ban": false,
              "max": 200,
              "cbNew": 10,
              "countP": 0,
              "expiry": false,
              "by": "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "customAct": false,
              "stage": 0,
              "upd": {
                  "seconds": 1687849330,
                  "nanoseconds": 225000000
              },
              "sid": "8B9ozj7aTPvywkIvVWiK",
              "dateS": {
                  "seconds": 1687804200,
                  "nanoseconds": 0
              },
              "min": 1000,
              "cbDir": 2.5,
              "paid": false,
              "countS": 0,
              "tX": "t1",
              "id": "dv9lzdNc9RwA1YlbZBIu",
              "customPay": 0,
              "cbExi": 6,
              "dateE": {
                  "seconds": 1690482600,
                  "nanoseconds": 0
              },
              "name": "Campaign-58",
              "storeTyp": "Both"
          },
          "by": "aBbP0FKIXvYdxNE7ictPnPo33th1",
          "amParcelCity": false,
          "sid": "8B9ozj7aTPvywkIvVWiK",
          "amGateway": 0,
          "journey": "DIRECT",
          "com": {
              "seconds": 1687951181,
              "nanoseconds": 157000000
          },
          "amCost": 0,
          "amTotal": 1,
          "cart": [
              {
                  "sold": 0,
                  "burn": false,
                  "vX": [],
                  "code": "12312312312",
                  "cost": 1,
                  "upd": {
                      "seconds": 1685017217,
                      "nanoseconds": 480000000
                  },
                  "description": "asdasd",
                  "variants": [],
                  "title": "abc",
                  "banners": [],
                  "content": true,
                  "sid": "8B9ozj7aTPvywkIvVWiK",
                  "Q": 1,
                  "price": 10,
                  "quota": 0,
                  "by": "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
                  "TotalPrice": 10,
                  "warranty": true,
                  "sin": {
                      "seconds": 1669705599,
                      "nanoseconds": 756000000
                  },
                  "reqBurn": false,
                  "id": "E2knEd1cHCHeqg87Q7Kg",
                  "category": "chocolate"
              }
          ],
          "id": "j50xclX4fJzUa7rfDsB5",
          "shortID": "A002zc",
          "to": "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
          "amRefr": 0,
          "amTaxTDS": 0,
          "status": 0,
          "ordrTYPE": "RefrCASH",
          "amSale": 10,
          "earn": 0,
          "userName": "Roshan",
          "amSave": 10,
          "storeName": "Fit Foo",
          "code": null,
          "logistics": {
              "addressPick": {
                  "id": "IND_MH_1648672299398",
                  "city": "Mumbai Suburban",
                  "locality": "Mumbai",
                  "zip": "400050",
                  "line1": "Dipesadsadas sadasdas",
                  "region": "Maharashtra",
                  "nation": "IND",
                  "state": "MH",
                  "lon": 72.83105909999999,
                  "lat": 19.0662066,
                  "area": "Dent Heal",
                  "line2": ""
              },
              "PnD_nationCharge": 0,
              "addressDrop": {
                  "type": "home",
                  "address": "adasd",
                  "zip": "123123",
                  "landmark": "adssa"
              },
              "name": "Roshan",
              "typeSuCat": "sc-food_and_beverages-healthy_snacks",
              "require": false,
              "typeShop": "Both",
              "email": "roshanshilimar123@gmail.com",
              "addressPickT": "shop",
              "typeCat": "food_and_beverages",
              "typeOrdr": "DIRECT_ONLINE",
              "status": 0,
              "PnD_freeStart": 499,
              "addressDropT": "home",
              "PnD_cityCharge": 0,
              "PnD_parcelNotFree": true,
              "phone": "9167452128"
          },
          "amTax": 0,
          "amBurst": 1
      },
      {
          "userName": "Roshan",
          "logistics": {
              "addressPickT": "shop",
              "addressDrop": {
                  "landmark": "adssa",
                  "type": "home",
                  "zip": "123123",
                  "address": "adasd"
              },
              "addressPick": {
                  "locality": "Mumbai",
                  "city": "Mumbai Suburban",
                  "id": "IND_MH_1648672299398",
                  "nation": "IND",
                  "state": "MH",
                  "line2": "",
                  "region": "Maharashtra",
                  "line1": "Dipesadsadas sadasdas",
                  "lon": 72.83105909999999,
                  "area": "Dent Heal",
                  "lat": 19.0662066,
                  "zip": "400050"
              },
              "name": "Roshan",
              "addressDropT": "home",
              "typeShop": "Both",
              "PnD_cityCharge": 0,
              "PnD_freeStart": 499,
              "typeSuCat": "sc-food_and_beverages-healthy_snacks",
              "status": 0,
              "PnD_nationCharge": 0,
              "require": false,
              "typeOrdr": "DIRECT_ONLINE",
              "email": "roshanshilimar123@gmail.com",
              "PnD_parcelNotFree": true,
              "phone": "9167452128",
              "typeCat": "food_and_beverages"
          },
          "earn": 0,
          "type": [
              "RefrCASH",
              "aBbP0FKIXvYdxNE7ictPnPo33th1",
              "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "8B9ozj7aTPvywkIvVWiK",
              "addORDER",
              "storeORDER",
              "clientAc",
              "DIRECT",
              "clientAc_aBbP0FKIXvYdxNE7ictPnPo33th1"
          ],
          "to": "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
          "id": "dg57oa5co337su9taCq3",
          "amParcelCity": false,
          "journey": "DIRECT",
          "amTaxTDS": 0,
          "ordrTYPE": "RefrCASH",
          "setShortID": true,
          "amSave": 10,
          "refr": null,
          "amCost": 0,
          "storeName": "Fit Foo",
          "amRefr": 0,
          "cart": [
              {
                  "sold": 0,
                  "burn": false,
                  "vX": [],
                  "code": "12312312312",
                  "cost": 1,
                  "upd": {
                      "seconds": 1685017217,
                      "nanoseconds": 480000000
                  },
                  "description": "asdasd",
                  "variants": [],
                  "title": "abc",
                  "banners": [],
                  "content": true,
                  "sid": "8B9ozj7aTPvywkIvVWiK",
                  "Q": 1,
                  "price": 10,
                  "quota": 0,
                  "by": "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
                  "TotalPrice": 10,
                  "warranty": true,
                  "sin": {
                      "seconds": 1669705599,
                      "nanoseconds": 756000000
                  },
                  "reqBurn": false,
                  "id": "E2knEd1cHCHeqg87Q7Kg",
                  "category": "chocolate"
              }
          ],
          "amSale": 10,
          "amBurst": 1,
          "amTax": 0,
          "camp": {
              "ban": false,
              "paid": false,
              "stage": 0,
              "name": "Campaign-58",
              "sin": {
                  "seconds": 1687849330,
                  "nanoseconds": 225000000
              },
              "upd": {
                  "seconds": 1687849330,
                  "nanoseconds": 225000000
              },
              "max": 200,
              "countP": 0,
              "dateE": {
                  "seconds": 1690482600,
                  "nanoseconds": 0
              },
              "storeTyp": "Both",
              "customAct": false,
              "countS": 0,
              "customPay": 0,
              "type": "percent",
              "cbNew": 10,
              "cbDir": 2.5,
              "id": "dv9lzdNc9RwA1YlbZBIu",
              "expiry": false,
              "cbExi": 6,
              "dateS": {
                  "seconds": 1687804200,
                  "nanoseconds": 0
              },
              "min": 1000,
              "sid": "8B9ozj7aTPvywkIvVWiK",
              "countM": 0,
              "tX": "t1",
              "by": "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "paused": false,
              "stoped": false
          },
          "amTotal": 1,
          "amTaxTCS": 0.01,
          "upd": {
              "seconds": 1687950734,
              "nanoseconds": 88000000
          },
          "invoice": {
              "useRefrCash": true,
              "amtRefrCash": 1,
              "COD": false
          },
          "com": {
              "seconds": 1687950734,
              "nanoseconds": 88000000
          },
          "by": "aBbP0FKIXvYdxNE7ictPnPo33th1",
          "sid": "8B9ozj7aTPvywkIvVWiK",
          "shortID": "A002zb",
          "status": 0,
          "amParcel": 0,
          "code": null,
          "sin": {
              "seconds": 1687950734,
              "nanoseconds": 88000000
          },
          "amGateway": 0
      },
      {
          "setShortID": true,
          "logistics": {
              "phone": "+919876543210",
              "typeSuCat": "sc-food_and_beverages-healthy_snacks",
              "typeCat": "food_and_beverages",
              "email": "dipesious@hotmail.com",
              "require": false,
              "typeShop": "Both",
              "status": 0,
              "addressPick": {
                  "line2": "",
                  "line1": "Dipesadsadas sadasdas",
                  "lon": 72.83105909999999,
                  "nation": "IND",
                  "region": "Maharashtra",
                  "locality": "Mumbai",
                  "id": "IND_MH_1648672299398",
                  "state": "MH",
                  "area": "Dent Heal",
                  "city": "Mumbai Suburban",
                  "zip": "400050",
                  "lat": 19.0662066
              },
              "name": "Aditya",
              "addressDrop": null,
              "addressPickT": "shop",
              "addressDropT": null,
              "typeOrdr": "F2F_OFFLINE"
          },
          "refr": {
              "uid": "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "earn": 4,
              "name": "Dipeshin"
          },
          "amSale": 0,
          "amTax": 0,
          "earn": 10,
          "amSave": 0,
          "storeName": "Fit Foo",
          "by": "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
          "amParcel": 0,
          "upd": {
              "seconds": 1687599326,
              "nanoseconds": 647000000
          },
          "sid": "8B9ozj7aTPvywkIvVWiK",
          "camp": {
              "min": 100,
              "by": "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "sin": {
                  "seconds": 1681550759,
                  "nanoseconds": 790000000
              },
              "id": "UNNxJ6VgdbZS3NiQ9QUh",
              "stage": 0,
              "storeTyp": "Both",
              "max": 0,
              "tX": "t1",
              "countS": 0,
              "ban": false,
              "dateE": {
                  "seconds": 1690741800,
                  "nanoseconds": 0
              },
              "name": "Campaign-57",
              "cbNew": 10,
              "sid": "8B9ozj7aTPvywkIvVWiK",
              "customAct": false,
              "paused": false,
              "paid": false,
              "upd": {
                  "seconds": 1681550759,
                  "nanoseconds": 790000000
              },
              "dateS": {
                  "seconds": 1681497000,
                  "nanoseconds": 0
              },
              "type": "flat",
              "stoped": false,
              "expiry": false,
              "cbExi": 4,
              "customPay": 0,
              "countM": 0,
              "countP": 0,
              "cbDir": 5
          },
          "ordrTYPE": "CASH",
          "invoice": {
              "useRefrCash": false,
              "amtRefrCash": 0,
              "COD": false
          },
          "type": [
              "CASH",
              "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "8B9ozj7aTPvywkIvVWiK",
              "storeORDER",
              "clientAc",
              "F2F",
              "REDEEM",
              "A0001V",
              "clientAc_zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "clientAc_zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "addORDER"
          ],
          "amGateway": 0,
          "cart": [],
          "amCost": 0,
          "userName": "Aditya",
          "sin": {
              "seconds": 1687599326,
              "nanoseconds": 647000000
          },
          "com": {
              "seconds": 1687599344,
              "nanoseconds": 432000000
          },
          "shortID": "A002zW",
          "amTotal": 100,
          "amTaxTDS": 0,
          "earnTotal": 14,
          "amRefr": 0,
          "id": "Q6HdwIEAybluiiDUMZLE",
          "to": "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
          "amParcelCity": false,
          "journey": "F2F",
          "code": "A0001V",
          "amTaxTCS": 0,
          "amBurst": 0,
          "status": 10
      },
      {
          "shortID": "A002zV",
          "invoice": {
              "useRefrCash": false,
              "COD": false,
              "amtRefrCash": 0
          },
          "amTaxTDS": 0,
          "type": [
              "CASH",
              "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "8B9ozj7aTPvywkIvVWiK",
              "storeORDER",
              "clientAc",
              "F2F",
              "REDEEM",
              "A0001V",
              "clientAc_zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "clientAc_zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "addORDER"
          ],
          "by": "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
          "amParcel": 0,
          "userName": "Aditya",
          "com": {
              "seconds": 1687599149,
              "nanoseconds": 356000000
          },
          "logistics": {
              "status": 0,
              "email": "dipesious@hotmail.com",
              "name": "Aditya",
              "addressDropT": null,
              "addressPickT": "shop",
              "addressDrop": null,
              "typeShop": "Both",
              "typeOrdr": "F2F_OFFLINE",
              "typeSuCat": "sc-food_and_beverages-healthy_snacks",
              "require": false,
              "typeCat": "food_and_beverages",
              "addressPick": {
                  "area": "Dent Heal",
                  "nation": "IND",
                  "zip": "400050",
                  "region": "Maharashtra",
                  "state": "MH",
                  "line2": "",
                  "id": "IND_MH_1648672299398",
                  "line1": "Dipesadsadas sadasdas",
                  "lon": 72.83105909999999,
                  "locality": "Mumbai",
                  "city": "Mumbai Suburban",
                  "lat": 19.0662066
              },
              "phone": "+919876543210"
          },
          "earnTotal": 14,
          "id": "rIwmqVPbmvBdgC6PUjqe",
          "amCost": 0,
          "amTaxTCS": 0,
          "code": "A0001V",
          "sin": {
              "seconds": 1687599130,
              "nanoseconds": 623000000
          },
          "amTax": 0,
          "earn": 10,
          "journey": "F2F",
          "ordrTYPE": "CASH",
          "to": "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
          "cart": [],
          "upd": {
              "seconds": 1687599130,
              "nanoseconds": 623000000
          },
          "amTotal": 100,
          "amSave": 0,
          "amParcelCity": false,
          "setShortID": true,
          "camp": {
              "countP": 0,
              "storeTyp": "Both",
              "stoped": false,
              "type": "flat",
              "min": 100,
              "upd": {
                  "seconds": 1681550759,
                  "nanoseconds": 790000000
              },
              "dateE": {
                  "seconds": 1690741800,
                  "nanoseconds": 0
              },
              "countM": 0,
              "sid": "8B9ozj7aTPvywkIvVWiK",
              "customPay": 0,
              "dateS": {
                  "seconds": 1681497000,
                  "nanoseconds": 0
              },
              "ban": false,
              "id": "UNNxJ6VgdbZS3NiQ9QUh",
              "sin": {
                  "seconds": 1681550759,
                  "nanoseconds": 790000000
              },
              "countS": 0,
              "name": "Campaign-57",
              "expiry": false,
              "cbNew": 10,
              "customAct": false,
              "cbDir": 5,
              "cbExi": 4,
              "tX": "t1",
              "paid": false,
              "paused": false,
              "by": "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "stage": 0,
              "max": 0
          },
          "sid": "8B9ozj7aTPvywkIvVWiK",
          "storeName": "Fit Foo",
          "status": 10,
          "amGateway": 0,
          "amRefr": 0,
          "amSale": 0,
          "refr": {
              "name": "Dipeshin",
              "earn": 4,
              "uid": "zn99lfRpB4bDy4KBvu4K1QpSMBk2"
          },
          "amBurst": 0
      },
      {
          "amParcel": 0,
          "storeName": "Fit Foo",
          "shortID": "A002zF",
          "amBurst": 0,
          "amTaxTCS": 0,
          "amSale": 0,
          "sin": {
              "seconds": 1687591924,
              "nanoseconds": 937000000
          },
          "com": {
              "seconds": 1687592574,
              "nanoseconds": 339000000
          },
          "cart": [],
          "amSave": 0,
          "type": [
              "CASH",
              "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "8B9ozj7aTPvywkIvVWiK",
              "storeORDER",
              "clientAc",
              "POS",
              "A0001V",
              "clientAc_zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "addORDER"
          ],
          "amParcelCity": false,
          "userName": "Aditya",
          "to": "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
          "amTotal": 100,
          "refr": null,
          "journey": "POS",
          "logistics": {
              "addressPick": null,
              "require": false,
              "status": 0,
              "addressDrop": null
          },
          "earn": 5,
          "amCost": 0,
          "setShortID": true,
          "code": "A0001V",
          "by": "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
          "ordrTYPE": "CASH",
          "camp": {
              "max": 0,
              "ban": false,
              "cbExi": 4,
              "paid": false,
              "min": 100,
              "expiry": false,
              "stoped": false,
              "cbNew": 10,
              "dateE": {
                  "seconds": 1690741800,
                  "nanoseconds": 0
              },
              "by": "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "countS": 0,
              "dateS": {
                  "seconds": 1681497000,
                  "nanoseconds": 0
              },
              "type": "flat",
              "stage": 0,
              "storeTyp": "Both",
              "sin": {
                  "seconds": 1681550759,
                  "nanoseconds": 790000000
              },
              "countP": 0,
              "customPay": 0,
              "name": "Campaign-57",
              "upd": {
                  "seconds": 1681550759,
                  "nanoseconds": 790000000
              },
              "countM": 0,
              "sid": "8B9ozj7aTPvywkIvVWiK",
              "cbDir": 5,
              "paused": false,
              "id": "UNNxJ6VgdbZS3NiQ9QUh",
              "customAct": false,
              "tX": "t1"
          },
          "amTaxTDS": 0,
          "amRefr": 0,
          "invoice": {
              "useRefrCash": false,
              "amtRefrCash": 0,
              "COD": false
          },
          "id": "7TDEILItyF0HomOfKnK4",
          "amTax": 0,
          "amGateway": 0,
          "status": 10,
          "upd": {
              "seconds": 1687591924,
              "nanoseconds": 937000000
          },
          "sid": "8B9ozj7aTPvywkIvVWiK"
      },
      {
          "sid": "8B9ozj7aTPvywkIvVWiK",
          "by": "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
          "amTotal": 100,
          "amSale": 0,
          "camp": {
              "sin": {
                  "seconds": 1681550759,
                  "nanoseconds": 790000000
              },
              "storeTyp": "Both",
              "tX": "t1",
              "countS": 0,
              "sid": "8B9ozj7aTPvywkIvVWiK",
              "by": "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "expiry": false,
              "upd": {
                  "seconds": 1681550759,
                  "nanoseconds": 790000000
              },
              "dateS": {
                  "seconds": 1681497000,
                  "nanoseconds": 0
              },
              "cbNew": 10,
              "name": "Campaign-57",
              "cbDir": 5,
              "dateE": {
                  "seconds": 1690741800,
                  "nanoseconds": 0
              },
              "cbExi": 4,
              "customPay": 0,
              "countM": 0,
              "max": 0,
              "customAct": false,
              "paid": false,
              "stoped": false,
              "ban": false,
              "paused": false,
              "countP": 0,
              "min": 100,
              "id": "UNNxJ6VgdbZS3NiQ9QUh",
              "type": "flat",
              "stage": 0
          },
          "amRefr": 0,
          "journey": "F2F",
          "amTaxTDS": 0,
          "code": "A0001V",
          "logistics": {
              "typeCat": "food_and_beverages",
              "phone": "+919876543210",
              "require": false,
              "email": "dipesious@hotmail.com",
              "name": "Aditya",
              "addressDrop": null,
              "addressPick": {
                  "line1": "Dipesadsadas sadasdas",
                  "zip": "400050",
                  "lat": 19.0662066,
                  "line2": "",
                  "area": "Dent Heal",
                  "region": "Maharashtra",
                  "state": "MH",
                  "nation": "IND",
                  "city": "Mumbai Suburban",
                  "lon": 72.83105909999999,
                  "locality": "Mumbai",
                  "id": "IND_MH_1648672299398"
              },
              "addressDropT": null,
              "typeShop": "Both",
              "typeSuCat": "sc-food_and_beverages-healthy_snacks",
              "status": 0,
              "addressPickT": "shop",
              "typeOrdr": "F2F_OFFLINE"
          },
          "amTax": 0,
          "refr": {
              "name": "Dipeshin",
              "earn": 4,
              "uid": "zn99lfRpB4bDy4KBvu4K1QpSMBk2"
          },
          "earnTotal": 14,
          "amCost": 0,
          "invoice": {
              "useRefrCash": false,
              "COD": false,
              "amtRefrCash": 0
          },
          "upd": {
              "seconds": 1687586592,
              "nanoseconds": 36000000
          },
          "amSave": 0,
          "id": "80TNMNCVFtr6iVfCbOff",
          "storeName": "Fit Foo",
          "amBurst": 0,
          "amParcelCity": false,
          "shortID": "A002zC",
          "amParcel": 0,
          "setShortID": true,
          "com": {
              "seconds": 1687586598,
              "nanoseconds": 52000000
          },
          "sin": {
              "seconds": 1687586592,
              "nanoseconds": 36000000
          },
          "status": 10,
          "amGateway": 0,
          "ordrTYPE": "CASH",
          "to": "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
          "cart": [],
          "type": [
              "CASH",
              "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "8B9ozj7aTPvywkIvVWiK",
              "storeORDER",
              "clientAc",
              "F2F",
              "REDEEM",
              "A0001V",
              "clientAc_zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "clientAc_zn99lfRpB4bDy4KBvu4K1QpSMBk2",
              "addORDER"
          ],
          "userName": "Aditya",
          "amTaxTCS": 0,
          "earn": 10
      }

  ]

  // dataSource!: element;

  // element:Array<any>=[
  //   {name:'aditya kirtane',contact:'1234567890',interaction:'10',token:'10',},
  //   {name:'Vishal pise',contact:'1234567890',interaction:'10',token:'10',},
  //   {name:'Roshan Shilimkar',contact:'1234567890',interaction:'10',token:'10',},
  //   {name:'aditya kirtane',contact:'1234567890',interaction:'10',token:'10',},
  //   {name:'aditya kirtane',contact:'1234567890',interaction:'10',token:'10',}
  // ]

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
