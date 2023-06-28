import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss'],
})
export class NewCampaignComponent implements OnInit, AfterViewInit {
  /*<!--
  - flat / percentage
  - cashback amount
  - max cashback (%)
  - min order value
  - start date
  - end date
  Min duration span 1 month

  Reward structure inputs
  - New customer = x
  - Existing customer = x/2
  - Direct Sale = x/4
  -->*/
  store$: Observable<any> = of();
  campTiar$: Observable<any> = of();

  defualtCamp = {
    nowCB: 100, // 100Fl & 20Pe
    minCB: 8, // 8Fl & 1Pe
    maxCB: 100, // only for percent calculation
    maxFl: 18000,
    maxPe: 18000,
  };

  //old storecamp
  // storeCamp = {
  //   storeID: '',
  //   by: '',
  //   campaignName: '',
  //   type: 'flat',
  //   storeTyp: '',
  //   // x | x/2 | x/4
  //   cbNew: 100,
  //   cbExi: 50,
  //   cbDir: 25,
  //   min: 999,
  //   max: 0, // 0Fl & 100Pe
  //   expiry: false,
  //   dateS: '',
  //   dateE: '', //Min duration span 1 month
  //   stage: 0,
  // };

  storeCamp = {
    storeID: '',
    by: '',
    campaignName: '',
    storeType: '',
    // x | x/2 | x/4
    CashBack_instant: 5,
    CashBack_cpc: 5,
    CashBack_CPCNew: 5,
    CashBack_CPCExi: 5,
    minOrderValue: 0,
    maxCashBack: 0, // 0Fl & 100Pe
    dateS: '',
  };
  selectededate:any;
  payCustom: number | undefined;
  disableForm = false;
  startDate = new Date();
  campwalBal?: number;
  campid:string="";


  get maxStaDate() {
    const year = this.startDate.getFullYear();
    const month = this.startDate.getMonth();
    const day = this.startDate.getDate();
    return new Date(year + 0, month + 3, day);
  }
  // get minEndDate() {
  //   let x = this.storeCamp.dateS ? this.storeCamp.dateS : null;
  //   if (!x) {
  //     return new Date();
  //   } else {
  //     const year = new Date(x).getFullYear();
  //     const month = new Date(x).getMonth();
  //     const day = new Date(x).getDate();
  //     return new Date(year + 0, month + 1, day);
  //   }
  // }
  // get maxEndDate() {
  //   let x = this.storeCamp.dateS ? this.storeCamp.dateS : null;
  //   if (!x) {
  //     return new Date();
  //   } else {
  //     const year = new Date(x).getFullYear();
  //     const month = new Date(x).getMonth();
  //     const day = new Date(x).getDate();
  //     return new Date(year + 1, month, day);
  //   }
  // }

  enableDirect = false;
  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto');

  ///

  seltier: string = 't11';
  ESTreach?: number;
  ESTconv?: number;
  campplanindex: number = 0;

  constructor(
    public auth: AuthService,
    public dialogRef: MatDialogRef<NewCampaignComponent>
  ) {}

  ngOnInit(): void {
    const urlX = this.auth.resource.router.url;
    if (urlX == '/campaign' || urlX == '/New_recomm') {
      this.enableDirect = true;
    }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.execute();
    }, 3000);
  }

  async execute() {
    const currentUser = await this.auth.afAuth.currentUser;
    const uid = currentUser?.uid;
    if (!uid) {
    } else {
      this.auth
        .getMyStore(uid)
        .pipe(take(1))
        .subscribe((store: any[]) => {
          if (!store || !store[0] || !store[0].id) {
            // Retry
          } else {
            this.storeCamp.storeID = store[0].id;
            this.storeCamp.storeType = store[0].type;
            this.store$ = of(store[0]);

            this.auth.user$.pipe(take(1)).subscribe((mine) => {
              if (!mine) {
              } else {
                this.storeCamp.campaignName =
                  'Campaign-' + (1 + mine.storeCam.length);
                this.storeCamp.by = mine.uid;
                this.campwalBal = mine.acBalH;
                if (this.enableDirect) {
                  this.getCampdata(this.storeCamp.storeID);
                }
                this.CalESTreach();
                //this.storeCamp.dateS = this.startDate.getMonth() + "/" + this.startDate.getDate() + "/" + this.startDate.getFullYear();
                //this.storeCamp.dateE;
              }
            });
          }
        });
    }
  }

  // setUpCashback(cbNew: number) {
  //   if (
  //     !cbNew ||
  //     cbNew < this.defualtCamp.minCB ||
  //     (this.storeCamp.type == 'flat' ? this.defualtCamp.maxFl : 0) +
  //       (this.storeCamp.type == 'percent' ? this.defualtCamp.maxPe : 0) +
  //       0 <
  //       cbNew
  //   ) {
  //     this.storeCamp.cbExi = this.defualtCamp.nowCB / 2;
  //     this.storeCamp.cbDir = this.defualtCamp.nowCB / 4;
  //   } else {
  //     this.storeCamp.cbExi = cbNew / 2;
  //     this.storeCamp.cbDir = cbNew / 4;
  //   }
  // }

  // createStoreCampaign_old(tX: string, kind: boolean) {
  //   //this.submitFirst = true;
  //   this.disableForm = true;
  //   if (
  //     !this.storeCamp.storeID ||
  //     !this.storeCamp.campaignName ||
  //     !this.storeCamp.dateS ||
  //     !this.storeCamp.dateE ||
  //     !this.storeCamp.type ||
  //     !this.storeCamp.cbNew ||
  //     this.storeCamp.cbNew < this.defualtCamp.minCB ||
  //     (this.storeCamp.type == 'flat' ? this.defualtCamp.maxFl : 0) +
  //       (this.storeCamp.type == 'percent' ? this.defualtCamp.maxPe : 0) +
  //       0 <
  //       this.storeCamp.cbNew ||
  //     !this.storeCamp.cbExi ||
  //     this.storeCamp.cbExi < 4 ||
  //     this.storeCamp.cbExi > this.storeCamp.cbNew ||
  //     !this.storeCamp.cbDir ||
  //     this.storeCamp.cbDir < 2 ||
  //     this.storeCamp.cbDir > this.storeCamp.cbNew / 2 ||
  //     !this.storeCamp.min ||
  //     (this.storeCamp.type == 'percent' && !this.storeCamp.max) ||
  //     !this.storeCamp.storeID
  //   ) {
  //     if (!this.storeCamp.campaignName) {
  //       this.auth.resource.startSnackBar('Campaign name is required');
  //     } else {
  //       if (!this.storeCamp.dateS || !this.storeCamp.dateE) {
  //         this.auth.resource.startSnackBar('Campaign duration is required');
  //       } else {
  //         if (!this.storeCamp.type) {
  //           this.auth.resource.startSnackBar('Campaign type is required');
  //         } else {
  //           if (
  //             !this.storeCamp.cbNew ||
  //             this.storeCamp.cbNew < this.defualtCamp.minCB ||
  //             (this.storeCamp.type == 'flat' ? this.defualtCamp.maxFl : 0) +
  //               (this.storeCamp.type == 'percent'
  //                 ? this.defualtCamp.maxPe
  //                 : 0) +
  //               0 <
  //               this.storeCamp.cbNew
  //           ) {
  //             this.auth.resource.startSnackBar(
  //               'Proper cashback value is required'
  //             );
  //           } else {
  //             if (
  //               !this.storeCamp.cbExi ||
  //               this.storeCamp.cbExi < 4 ||
  //               this.storeCamp.cbExi > this.storeCamp.cbNew ||
  //               !this.storeCamp.cbDir ||
  //               this.storeCamp.cbDir < 2 ||
  //               this.storeCamp.cbDir > this.storeCamp.cbNew / 2
  //             ) {
  //               this.auth.resource.startSnackBar(
  //                 'Provide proper existing leads & direct sale rewards.'
  //               );
  //             } else {
  //               if (!this.storeCamp.min) {
  //                 this.auth.resource.startSnackBar('Min amount is required');
  //               } else {
  //                 if (this.storeCamp.type == 'percent' && !this.storeCamp.max) {
  //                   this.auth.resource.startSnackBar(
  //                     'Max cashback is required'
  //                   );
  //                 } else {
  //                   this.auth.resource.startSnackBar('Invalid Fields');
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //     this.disableForm = false;
  //   } else {
  //     this.addNewCampaign_old(tX, kind);
  //   }
  // }

  // addNewCampaign_old(tX: string, kind: boolean) {
  //   if (
  //     tX == 't1' ||
  //     tX == 't2' ||
  //     tX == 't3' ||
  //     tX == 't4' ||
  //     tX == 't11' ||
  //     tX == 't12' ||
  //     tX == 't13' ||
  //     tX == 't14' ||
  //     tX == 't15' ||
  //     tX == 't16' ||
  //     (tX == 'tC' && this.payCustom && this.payCustom >= 1)
  //   ) {
  //     this.auth
  //       .addNewCampaign(tX, this.storeCamp, this.payCustom || 0)
  //       .then((res) => {
  //         this.auth.resource.startSnackBar('The Campaign has been created.');
  //         if (this.enableDirect) {
  //           const sendData = {
  //             id: res.id,
  //             tX: tX,
  //             storeCamp: this.storeCamp,
  //             payCustom: this.payCustom,
  //           };
  //           this.dialogRef.close(sendData);
  //           //this.auth.resource.router.navigate(["/store/fund-wallet/" + res.id]);
  //           ///this.auth.resource.router.navigate(["/wallet/" + res.id]);
  //         } else {
  //           if (!kind) {
  //             this.auth.resource.router.navigate([
  //               '/store/fund-wallet/' + res.id,
  //             ]);
  //             // go to next route (create campaign)
  //           } else {
  //             this.dialogRef.close();
  //           }
  //         }
  //       })
  //       .catch((err) => {
  //         this.disableForm = false;
  //         this.auth.resource.startSnackBar('Failed to create the Campaign.');
  //       });
  //   }
  //   if (tX == 'tC' && (!this.payCustom || this.payCustom < 1)) {
  //     this.disableForm = false;
  //     this.auth.resource.startSnackBar('Amount must be more than 1.');
  //   }
  // }

  getCampdata(sid: string) {
    this.auth
      .getMyCampaignBySID(sid, 1)
      .pipe(take(1))
      .subscribe((Camp: any) => {
        this.campid = Camp[0].id;
        this.selectededate = new FormControl(Camp[0].dateS.toDate());
        this.storeCamp.dateS = Camp[0].dateS;


        this.storeCamp.campaignName = Camp[0].name;
        this.storeCamp.CashBack_cpc = Camp[0].CashBack_cpc;
        this.storeCamp.CashBack_instant = Camp[0].CashBack_instant;
        this.storeCamp.CashBack_CPCNew = Camp[0].CashBack_CPCNew;
        this.storeCamp.CashBack_CPCExi = Camp[0].CashBack_CPCExi;
        this.storeCamp.maxCashBack = Camp[0].maxCashBack;
        this.storeCamp.minOrderValue = Camp[0].minOrderValue;
      });
  }

  createStoreCampaign(tX: string, kind: boolean) {
    this.disableForm = true;
    if (
      !this.storeCamp.storeID ||
      !this.storeCamp.campaignName ||
      !this.storeCamp.dateS ||
      !this.storeCamp.CashBack_instant ||
      !this.storeCamp.CashBack_cpc ||
      !this.storeCamp.CashBack_CPCNew ||
      !this.storeCamp.CashBack_CPCExi ||
      this.storeCamp.CashBack_CPCExi > this.storeCamp.CashBack_CPCNew ||
      !this.storeCamp.minOrderValue ||
      !this.storeCamp.maxCashBack ||
      !this.storeCamp.storeID
    ) {
      if (!this.storeCamp.campaignName) {
        this.auth.resource.startSnackBar('Campaign name is required');
      } else if (!this.storeCamp.dateS) {
        this.auth.resource.startSnackBar('Start date is required');
      } else if (!this.storeCamp.CashBack_instant) {
        this.auth.resource.startSnackBar(
          'Instant Review for recommendation is required.'
        );
      } else if (!this.storeCamp.CashBack_cpc) {
        this.auth.resource.startSnackBar(
          'Cost per successful recommendation is required.'
        );
      } else if (!this.storeCamp.maxCashBack) {
        this.auth.resource.startSnackBar('Max cashback is required');
      } else if (!this.storeCamp.minOrderValue) {
        this.auth.resource.startSnackBar('Min amount is required');
      } else {
        this.auth.resource.startSnackBar('Invalid Fields');
      }
      this.disableForm = false;
    } else {
      if (this.enableDirect) {
        // const sendData = {
        //   id: res.id,
        //   tX: tX,
        //   storeCamp: this.storeCamp,
        //   payCustom: this.payCustom,
        // };
        this.updatecamp();
        this.dialogRef.close();
      } else {
        this.addNewCampaign(tX, kind);
      }
    }
  }

  updatecamp() {
this.auth.updateCampaign(this.storeCamp,this.campid).then((res)=>{
this.auth.resource.startSnackBar('Campaign updated.')
})
.catch((err) => {
          this.disableForm = false;
          this.auth.resource.startSnackBar('Failed to Update the Campaign.');
        });
  }

  addNewCampaign(tX: string, kind: boolean) {
    if (
      tX == 't1' ||
      tX == 't2' ||
      tX == 't3' ||
      tX == 't4' ||
      tX == 't11' ||
      tX == 't12' ||
      tX == 't13' ||
      tX == 't14' ||
      tX == 't15' ||
      tX == 't16' ||
      (tX == 'tC' && this.payCustom && this.payCustom >= 1)
    ) {
      this.auth
        .addNewCampaign(tX, this.storeCamp)
        .then((res) => {
          this.auth.resource.startSnackBar('The Campaign has been created.');
          if (!kind) {
            this.auth.resource.router.navigate([
              '/store/fund-wallet/' + res.id,
            ]);
            // go to next route (create campaign)
          } else {
            this.dialogRef.close();
          }
        })
        .catch((err) => {
          this.disableForm = false;
          this.auth.resource.startSnackBar('Failed to create the Campaign.');
        });
    }
    // if (tX == 'tC' && (!this.payCustom || this.payCustom < 1)) {
    //   this.disableForm = false;
    //   this.auth.resource.startSnackBar('Amount must be more than 1.');
    // }
  }

  CalESTreach() {
    this.campplanindex = this.auth.resource.campaignPlans.findIndex(
      (x: any) => x.tX == this.seltier
    );
    if (!this.storeCamp.CashBack_cpc) {
      this.storeCamp.CashBack_cpc = 5;
    }
    if (this.storeCamp.CashBack_cpc < 5) {
      this.auth.resource.startSnackBar('Min value is 5.');
      this.storeCamp.CashBack_cpc = 5;
    }
    if (this.storeCamp.CashBack_cpc % 1 != 0) {
      this.auth.resource.startSnackBar('Please enter the valid value.');
      this.storeCamp.CashBack_cpc =
        this.storeCamp.CashBack_cpc - (this.storeCamp.CashBack_cpc % 1);
    }
    if (
      this.storeCamp.CashBack_cpc >
      this.auth.resource.campaignPlans[this.campplanindex].refill * (1 / 10)
    ) {
      this.storeCamp.CashBack_cpc =
        this.auth.resource.campaignPlans[this.campplanindex].refill * (1 / 10);
    }

    this.ESTreach = parseInt(
      (
        (this.campwalBal +
          this.auth.resource.campaignPlans[this.campplanindex].refill) /
        this.storeCamp.CashBack_cpc
      ).toString()
    );
    this.ESTconv = parseInt((this.ESTreach * (1 / 10)).toString());
  }
}
