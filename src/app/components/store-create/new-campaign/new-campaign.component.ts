import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
//import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, of, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Shop, User } from 'src/app/universal.model';

@Component({
  selector: 'app-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss']
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
    maxFl: 18000, maxPe:18000
  }
  storeCamp = {
    storeID:"", by:"",

    campaignName:"",
    type:"flat", storeTyp:"",
    // x | x/2 | x/4
    cbNew: 100, cbExi: 50, cbDir: 25,
    min: 999, 
    max: 0, // 0Fl & 100Pe 
    expiry:false,
    dateS:"", dateE:"", //Min duration span 1 month

    stage: 0
  }
  payCustom:number | undefined;
  
  disableForm = false;
  
  startDate = new Date();
  get maxStaDate(){
    const year = this.startDate.getFullYear();
    const month = this.startDate.getMonth();
    const day = this.startDate.getDate();
    return new Date(year + 0, (month + 3),day);
  }
  get minEndDate(){
    let x = this.storeCamp.dateS ? this.storeCamp.dateS : null;
    if(!x){
      return new Date();
    }else{
      const year = new Date(x).getFullYear();
      const month = new Date(x).getMonth();
      const day = new Date(x).getDate();
      return new Date(year + 0, (month + 1), day);
    }
  }
  get maxEndDate(){
    let x = this.storeCamp.dateS ? this.storeCamp.dateS : null;
    if(!x){
      return new Date();
    }else{
      const year = new Date(x).getFullYear();
      const month = new Date(x).getMonth();
      const day = new Date(x).getDate();
      return new Date(year + 1, month, day);
    }
  }

  enableDirect = false;

  constructor(
    public auth: AuthService,
    private dialogRef: MatDialogRef<NewCampaignComponent>,
    //@Inject(MAT_DIALOG_DATA) public data: {enableDirect: boolean;}
  ) {
  }

  ngOnInit(): void {
    const urlX = this.auth.resource.router.url;
    console.log("urlX", urlX)
    if(urlX == '/campaign'){ this.enableDirect = true; }
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.execute();
    }, 3000);
  }

  async execute(){
    const currentUser = await this.auth.afAuth.currentUser;
    const uid = currentUser?.uid;
    if(!uid){

    }else{
      this.auth.getMyStore(uid).pipe(take(1)).subscribe((store:any[]) => {
        if(!store || !store[0] || !store[0].id){
          // Retry

        }else{
          this.storeCamp.storeID = store[0].id;
          this.storeCamp.storeTyp = store[0].type;
          
          this.store$ = of(store[0]);
          this.auth.user$.pipe(take(1)).subscribe(mine => {
            if(!mine){}else{
              this.storeCamp.campaignName = 'Campaign-'+ (1 + mine.storeCam.length);
              this.storeCamp.by = mine.uid;
              //this.storeCamp.dateS = this.startDate.getMonth() + "/" + this.startDate.getDate() + "/" + this.startDate.getFullYear();
              //this.storeCamp.dateE;
            }
          })
        }
      })
    }
  }

  setUpCashback(cbNew:number){
    if(!cbNew || 
      cbNew < this.defualtCamp.minCB ||
      (
        (this.storeCamp.type == 'flat' ? this.defualtCamp.maxFl : 0) +
        (this.storeCamp.type == 'percent' ? this.defualtCamp.maxPe : 0) +
      0) < cbNew
    ){
      this.storeCamp.cbExi = this.defualtCamp.nowCB / 2;
      this.storeCamp.cbDir = this.defualtCamp.nowCB / 4;
    }else{
      this.storeCamp.cbExi =  cbNew / 2;
      this.storeCamp.cbDir =  cbNew / 4;
    }
  }
  
  createStoreCampaign(tX:string, kind:boolean){
    console.log(this.storeCamp)
    //this.submitFirst = true;
    this.disableForm = true;

    if(
      !this.storeCamp.storeID ||
      !this.storeCamp.campaignName ||
      !this.storeCamp.dateS || !this.storeCamp.dateE ||
      !this.storeCamp.type ||

      !this.storeCamp.cbNew || this.storeCamp.cbNew < this.defualtCamp.minCB || ((
        (this.storeCamp.type == 'flat' ? this.defualtCamp.maxFl : 0) +
        (this.storeCamp.type == 'percent' ? this.defualtCamp.maxPe : 0) +
        0 ) < this.storeCamp.cbNew ) ||

      !this.storeCamp.cbExi || 
      this.storeCamp.cbExi < 4 ||
      this.storeCamp.cbExi > (this.storeCamp.cbNew)  ||
      !this.storeCamp.cbDir || 
      this.storeCamp.cbDir < 2 ||
      this.storeCamp.cbDir > (this.storeCamp.cbNew/2) ||

      !this.storeCamp.min ||
      this.storeCamp.type == 'percent' && !this.storeCamp.max ||

      !this.storeCamp.storeID 
    ){
      if( !this.storeCamp.campaignName ){
        this.auth.resource.startSnackBar("Campaign name is required");
      }else{
        if( !this.storeCamp.dateS || !this.storeCamp.dateE ){
          this.auth.resource.startSnackBar("Campaign duration is required");
        }else{
          if( !this.storeCamp.type ){
            this.auth.resource.startSnackBar("Campaign type is required");
          }else{
            if( !this.storeCamp.cbNew || this.storeCamp.cbNew < this.defualtCamp.minCB || ((
              (this.storeCamp.type == 'flat' ? this.defualtCamp.maxFl : 0) +
              (this.storeCamp.type == 'percent' ? this.defualtCamp.maxPe : 0) +
              0 ) < this.storeCamp.cbNew )
            ){
              this.auth.resource.startSnackBar("Proper cashback value is required");
            }else{
              if( 
                !this.storeCamp.cbExi || 
                this.storeCamp.cbExi < 4 ||
                this.storeCamp.cbExi > (this.storeCamp.cbNew)  ||
                !this.storeCamp.cbDir || 
                this.storeCamp.cbDir < 2 ||
                this.storeCamp.cbDir > (this.storeCamp.cbNew/2)
              ){
                this.auth.resource.startSnackBar("Provide proper existing leads & direct sale rewards.");
              }else{
                if( !this.storeCamp.min ){
                  this.auth.resource.startSnackBar("Min amount is required");
                }else{
                  if( this.storeCamp.type == 'percent' && !this.storeCamp.max ){
                    this.auth.resource.startSnackBar("Max cashback is required");
                  }else{
                    this.auth.resource.startSnackBar("Invalid Fields");
                  }
                }
              }
            }
          }
        }
      }
      this.disableForm = false;
    }else{
        this.addNewCampaign(tX, kind);


    }
  }

  addNewCampaign(tX:string, kind:boolean){
    console.log(tX)
    if( 
      tX == "t1" || tX == "t2" || tX == "t3" || tX == "t4" || 
      tX == "t11" || tX == "t12" || tX == "t13" || tX == "t14" ||  tX == "t15" ||  tX == "t16" || 
      tX == "tC" && (this.payCustom && this.payCustom >= 1)){
      this.auth.addNewCampaign(tX, this.storeCamp, (this.payCustom || 0)).then(res => {
        this.auth.resource.startSnackBar("The Campaign has been created.");
        console.log("MMM", this.enableDirect)
        if(this.enableDirect){
          const sendData = {id:res.id, tX:tX, storeCamp:this.storeCamp, payCustom:this.payCustom}
          this.dialogRef.close(sendData)
          //this.auth.resource.router.navigate(["/store/fund-wallet/" + res.id]);
          ///this.auth.resource.router.navigate(["/wallet/" + res.id]);
        }else{
          if(!kind){
          this.auth.resource.router.navigate(["/store/fund-wallet/" + res.id]);
          // go to next route (create campaign)
          }else{
            this.dialogRef.close()
          }
        }
      }).catch(err => {
        console.log(err)
        this.disableForm = false;
        this.auth.resource.startSnackBar("Failed to create the Campaign.")
      })
    }
    // if(tX == "t1"){}
    // if(tX == "t2"){}
    // if(tX == "t3"){}
    // if(tX == "t4"){}

    // if(tX == "tC"){
    //   this.auth.resource.startSnackBar("The service is not yet available in your region...")
    //   if(this.enableDirect){
    //     this.dialogRef.close()
    //   }
    // }
    if(tX == "tC" && (!this.payCustom || this.payCustom < 1)){
      this.disableForm = false;
      this.auth.resource.startSnackBar("Amount must be more than 1.")
    }
  }


}
