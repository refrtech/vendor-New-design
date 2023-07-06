import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { ThemeService } from 'src/app/services/theme.service';

//import * as QRCodeStyling from "qr-code-styling";
import QRCodeStyling, { Extension } from 'qr-code-styling';
import { Observable, of, take } from 'rxjs';
import { User } from 'src/app/universal.model';
import { PaymentService } from 'src/app/services/payment.service';
import { AddBalanceComponent } from './add-balance/add-balance.component';
import { PayComponent } from '../../pay/pay.component';
import { PlanBalanceComponent } from './plan-balance/plan-balance.component';
import { DrawBalanceComponent } from './draw-balance/draw-balance.component';
import { jsPDF } from 'jspdf';
import { Router } from '@angular/router';
import { DependencyService } from 'src/app/services/dependency.service';


@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent implements OnInit, AfterViewInit {
  @ViewChild('canvasX', { static: false }) canvasX: ElementRef | undefined;
  @ViewChild('content', { static: false }) el!: ElementRef;
  userID = "";
  storeID = "";
  userData: User | undefined;
  qrCodeV1: any = null;
  qrCodeB1: any = null;
  showCode = false;
  store$: Observable<any> = of();
  payments$: Observable<any> = of();
  shareUrlV1 = "";
  shareUrlB1 = "";
  shareUrlX1 = "";
  customRate = 0;
  invoicedata: any;



  activated: number = 1;
  expandedindex: any = null;
  expandedchildindex: any = null;

  constructor(
    public themeService: ThemeService,
    public auth: AuthService,
    public pay: PaymentService,
    public router: Router,
    public dependancy: DependencyService
  ) {
    console.log(" router  " + this.router.url);
    this.dependancy.activeroute = this.router.url;
  }

  ngOnInit(): void { }


  ngAfterViewInit(): void {
    this.auth.user$.pipe(take(1)).subscribe((mine: any) => {
      if (!mine) {
      } else {
        if (mine.storeLoc?.length > 0) {
          if (mine.storeCam?.length > 0) {
            this.userID = mine.uid;
            this.storeID = mine.storeLoc[0];
            this.userData = mine;
            this.execute(mine);
          } else {
            console.log("CREATE CAMP")
            // GO TO CREATE CAMP
            //this.auth.resource.router.navigate(["/store/create-campaign"]);
          }
        } else {
          console.log("CREATE STORE")
          // GO TO CREATE STORE
          //this.auth.resource.router.navigate(["/store/create-location"]);
        }
      }
    })
  }

  // onKey(event: any): void {
  //   this.data = event.target.value;
  //   this.qrCode.update({
  //     data: this.data
  //   });
  // }

  //onChange(event: any): void {
  //this.extension = event.target.value;
  //}

  downloadV(extension: string): void {
    if (extension) {
      this.qrCodeV1.download({ extension: extension as Extension });
    }
  }
  downloadB(extension: string): void {
    if (extension) {
      this.qrCodeB1.download({ extension: extension as Extension });
    }
  }

  execute(mine: User) {
    this.auth.getStore(this.storeID).pipe(take(1)).subscribe((s: any) => {
      if (!s) {

      } else {
        if (!s.addedDynamicLink) {
        } else {
          this.shareUrlV1 = s.shareUrlV1;
          this.shareUrlB1 = s.shareUrlB1;
          this.shareUrlX1 = s.shareUrlX1;
          this.qrCodeV1 = new QRCodeStyling({
            width: 200,
            height: 200,
            type: 'svg',
            data: this.shareUrlV1,
            image: 'https://firebasestorage.googleapis.com/v0/b/refr/o/locate.svg?alt=media&token=e23de5bd-4a26-4a9e-bb63-bc9e3a87b29c',
            margin: 0,
            qrOptions: {
              typeNumber: 0,
              mode: 'Byte',
              errorCorrectionLevel: 'Q'
            },
            dotsOptions: {
              color: '#000000',
              type: 'dots'
            },
            backgroundOptions: {
              color: "rgba(255, 255, 255, 0%)",
            },
            cornersSquareOptions: {
              color: '#512da8',
              type: 'square',
            },
            cornersDotOptions: {
              color: '#000000',
              type: 'square',
            }
          });

          this.qrCodeB1 = new QRCodeStyling({
            width: 200,
            height: 200,
            type: 'svg',
            data: this.shareUrlB1,
            image: 'https://firebasestorage.googleapis.com/v0/b/refr/o/locate.svg?alt=media&token=e23de5bd-4a26-4a9e-bb63-bc9e3a87b29c',
            margin: 0,
            qrOptions: {
              typeNumber: 0,
              mode: 'Byte',
              errorCorrectionLevel: 'Q'
            },
            dotsOptions: {
              color: '#000000',
              type: 'dots'
            },
            backgroundOptions: {
              color: "rgba(255, 255, 255, 0%)",
            },
            cornersSquareOptions: {
              color: '#512da8',
              type: 'square',
            },
            cornersDotOptions: {
              color: '#000000',
              type: 'square',
            }
          });

          setTimeout(() => {
            this.showCode = true;
            //this.qrCode.append(this.canvasX?.nativeElement);
            const type: string[] = [];
            this.payments$ = this.pay.getAllPayments(mine.uid, 22, type) //.pipe(take(1));
            // D5AJShva0AcA2KCXF9ZEkiH6kb12 LA CANE
            // ki6vTii6S2UHkqRpxujnzQujRcp1 Estate monkey
            // Csxq4c0L6pQjX5bLIqU0pogl5ry2 Jee Hukum
            // 0DX1Hyt7OeUPwN09WwaoIGCZGJG3 ecomantra
            // 9zNQVArJM5hC8EIVQNW193DNNVs1 elynn
            // 3UtHIvnb1ZMoJxUcDvyRl246oOH2 SNACQ
            // cB8lFziWJAeR3QV9LnoZtOhlIyH3 KUSUM Rolls
            // VRQqXCsm9wYn7OOdVNWWIgGIMj43 Snip n’ Scissors
            // UPQAXnNgMfUTjtqplaYIKDiqtoM2 En’creo
            // this.payments$ = this.pay.getAllPayments("9Y0LEqJurGgbEHnX3x1nb0FxFcj2", 100, type) //.pipe(take(1));
            this.payments$.pipe(take(1)).subscribe(z => {
              console.log("z", z)
            })
          }, 3000)
        }
      }
    })
  }


  campCost(tX: string) {
    if (tX == "tC") {
      return this.customRate || 0;
    } else {
      const t = this.auth.resource.campaignPlans.findIndex((x: any) => x.tX == tX);
      if (t == -1) {
        return 0;
      } else {
        return this.auth.resource.campaignPlans[t].total;
      }
    }
  }

  addMoney() {
    let w = (this.auth.resource.getWidth - 16) + 'px';
    let h = (this.auth.resource.getHeight - 16) + 'px';
    const refDialog = this.auth.resource.dialog.open(PlanBalanceComponent, {
      width: w, minWidth: "320px", maxWidth: "480px",
      //height:h,
      data: { enableDirect: true },
      disableClose: true,
      panelClass: "dialogLayout"//, autoFocus:false
    });

    refDialog.afterClosed().subscribe((ref: { tX: any }) => {
      console.log("Add Money", ref)
      if (!ref.tX) { } else {
        if (this.userData) {
          const costX = this.campCost(ref.tX)

          const amRate = this.auth.resource.campaignPlans;
          const amCamp = costX;
          //const amMerc = this.getMerchCost() || 0;
          const amSale = 0//(this.campCost(tX) + ( (oferOFF ? this.oferCost(oferOFF):0) + ( oferONL ? this.oferCost(oferONL):0) ));
          const amCost = costX;
          const amSave = 0;//(oferOFF ? this.oferCost(oferOFF):0) + ( oferONL ? this.oferCost(oferONL):0);
          const amTotal = costX;

          console.log(this.userData.uid, ref.tX, amRate, amCamp,
            amSale, amCost, amSave, amTotal
          )
          this.startPayment(this.userData.uid, ref.tX, amRate, amCamp,
            //amMerc,
            amSale, amCost, amSave, amTotal
            //this.userData.uid, //ref.storeCamp
          )
        }
      }
      /*
      if(!ref.id){}else{
        if(this.userData){
          console.log("Add Money")
          this.execute(this.userData);
          const costX = (ref.tX !== 'tC') ? this.campCost(ref.tX) : ref.payCustom

          const amRate = this.auth.resource.campaignPlans;
          const amCamp = costX;
          //const amMerc = this.getMerchCost() || 0;
          const amSale = 0//(this.campCost(tX) + ( (oferOFF ? this.oferCost(oferOFF):0) + ( oferONL ? this.oferCost(oferONL):0) ));
          const amCost = costX;
          const amSave = 0;//(oferOFF ? this.oferCost(oferOFF):0) + ( oferONL ? this.oferCost(oferONL):0);
          const amTotal = costX;
          this.startPayment( this.userData.uid, ref.tX, amRate, amCamp,
            //amMerc,
            amSale,amCost,amSave,amTotal
            //this.userData.uid, //ref.storeCamp
            )
        }
      }
      */
    })
    //this.auth.resource.router.navigate(["/store/create-campaign"])
  }

  startPayment(
    by: string, tX: string, amRate: any, amCamp: number,
    //amMerc:number,
    amSale: number, amCost: number, amSave: number,
    amTotal: number
  ) {
    let w = this.auth.resource.getWidth + "px";
    let h = this.auth.resource.getHeight + "px";

    const refDialog = this.auth.resource.dialog.open(PayComponent, {
      width: w, minWidth: w, maxWidth: w,
      height: h,
      data: {
        from: "FUND", tX: tX,
        type: ["addBalance", "nextBalance", "vendorAc"], by, to: "Δ",
        amRate, amCamp,
        //amMerc,
        amSale, amCost, amSave,
        amTotal,
        userData: this.userData
      },
      //data:{
      //   type:["addBalance", "firstBalance", "vendorAc"], by, to:"Δ",
      //   amRate, amCamp, amMerc, amSale, amCost, amSave, amTotal,
      //   userData:this.userData
      // },

      disableClose: true, panelClass: "dialogLayout"//, autoFocus:false
    });
    refDialog.afterClosed().subscribe(ref => {
      if (!ref.success) {
        console.log(ref)
        this.auth.resource.startSnackBar(ref.info)
        //this.disableForm = false;
      } else {
        console.log("Payment Complete")

      }
    })
  }




  addMoneyCustom() {
    let w = this.auth.resource.getWidth + 'px';
    //let h = this.auth.resource.getHeight + 'px';
    const refDialog = this.auth.resource.dialog.open(AddBalanceComponent, {
      //width: w, minWidth: "320px", maxWidth: "480px",
      //height:h,

      data: { what: "addMoney" },
      disableClose: true,
      panelClass: "dialogLayout"//, autoFocus:false
    });
    refDialog.afterClosed().subscribe(r => {
      if (!r.success) {

      } else {
        if (this.userData) {
          let payX = r.amt;

          //const amRate = this.auth.resource.campaignPlans;
          const amRate = r.rate;
          //const amCamp = payX;
          //const amMerc = this.getMerchCost() || 0;
          const amSale = 0//(this.campCost(tX) + ( (oferOFF ? this.oferCost(oferOFF):0) + ( oferONL ? this.oferCost(oferONL):0) ));
          const amCost = payX;//100;//payX;
          const amSave = 0;//(oferOFF ? this.oferCost(oferOFF):0) + ( oferONL ? this.oferCost(oferONL):0);
          const amTotal = payX;

          this.startPaymentCustom(this.userData.uid, //ref.tX,
            amRate, //amCamp,
            //amMerc,
            amSale, amCost, amSave, amTotal
            //this.userData.uid, //ref.storeCamp
          );
        }
      }
    })
    //this.auth.resource.router.navigate(["/store/add-product"])
  }

  startPaymentCustom(
    by: string, //tX:string,
    amRate: any, //amCamp:number,
    //amMerc:number,
    amSale: number, amCost: number, amSave: number,
    amTotal: number
  ) {
    let w = this.auth.resource.getWidth + "px";
    let h = this.auth.resource.getHeight + "px";

    const refDialog = this.auth.resource.dialog.open(PayComponent, {
      width: w, minWidth: w, maxWidth: w,
      height: h,
      data: {
        //campID: this.userData.campID,
        from: "WALL", //tX:tX,
        type: ["addBalance", "nextBalance", "vendorAc"], by, to: "Δ",
        amRate, //amCamp,
        //amMerc,
        amSale, amCost, amSave,
        amTotal,

        userData: this.userData
      },

      disableClose: true, panelClass: "dialogLayout"//, autoFocus:false
    });
    refDialog.afterClosed().subscribe(ref => {
      if (!ref.success) {
        console.log(ref)
        this.auth.resource.startSnackBar(ref.info)
        //this.disableForm = false;
      } else {
        this.auth.resource.startSnackBar("Payment Successful")
        // if( this.storeTyp == 'Both' || this.storeTyp == 'Onli' ){
        //   this.auth.resource.router.navigate(["/store/add-product"])
        // }else{
        //   this.auth.resource.router.navigate(["/dash"])
        // }
      }
    })

  }


  addTransfer() {
    this.auth.resource.startSnackBar("You dont have sufficent balance in your store account.");
  }

  addWithdraw(payout: boolean, phone: string, email: string, stateBANK: boolean, stateUPI: boolean) {
    if (!payout) {
      this.auth.resource.startSnackBar("A payout is already in process.")
    } else {
      if (!phone || !email) {
        this.auth.resource.startSnackBar("Please assign a phone & email to the account.")
      } else {
        console.log(stateBANK)
        console.log(stateUPI)

        if (!stateBANK && !stateUPI) {
          this.auth.resource.startSnackBar("The account is not associated with any banking service.")
        } else {
          let isPhone = this.auth.resource.getWidth < 768;
          let w = isPhone ? this.auth.resource.getWidth + "px" : "480px";
          let h = isPhone ? this.auth.resource.getHeight + "px" : "";
          const refDialog = this.auth.resource.dialog.open(DrawBalanceComponent, {
            width: w, minWidth: "320px", maxWidth: "480px",
            height: h,
            data: { type: "UPI" },
            disableClose: true, panelClass: "dialogLayout"
          });
          refDialog.afterClosed().subscribe(result => {
            if (!result.success) {
            } else {
              this.auth.resource.startSnackBar("Payout of " + result.redeem + " in process...")
            }
          })
        }
      }
    }
  }

  getrefilvalue(rates: Array<any>, total: any) {
    return rates[rates.findIndex(rates => rates.total == total)].refill;
  }

  SavePDF() {
    let doc = new jsPDF('p', 'pt', [1400, 1500]);
    doc.html(this.el.nativeElement, {
      callback: (pdf) => {
        console.log("start downloading")
        pdf.save("Refr Invoice.pdf");
      }
    });
  }


  convertinstring(num: string) {
    var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
    var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
    if ((num = num.toString()).length > 9) return 'overflow';
    let fullnO = '000000000' + num;
    let n: any = (fullnO).substring((fullnO.length - 9), fullnO.length).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) : '';
    return str;
  }

  getinvoice(b: string) {
    let a = "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz0123456789";
    let No = "INV";
    for (let i = 0; i < 4; i++) {
      No = No + a.indexOf(b.substring(i, i + 1)).toString();
    }
    return No;
  }


  expand(i: number, data: any) {
    this.expandedindex == i ? this.expandedindex = null : this.expandedindex = i; this.expandedchildindex = null;
    const fireBaseTime = new Date(
      data.sin.seconds * 1000 + data.sin.nanoseconds / 1000000,
    );
    const date = fireBaseTime.toDateString().substring(4);
    this.invoicedata = {
      Total: data.amBurst,
      storename: data.storeName,
      shopaddress: data.logistics.addressPick.line1 + ", " + data.logistics.addressPick.zip + ", " + data.logistics.addressPick.locality,
      orderId: data.id,
      orderdate: data.sin,
      Cust_name: data.userName,
      Cust_Phone_No: data.logistics.phone,
      billing_address: data.logistics.addressDrop.address + ", " + data.logistics.addressDrop.zip + ", " + data.logistics.addressDrop.landmark,
      cart: data.cart,
      parcelcost: data.amParcel,
      Fulltotal: data.amTotal,
      Tax: data.amTax,
      AMtWords: this.convertinstring((parseInt(data.amTotal)).toString()),
      InvoiceNo: this.getinvoice(data.id.substring(data.id.length - 4, data.id.length)),
      Sindata: date,
      Cat: data.logistics.typeCat,
      sub_cat: data.logistics.typeSuCat
    }
  }
}
