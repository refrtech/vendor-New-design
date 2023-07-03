import {
  AfterViewInit,
  Component,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';
import { Observable, of, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ThemeService } from 'src/app/services/theme.service';
import { User } from 'src/app/universal.model';
import { ShareAdvocacyComponent } from './share-advocacy/share-advocacy.component';
import { ShareLoyaltyComponent } from './share-loyalty/share-loyalty.component';
import { Timestamp } from '@firebase/firestore';
import { OrdrShipComponent } from '../list-order/ordr-ship/ordr-ship.component';
import { OrdrTrackComponent } from '../list-order/ordr-track/ordr-track.component';
import { NotifyService } from 'src/app/services/notify.service';
import { Route, Router } from '@angular/router';
import { DependencyService } from 'src/app/services/dependency.service';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificationorderpopupComponent } from './notificationorderpopup/notificationorderpopup.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, AfterViewInit {
  store$: Observable<any> = of();
  paymentRedeem$: Observable<any[]> = of();
  campaign$: Observable<any[]> = of();
  campaign: any = '';
  campALL: any[] = [];
  paymentOrder$: Observable<any[]> = of();
  isLinear = true;
  selectedIndex = 0;
  showDetailsRedeem: string[] = [];
  showLedgerOrders: string[] = [];
  showDetailsOrders: string[] = [];
  mincashback: number = 50;

  storeName: any;
  storeNumber: any;
  storeEmail: any;
  // selectedindex:any=null;

  //@ViewChild(MatStepper) stepper!: MatStepper;

  //mobileQuery!: MediaQueryList;

  //private _mobileQueryListener!: () => void;
  /*
    public lineChart: GoogleChartInterface = {
      chartType: GoogleChartType.LineChart,
      dataTable: [
        ['Year', 'Sales', 'Expenses'],
        ['2004',  1000,      400],
        ['2005',  1170,      460],
        ['2006',  660,       1120],
        ['2007',  1030,      540]
      ],
      options: {title: 'Performance'}
    };

    public pieChart: GoogleChartInterface = {
      chartType: GoogleChartType.PieChart,
      dataTable: [
        ['City', 'Number of sales'],
        ['Mumbai',     11],
        ['Delhi',      2],
        ['Pune',  2],
      ],
      //firstRowIsData: true,
      options: {'title': 'Performance'},
    };
  */

  makeChanges = false;
  storename = '';
  shareUrlB1 = '';
  shareUrlP1 = '';
  displayedColumns: string[] = [
    'name',
    'contact',
    'interaction',
    'token',
    'action',
  ];
  constructor(
    public themeService: ThemeService,
    public auth: AuthService,
    public pay: PaymentService,
    public notify: NotifyService,
    public router: Router,
    public dependancy: DependencyService,
    public dialog: MatDialog //changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
  ) {
    this.dependancy.activeroute = this.router.url;
    // this.exe('mine');
  }

  ngOnDestroy(): void {
    //this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  expandRedeemCard(id: string) {
    if (!this.showDetailsRedeem.includes(id)) {
      this.showDetailsRedeem.push(id);
    } else {
      this.showDetailsRedeem.splice(this.showDetailsRedeem.indexOf(id), 1);
    }
  }

  expandOrderCard(id: string) {
    if (!this.showDetailsOrders.includes(id)) {
      this.showDetailsOrders.push(id);
    } else {
      this.showDetailsOrders.splice(this.showDetailsOrders.indexOf(id), 1);
    }
  }

  expandLedgerCard(id: string) {
    if (!this.showLedgerOrders.includes(id)) {
      this.showLedgerOrders.push(id);
    } else {
      this.showLedgerOrders.splice(this.showLedgerOrders.indexOf(id), 1);
    }
  }

  goLink(selectedIndex: any) {
    if (selectedIndex == 0) {
      this.auth.resource.router.navigate(['/store/add-location']);
    }
    if (selectedIndex == 1) {
      this.auth.resource.router.navigate(['/store/create-campaign']);
    }
    if (selectedIndex == 2) {
      this.auth.resource.router.navigate(['/wallet']);
    }
    if (selectedIndex == 3) {
      this.auth.resource.router.navigate(['/store/add-product']);
    }
  }

  ngOnInit(): void {}

  ngAfterViewInit() {
    //this.stepper._getIndicatorType = () => 'number';

    this.auth.user$.pipe(take(1)).subscribe((mine: any) => {
      if (!mine) {
      } else {
        this.execute(mine);
        // if(mine.storeLoc?.length > 0){
        //   if(mine.storeCam?.length > 0){
        //     this.execute(mine);
        //     if(mine.acBalH > 0){
        //       this.selectedIndex = 3;

        //     }else{
        //       this.selectedIndex = 2;
        //     }
        //   }else{
        //     this.selectedIndex = 1;
        //     // GO TO CREATE CAMP
        //     this.auth.resource.router.navigate(["/store/create-campaign"]);
        //   }
        // }else{
        //   this.selectedIndex = 0;
        //   // GO TO CREATE STORE
        //   this.auth.resource.router.navigate(["/store/create-location"]);
        // }

        let listToken = mine.tokenSNS_ || [];
        this.notify.requestPermission(mine.uid, listToken);
        this.notify.listen();
      }
    });
  }

  execute(mine: User) {
    setTimeout(() => {
      const typeR: string[] = [
        'addORDER', //"POS"
      ];
      this.paymentRedeem$ = this.pay.getAllOrdersR(mine.uid, 5, typeR); //.pipe(take(1));
      //this.paymentRedeem$ = of([]);
      const typeO: string[] = ['addORDER'];
      this.paymentOrder$ = this.pay.getAllOrdersO(mine.uid, 6, typeO); //.pipe(take(1));
      this.paymentOrder$.pipe(take(1)).subscribe((r) => {});
      //this.paymentOrder$ = of([]);
      this.auth
        .getMyStore(mine.uid) //.pipe(take(1))
        .subscribe((storeRef: any) => {
          if (storeRef[0]) {
            this.storeName = storeRef[0].name;
            this.storeNumber = storeRef[0].phone;
            this.storeEmail = storeRef[0].email;
            this.store$ = of({
              name: storeRef[0].name,
              logo: storeRef[0].logo || '',
              type: this.auth.resource.env.storeTyp[
                this.auth.resource.env.storeTyp.findIndex(
                  (x) => x.id == storeRef[0].type
                )
              ].name,

              vEarn: (storeRef[0].vEarn || 0) + (storeRef[0].vAte || 0),
              vFan: storeRef[0].vFan || 0,
              vGave: storeRef[0].vGave || 0,
              vOrdr: storeRef[0].vOrdr || 0,
              acBalH: mine.acBalH,
              products: storeRef[0].products,

              fb: '',
              yt: '',
              tw: '',
              in: '',
            });

            if (storeRef[0].addedDynamicLink) {
              this.storename = storeRef[0].name;
              this.shareUrlB1 = storeRef[0].shareUrlB1;
              if (storeRef[0].addedDynamicLinkP1) {
                this.shareUrlP1 = storeRef[0].shareUrlP1;
              }
            }
          }
        });

      this.auth
        .getMyCampaignListByUID(mine.uid)
        .subscribe((storeXcampaigns) => {
          let cX = [];
          let c4 = [];
          for (let indexC = 0; indexC < storeXcampaigns.length; indexC++) {
            const c: any = storeXcampaigns[indexC];
            if (this.calculateStartExpiry(c.dateS, c.dateE) && c.id) {
              cX.push(c);
              if (c4.length < 2) {
                c4.push(c);
              }
            }

            // if(!madeIT && cX.length == 4 || !madeIT && storeXcampaigns.length == (indexC+1) ){
            //   madeIT = true;
            //   this.campaign$ = of(c4);
            // }

            if (storeXcampaigns.length == indexC + 1) {
              this.campALL = cX;
              this.campaign$ = of(c4);
              if (cX.length >= 1) {
                this.campaign = cX[0].id;
                this.mincashback =
                  cX[0].type == 'flat'
                    ? cX[0].cbDir
                    : (cX[0].cbDir * cX[0].min) / 100;
              }
            }
          }
        });
      // this.campaign$ = this.auth.getMyCampaignByUID(mine.uid, 4) //.pipe(take(1));
      // this.campaign$.pipe(take(1)).subscribe(c => {
      //   this.campALL = c;
      // })
    }, 3000);
  }

  sendSMS() {
    var userAgent = window.navigator.userAgent;
    if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i)) {
      // iPad or iPhone
      const url = 'sms:?body=hello%20there';
      window.open(url, '_blank');
    } else {
      // Anything else
      const url = 'sms:;?body=hello%20there';
      window.open(url, '_blank');
    }
  }

  getCampAmt(c: any, cb: string) {
    if (!c) {
      return 0;
    } else {
      const x = this.campALL.findIndex((x) => x.id == c);
      return this.campALL[x][cb] || 0;
    }
  }

  rejectReedem(id: string) {
    this.makeChanges = true;
    this.pay
      .rejectReedem(id)
      .then(() => {
        this.makeChanges = false;
      })
      .catch((err) => {
        this.makeChanges = false;
        this.auth.resource.startSnackBar('Error: ' + err);
      });
  }

  acceptReedem(
    balance: number,
    ordr: any,
    id: string,
    journey: string,
    amt: any,
    camp: any,
    campX: any,
    code: string
  ) {
    if (journey == 'F2F') {
      this.makeChanges = true;
      if (!id || !journey || !amt || !camp) {
        this.makeChanges = false;
        if (!amt) {
          this.auth.resource.startSnackBar('Please enter an amount.');
        } else {
          this.auth.resource.startSnackBar('Something went wrong...');
        }
      } else {
        const y = camp;
        if (!y) {
          this.auth.resource.startSnackBar('Something went wrong...');
        } else {
          const iEarn =
            0 +
            (y.min > +amt
              ? 0
              : (y.type == 'flat' ? y.cbNew : 0) +
                (y.type == 'percent'
                  ? y.max > (amt * y.cbNew) / 100
                    ? (amt * y.cbNew) / 100
                    : y.max
                  : 0));
          const refEarn =
            0 +
            (y.min > +amt
              ? 0 // TAKE OPENION
              : (y.type == 'flat' ? y.cbExi : 0) +
                (y.type == 'percent'
                  ? y.max > (amt * y.cbExi) / 100
                    ? (amt * y.cbExi) / 100
                    : y.max
                  : 0));
          if (iEarn > balance || y.min > +amt || iEarn == 0) {
            this.makeChanges = false;
            if (iEarn > balance) {
              this.auth.resource.startSnackBar(
                'You are running short on campaign wallet.'
              );
            }
            if (y.min > +amt) {
              this.auth.resource.startSnackBar(
                'Minimum order value is not fulfilled.'
              );
            }
            if (y.min <= +amt && iEarn == 0) {
              this.auth.resource.startSnackBar('Reward is next to 0.');
            }
          } else {
            const refr = ordr.refr;
            refr['earn'] = refEarn;
            const earnTotal = iEarn + refEarn;
            this.pay
              .setCampF2F(id, y, +amt, earnTotal, iEarn, refr)
              .then(() => {
                let amTotalNew = amt;
                // deduct money & add money
                const vFan = 1; //withNewCode ? 1:0;

                this.pay
                  .transferOfflineF2F(
                    ordr.sid,
                    ordr.to,
                    ordr.by,
                    ordr.refr.uid,
                    earnTotal,
                    iEarn,
                    refEarn,
                    amTotalNew,
                    vFan
                  )
                  .then((ref) => {
                    if (!ref || !ref.success) {
                      this.auth.resource.startSnackBar(
                        'Something went wrong...'
                      );
                    } else {
                      this.pay.setCodesCampaignF2F(
                        code,
                        y.id,
                        earnTotal,
                        refEarn,
                        iEarn,
                        ordr.by,
                        amTotalNew
                      );
                      this.makeChanges = false;
                      this.auth.resource.startSnackBar(
                        'Both Users ' +
                          ordr.refr.name +
                          ' & ' +
                          ordr.userName +
                          ' Rewarded in total Rs ' +
                          earnTotal
                      );
                    }
                  });
              });
          }
        }
      }
    }

    if (journey == 'POS') {
      this.makeChanges = true;
      if (!id || !journey || !amt || !campX) {
        this.makeChanges = false;
        if (!amt) {
          this.auth.resource.startSnackBar('Please enter an amount.');
        } else {
          if (!campX) {
            this.auth.resource.startSnackBar('Please select a campaign.');
          } else {
            this.auth.resource.startSnackBar('Something went wrong...');
          }
        }
      } else {
        const x = this.campALL.findIndex((x) => x.id == campX);
        const y = this.campALL[x];
        if (!y) {
          this.auth.resource.startSnackBar('Something went wrong...');
        } else {
          const earn =
            0 +
            (y.min > +amt
              ? 0
              : (y.type == 'flat' ? y.cbDir : 0) +
                (y.type == 'percent'
                  ? y.max > (amt * y.cbDir) / 100
                    ? (amt * y.cbDir) / 100
                    : camp.max
                  : 0));
          // set campaign
          if (earn > balance || y.min > +amt || earn == 0) {
            this.makeChanges = false;
            if (earn > balance) {
              this.auth.resource.startSnackBar(
                'You are running short on campaign wallet.'
              );
            }
            if (y.min > +amt) {
              this.auth.resource.startSnackBar(
                'Minimum order value is not fulfilled.'
              );
            }
            if (y.min <= +amt && earn == 0) {
              this.auth.resource.startSnackBar('Reward is next to 0.');
            }
          } else {
            this.pay.setCampPOS(id, y, +amt, earn, null).then(() => {
              let amTotalNew = amt;
              // deduct money & add money
              const vFan = 1; //withNewCode ? 1:0;

              this.pay
                .transferPOS(ordr.sid, ordr.to, ordr.by, earn, amTotalNew, vFan)
                .then((ref) => {
                  if (!ref || !ref.success) {
                    this.auth.resource.startSnackBar('Something went wrong...');
                  } else {
                    this.pay.setCodesCampaignPOS(
                      code,
                      y.id,
                      earn,
                      ordr.by,
                      amTotalNew
                    );
                    this.makeChanges = false;
                    this.auth.resource.startSnackBar(
                      'User Rewarded Rs ' + earn + ' Cashback'
                    );
                  }
                });
            });
          }
        }
        // give cashback
      }
    }
  }

  ordrStatus(journey: string, ordr: any, setStatus: any) {
    this.makeChanges = true;
    if (journey == 'F2F') {
      if (setStatus == 'Placed') {
        this.makeChanges = false;
      }

      if (setStatus == 'Refund') {
        // goes to Refunded
        const ordrTYPE = ordr.ordrTYPE;
        const sid = ordr.sid;
        const uidV = ordr.to;
        const uidC = ordr.by;
        const uidR = ordr.refr.uid;
        const costUSER = ordr.amTotal;
        const transferRefrCash = ordr.invoice.useRefrCash
          ? ordr.invoice.amtRefrCash
          : 0;
        const cashback = ordr.earn;
        const referalCashback = ordr.refr.earn;
        this.pay
          .transferRefundF2F(
            sid,
            uidV,
            uidC,
            uidR,
            costUSER,
            transferRefrCash,
            cashback,
            referalCashback
          )
          .then((ref) => {
            if (!ref.success) {
            } else {
              if (ordrTYPE == 'RefrCASH+ONLINE' || ordrTYPE == 'ONLINE') {
                const paymentID = ordr.gwID;
                const paymentAmt = ordr.amCost;
                this.pay
                  .onlinePaymentRefund(
                    'IN',
                    ordr.id,
                    paymentID,
                    paymentAmt,
                    'INR'
                  )
                  .pipe(take(1))
                  .subscribe((razorRef: any) => {
                    if (!razorRef || !razorRef.success) {
                      this.auth.resource.startSnackBar('Failed to refund.');
                    } else {
                      const newLO = ordr.logistics;
                      newLO.status = -1000;
                      this.makeChanges = false;
                      return this.pay.changeRefundOnlineF2F(
                        ordr,
                        -10,
                        newLO,
                        razorRef
                      );
                    }
                  });
              } else {
                const newLO = ordr.logistics;
                newLO.status = -1000;
                this.makeChanges = false;
                return this.pay.changeRefundOnlineF2F(ordr, -10, newLO, {});
              }
            }
          });

        /*
            const newLO = ordr.logistics;
            newLO.status = -1000;

            const uidC = ordr.by;
            const uidR = ordr.refr.uid;
            const amtC = ordr.earn;
            const amtR = ordr.refr.earn;
            if(!ordr.gwInfo){
              this.pay.transferRefund(ordr.id, newLO, uidC, uidR, amtC, amtR).then(() => {
                this.makeChanges = false;
              })
            }else{
            }
        */
        /*
            this.pay.changeStatusOnlineF2F(ordr.id, -10, newLO).then(() => {
              this.makeChanges = false;
            })
        */
      }

      if (setStatus == 'Delivered') {
        // goes to Delivered
        const newLO = ordr.logistics;
        newLO.status = 20;

        /*
        this.pay.changeStatusOnlineF2F(ordr.id, 10, newLO)
        */
        const uidC = ordr.by;
        const uidR = ordr.refr.uid;
        const amtC = ordr.earn;
        const amtR = ordr.refr.earn;
        const sid = ordr.sid;
        this.pay
          .transferDeliveredF2F(sid, ordr.id, newLO, uidC, uidR, amtC, amtR)
          .then(() => {
            // remove from reserved & add to permenent balance
            this.sendNotifications(
              ordr,
              'delivery',
              this.storeEmail,
              this.storeNumber,
              this.storeName
            );
            this.makeChanges = false;
          });
      }
    }

    if (journey == 'DIRECT') {
      if (setStatus == 'Placed') {
        this.makeChanges = false;
      }

      if (setStatus == 'Refund') {
        // goes to Refunded
        const ordrTYPE = ordr.ordrTYPE;
        const sid = ordr.sid;
        const uidV = ordr.to;
        const uidC = ordr.by;
        //const uidR = ordr.refr.uid;
        const costUSER = ordr.amTotal;
        const transferRefrCash = ordr.invoice.useRefrCash
          ? ordr.invoice.amtRefrCash
          : 0;
        //const cashback = ordr.earn;
        //const referalCashback = ordr.refr.earn;
        this.pay
          .transferRefundDIRECT(
            sid,
            uidV,
            uidC, //uidR,
            costUSER,
            transferRefrCash //, cashback, referalCashback
          )
          .then((ref) => {
            if (!ref.success) {
              this.auth.resource.startSnackBar('Failed to refund.');
            } else {
              if (ordrTYPE == 'RefrCASH+ONLINE' || ordrTYPE == 'ONLINE') {
                const paymentID = ordr.gwID;
                const paymentAmt = ordr.amCost;
                this.pay
                  .onlinePaymentRefund(
                    'IN',
                    ordr.id,
                    paymentID,
                    paymentAmt,
                    'INR'
                  )
                  .pipe(take(1))
                  .subscribe((razorRef: any) => {
                    if (!razorRef || !razorRef.success) {
                      this.auth.resource.startSnackBar('Failed to refund.');
                    } else {
                      const newLO = ordr.logistics;
                      newLO.status = -1000;
                      this.makeChanges = false;
                      return this.pay.changeRefundOnlineDIRECT(
                        ordr,
                        -10,
                        newLO,
                        razorRef
                      );
                    }
                  });
              } else {
                const newLO = ordr.logistics;
                newLO.status = -1000;
                this.makeChanges = false;
                return this.pay.changeRefundOnlineDIRECT(ordr, -10, newLO, {});
              }
            }
          });
      }

      if (setStatus == 'Delivered') {
        // goes to Delivered
        const newLO = ordr.logistics;
        newLO.status = 20;

        /*
        this.pay.changeStatusOnlineF2F(ordr.id, 10, newLO)
        */
        const uidC = ordr.by;
        //const uidR = ordr.refr.uid;
        const amtC = ordr.earn;
        //const amtR = ordr.refr.earn;
        const sid = ordr.sid;
        this.pay
          .transferDeliveredDIRECT(
            sid,
            ordr.id,
            newLO,
            uidC, //uidR,
            amtC //, amtR
          )
          .then(() => {
            // remove from reserved & add to permenent balance
            this.sendNotifications(
              ordr,
              'delivery',
              this.storeEmail,
              this.storeNumber,
              this.storeName
            );
            // this.dependancy.sendSMS("IN", ordr.logistics.phone, "Your REFR order " + ordr.id + " is Delivered.");
            this.makeChanges = false;
          });
      }
    }

    if (journey == 'BURN') {
      if (setStatus == 'Placed') {
        this.makeChanges = false;
      }

      if (setStatus == 'Refund') {
        // goes to Refunded
        const ordrTYPE = ordr.ordrTYPE;
        const sid = ordr.sid;
        const uidV = ordr.to;
        const uidC = ordr.by;
        //const uidR = ordr.refr.uid;
        const costUSER = ordr.amTotal;
        const transferRefrCash = ordr.invoice.useRefrCash
          ? ordr.invoice.amtRefrCash
          : 0;
        //const cashback = ordr.earn;
        //const referalCashback = ordr.refr.earn;

        this.pay
          .transferRefundBURN(
            sid,
            uidV,
            uidC, //uidR,
            costUSER,
            transferRefrCash //, cashback, referalCashback
          )
          .then((ref) => {
            if (!ref.success) {
            } else {
              if (ordrTYPE == 'RefrCASH+ONLINE' || ordrTYPE == 'ONLINE') {
                const paymentID = ordr.gwID;
                const paymentAmt = ordr.amCost;
                this.pay
                  .onlinePaymentRefund(
                    'IN',
                    ordr.id,
                    paymentID,
                    paymentAmt,
                    'INR'
                  )
                  .pipe(take(1))
                  .subscribe((razorRef: any) => {
                    if (!razorRef || !razorRef.success) {
                      this.auth.resource.startSnackBar('Failed to refund.');
                    } else {
                      const newLO = ordr.logistics;
                      newLO.status = -1000;
                      this.makeChanges = false;
                      return this.pay
                        .changeRefundOnlineBURN(ordr, -10, newLO, razorRef)
                        .then(() => {
                          return this.pay.recordsOrdrRefund({
                            amt_refund: 0,
                            amt_refundMIX:
                              ordrTYPE == 'RefrCASH+ONLINE' ? 0 : 0,
                            amt_refundCOD: 0,
                            amt_refundBAL:
                              ordrTYPE == 'RefrCASH+ONLINE' ||
                              ordrTYPE == 'RefrCASH'
                                ? 0
                                : 0,
                          });
                        });
                    }
                  });
              } else {
                const newLO = ordr.logistics;
                newLO.status = -1000;
                this.makeChanges = false;
                return this.pay.changeRefundOnlineBURN(ordr, -10, newLO, {});
              }
            }
          });
      }

      if (setStatus == 'Delivered') {
        // goes to Delivered
        const newLO = ordr.logistics;
        newLO.status = 20;
        const require = ordr.logistics.require;
        const amParcel = ordr.amParcel;
        const amBurst = ordr.amBurst;
        const amTax = ordr.amTax; // taken on order
        const amTaxTCS = ordr.amTaxTCS;
        const amTaxTDS = ordr.amTaxTDS;
        const amGateway = ordr.amGateway;
        const amTotal = ordr.amTotal;
        const amRefrCash = ordr.invoice.useRefrCash
          ? ordr.invoice.amtRefrCash
          : 0;
        const tcs = amTaxTCS;
        const tds = amTaxTDS;
        const gateway = amGateway;
        const logistics = require ? amParcel : 0; // deduct if required value from shiprocket
        // This is a burn order therefore 10% cut
        const amRefr = (7.64 / 100) * amBurst; // cut 10% = 7.64 now 2.6+7 later
        const decuction = amRefr + tcs + tds + gateway + logistics;
        const amBurstBURN = amBurst - decuction;
        /*
        this.pay.changeStatusOnlineF2F(ordr.id, 10, newLO)
        */
        const uidV = ordr.to;
        const amtRemoveReserveV = amTotal;
        const amtBurstV = require ? amBurstBURN + amParcel : amBurstBURN;
        const uidC = ordr.by;
        //const uidR = ordr.refr.uid;
        const amtC = 0;
        const amtR = 0; //ordr.refr.earn;
        const sid = ordr.sid;
        this.pay
          .transferDeliveredBURN(
            sid,
            ordr.id,
            newLO,
            //uidC, //uidR,
            //amtC //, amtR
            uidC,
            amtC,
            uidV,
            amtRemoveReserveV,
            amtBurstV
          )
          .then(() => {
            this.pay.recordsOrdr({
              client: amtC + amtR - amRefrCash,
              vendor: amtBurstV,
              ship: require ? amParcel : 0,
              shipVendor: !require ? amParcel : 0,
              taxes: amTax,
              tcs: amTaxTCS,
              tds: amTaxTDS,
              refr: amRefr,
              gateway: amGateway,
              sales: amTotal,
              orders: 1,
              products: ordr.cart?.length || 0,
            });
            this.sendNotifications(
              ordr,
              'delivery',
              this.storeEmail,
              this.storeNumber,
              this.storeName
            );
            //this.dependancy.sendSMS("IN", ordr.logistics.phone, "Your REFR order " + ordr.id + " is Delivered.");

            // remove from reserved & add to permenent balance
            this.makeChanges = false;
          });
      }
    }
    if (setStatus == 'Shipping') {
      // goes to Shipping
      const newLO = ordr.logistics;
      newLO.status = 10;
      if (!ordr.logistics.require) {
        this.pay.changeStatusOnlineStore(ordr.id, 10, newLO).then(() => {
          this.sendNotifications(
            ordr,
            'shipping',
            this.storeEmail,
            this.storeNumber,
            this.storeName
          );
          this.makeChanges = false;
        });
      } else {
        //this.makeChanges = false;
        let w = this.auth.resource.getWidth - 16 + 'px';
        let h = this.auth.resource.getHeight - 16 + 'px';
        const refDialog = this.auth.resource.dialog.open(OrdrShipComponent, {
          width: w,
          minWidth: '320px',
          maxWidth: '480px',
          height: h,
          data: { ordr: ordr },
          disableClose: true,
          panelClass: 'dialogClassShipment', //, autoFocus:false
        });
        refDialog.afterClosed().subscribe((result) => {
          if (!result || !result.success) {
            this.makeChanges = false;
          } else {
            this.pay.startShiping(ordr.id, result.payDataUpdate).then(() => {
              this.pay.changeStatusOnlineStore(ordr.id, 10, newLO).then(() => {
                this.sendNotifications(
                  ordr,
                  'shipping',
                  this.storeEmail,
                  this.storeNumber,
                  this.storeName
                );
                //this.dependancy.sendSMS("IN", ordr.logistics.phone, "Your REFR order " + ordr.id + " is Shipped.");
                this.makeChanges = false;
              });
            });
          }
        });
      }
    }

    if (setStatus == 'Track') {
      // opens & updates tracking
      const ship = ordr.logistics.require;
      let w = this.auth.resource.getWidth - 16 + 'px';
      let h = this.auth.resource.getHeight - 16 + 'px';
      const refDialog = this.auth.resource.dialog.open(OrdrTrackComponent, {
        width: w,
        minWidth: '320px',
        maxWidth: '480px',
        //height:h,
        maxHeight: h,
        data: { ordr: ordr },
        //disableClose: true,
        panelClass: 'dialogClass', //, autoFocus:false
      });
      refDialog.afterClosed().subscribe((result) => {
        if (!result || !result.success) {
          this.makeChanges = false;
        } else {
          if (!ship) {
          } else {
            // this.pay.updateShiping(ordr.id, result.payDataUpdate).then(() => {
            // })
            let status = result.status;
            // STATUS CODE	DESCRIPTION
            // 0
            // 6	Shipped
            // 7	Delivered
            // 8	Cancelled
            // 9	RTO Initiated
            // 10	RTO Delivered
            // 11	Pending
            // 12	Lost
            // 13	Pickup Error
            // 14	RTO Acknowledged
            // 15	Pickup Rescheduled
            // 16	Cancellation Requested
            // 17	Out For Delivery
            // 18	In Transit
            // 19	Out For Pickup
            // 20	Pickup Exception
            // 21	Undelivered

            if (status == 0 || status == 8 || status == 16) {
              // x.journey == 'F2F' && x.status == -10 && x.logistics.status == -1000 ||
              // x.journey == 'DIRECT' && x.status == -10 && x.logistics.status == -1000 ||
              // x.journey == 'BURN' && x.status == -10 && x.logistics.status == -1000
              if (ordr.status == -10 && ordr.logistics.status == -1000) {
              } else {
                this.ordrStatus(journey, ordr, 'Refund');
              }
            } else {
              if (status == 7) {
                this.ordrStatus(journey, ordr, 'Delivered');
                // this.chargeVendor(ordr, ordr.logistics.weight)
              }
            }
          }
          this.makeChanges = false;
        }
      });
    }
  }

  sendNotifications(
    document: any,
    type: any,
    shopEmail: any,
    shopPhoneNo: any,
    shopName: any
  ) {
    if (document.sid) {
      if (type) {
        document.maildata = {
          discount: document.amSave - document.invoice.amtRefrCash,
          totalprice:
            document.amSave - document.invoice.amtRefrCash + document.amBurst,
          onlinepaidAmt: document.amTotal - document.invoice.amtRefrCash,
        };
        if (type == 'shipping') {
          //Customer
          const customer_text_mesage =
            'Dear customer, your REFR order from ' +
            document.storeName +
            ' is shipped.'; //'Your REFR order '+document.id+ ' is shipped.';
          if (document.logistics.phone) {
            this.dependancy
              .sendSMS('IN', document.logistics.phone, customer_text_mesage)
              .subscribe(); //Customer
            this.dependancy
              .saveSNS(
                'IN',
                document.logistics.phone,
                'Refr Club',
                'Order Shipped',
                customer_text_mesage,
                'client'
              )
              .subscribe(); //Customer
            //this.dependancy.saveSNS('Refr Club',document.logistics.phone,customer_text_mesage,'Order Shipped','client');//Customer
          }
          if (document.logistics.email) {
            this.dependancy
              .sendSES(
                'IN',
                document.logistics.email,
                'Order Shipped',
                customer_text_mesage,
                document,
                'd-818919b2f9224da2be6e7dcd7ac57ef9'
              )
              .subscribe(); //Customer
          }
        }
        if (type == 'delivery') {
          const customer_text_mesage =
            'Dear customer, your REFR order from ' +
            document.storeName +
            ' is delivered.'; //"Your REFR order "+document.id+" from "+document.storeName+" is delivered." //Your REFR order " +document.id +" is delivered.Your cashback will be credited once the return period is over or earlier when you recommend it from the rewards section.";
          const vendor_text_mesage =
            'Dear Refr Seller, your order ' + document.id + ' is delivered.'; //"Dear Refr Seller, your order " +document.id +" is delivered."//"Dear Refr Seller, your order" +document.id+ " is delivered.Please change order status to Delivered from your Dash for the customer to be able to recommend it.";

          if (document.logistics.phone) {
            this.dependancy
              .sendSMS('IN', document.logistics.phone, customer_text_mesage)
              .subscribe(); //Customer
            this.dependancy
              .saveSNS(
                'IN',
                document.logistics.phone,
                'Refr Club',
                'Order Delivered',
                customer_text_mesage,
                'client'
              )
              .subscribe(); //Customer
          }
          if (document.logistics.email) {
            //Customer
            this.dependancy
              .sendSES(
                'IN',
                document.logistics.email,
                'Order Delivered',
                customer_text_mesage,
                document,
                'd-c826c5f2fb5c461daf1a155701318ff0'
              )
              .subscribe(); //Customer
          }
          if (shopPhoneNo) {
            this.dependancy
              .sendSMS('IN', shopPhoneNo, vendor_text_mesage)
              .subscribe(); //Vendor
            this.dependancy
              .saveSNS(
                'IN',
                shopPhoneNo,
                'Refr Club',
                'Order Delivered',
                vendor_text_mesage,
                'vendor'
              )
              .subscribe(); //Vendor
          }
          if (shopEmail) {
            this.dependancy
              .sendSES(
                'IN',
                shopEmail,
                'Order Delivered',
                vendor_text_mesage,
                document,
                'd-7fdc896250eb422dae63e4d7f08a50c2'
              )
              .subscribe(); //Vendor
          }
        }
      }
    }
  }

  // chargeVendor(ordr: any, weight: number) {
  // }

  promoteAdvocacy() {
    let w = this.auth.resource.getWidth - 16 + 'px';
    //let h = (this.auth.resource.getHeight - 16) + 'px';
    const refDialog = this.auth.resource.dialog.open(ShareAdvocacyComponent, {
      width: w,
      minWidth: '320px',
      maxWidth: '480px',
      //height:h,
      data: { name: this.storename, link: this.shareUrlB1 },
      //disableClose: true,
      panelClass: 'dialogLayout', //, autoFocus:false
    });
  }

  promoteLoyalty() {
    // if(this.auth.resource.)
    let w = this.auth.resource.getWidth - 16 + 'px';
    //let h = (this.auth.resource.getHeight - 16) + 'px';
    const refDialog = this.auth.resource.dialog.open(ShareLoyaltyComponent, {
      width: w,
      minWidth: '320px',
      maxWidth: '480px',
      //height:h,
      data: {
        name: this.storename,
        link: this.shareUrlP1 || 'Loyalty link not created yet',
        mincashback: this.mincashback,
      },
      //disableClose: true,
      panelClass: 'dialogLayout', //, autoFocus:false
    });
  }

  calculateStartExpiry(fsDateS: any, fsDateE: any) {
    // Create new Date instance
    var date = new Date();
    // Add a day
    //date.setDate(date.getDate() - 14)
    //const dateNow = new Date().setDate(new Date().getDate() + 10);
    //const date14 = new Date().setFullYear( fsDate.toDate() );
    let noteDate = Timestamp.fromDate(date);
    //const date14 = fsDate.toDate();
    return noteDate > fsDateS && noteDate < fsDateE;
  }

  getVARIENT(v: any) {
    return v.type + ': ' + v.name;
  }

  async exe(mine: any) {
    let a = await this.notify.listen();
    mine = this.dialog.open(NotificationorderpopupComponent, {
      width: '34%',
      data: { name: 'aditya' },
      hasBackdrop: true,
      disableClose: true,
      panelClass: 'nopadding',
    });
  }
}
