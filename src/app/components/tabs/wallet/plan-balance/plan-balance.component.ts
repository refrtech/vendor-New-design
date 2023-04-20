import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, of, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-plan-balance',
  templateUrl: './plan-balance.component.html',
  styleUrls: ['./plan-balance.component.scss']
})
export class PlanBalanceComponent implements OnInit {

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
  disableForm = false;

  constructor(
    public auth: AuthService,
    private dialogRef: MatDialogRef<PlanBalanceComponent>,
    ) {
    this.execute(); 
  }

  ngOnInit(): void {
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

          this.storeCamp.by = uid;
          /*
          this.auth.user$.pipe(take(1)).subscribe(mine => {
            if(!mine){}else{
              this.storeCamp.campaignName = 'Campaign-'+ (1 + mine.storeCam.length);
              this.storeCamp.by = mine.uid;
              //this.storeCamp.dateS = this.startDate.getMonth() + "/" + this.startDate.getDate() + "/" + this.startDate.getFullYear();
              //this.storeCamp.dateE;
            }
          })
          */
        }
      })
    }
  }


  createStoreCampaign(tX:string, cost:number){
    const sendData = {//id:"res.id", 
    tX:tX //, storeCamp:this.storeCamp
    }
    this.dialogRef.close(sendData)

  }

}
