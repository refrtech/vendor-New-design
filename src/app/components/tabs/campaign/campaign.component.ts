import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DependencyService } from 'src/app/services/dependency.service';
import { ThemeService } from 'src/app/services/theme.service';
import { User } from 'src/app/universal.model';
import { PayComponent } from '../../pay/pay.component';
import { NewCampaignComponent } from '../../store-create/new-campaign/new-campaign.component';

@Component({
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss']
})
export class CampaignComponent implements OnInit {

  userID = "";
  storeID = "";
  userData:User | undefined;

  campaign$: Observable<any[]> = of();

  constructor(
    public themeService: ThemeService,
    public auth: AuthService,
    public dependancy: DependencyService,
    public router: Router,
  ) {
    this.dependancy.activeroute = this.router.url;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.auth.user$.pipe(take(1)).subscribe((mine:any) => {
      if(!mine){

      }else{
        //this.execute(mine);
        if(mine.storeLoc?.length > 0){
          if(mine.storeCam?.length > 0){
            this.userID = mine.uid;
            this.storeID = mine.storeLoc[0];
            this.userData = mine;
            this.execute(mine);
          }else{
            console.log("CREATE CAMP")
            // GO TO CREATE CAMP
            //this.auth.resource.router.navigate(["/store/create-campaign"]);
          }
        }else{
          console.log("CREATE STORE")
          // GO TO CREATE STORE
          //this.auth.resource.router.navigate(["/store/create-location"]);
        }
      }

    })
  }

  execute(mine:User){
    setTimeout(() => {
      this.campaign$ = this.auth.getMyCampaignByUID(mine.uid, 22) //.pipe(take(1));
    }, 3000);
  }

  campCost(tX:string){
    if(tX == "tC"){
      return 0;
    }else{
      const t = this.auth.resource.campaignPlans.findIndex((x:any) => x.tX == tX);
      if(t == -1){
        return 0;
      }else{
        return this.auth.resource.campaignPlans[t].total;
      }
    }
  }

  createNew(){
    let w = (this.auth.resource.getWidth - 16) + 'px';
    let h = (this.auth.resource.getHeight - 16) + 'px';
    const refDialog = this.auth.resource.dialog.open(NewCampaignComponent, {
      width: w, minWidth: "320px", maxWidth: "480px",
      height:h,
      data:{enableDirect:true},
      disableClose: true,
      panelClass:"dialogLayout"//, autoFocus:false
    });

    refDialog.afterClosed().subscribe(ref =>{
      if(!ref || !ref.id){}else{
        if(this.userData){
          console.log("Add Money")
          //this.execute(this.userData);
          // const costX = (ref.tX !== 'tC') ? this.campCost(ref.tX) : ref.payCustom
          // const amRate = this.auth.resource.campaignPlans;
          // const amCamp = costX;
          // //const amMerc = this.getMerchCost() || 0;
          // const amSale = 0//(this.campCost(tX) + ( (oferOFF ? this.oferCost(oferOFF):0) + ( oferONL ? this.oferCost(oferONL):0) ));
          // const amCost = costX;
          // const amSave = 0;//(oferOFF ? this.oferCost(oferOFF):0) + ( oferONL ? this.oferCost(oferONL):0);
          // const amTotal = costX;
          // this.startPayment( this.userData.uid, ref.tX, amRate, amCamp,
          //   //amMerc,
          //   amSale,amCost,amSave,amTotal
          //   //this.userData.uid, //ref.storeCamp
          //   )
        }
      }
    })
    //this.auth.resource.router.navigate(["/store/create-campaign"])
  }


  startPayment(
    by:string, tX:string, amRate:any, amCamp:number,
    //amMerc:number,
    amSale:number, amCost:number, amSave:number,
    amTotal:number
  ){
    let w = this.auth.resource.getWidth + "px";
    let h = this.auth.resource.getHeight + "px";
    const refDialog = this.auth.resource.dialog.open(PayComponent, {
      width: w, minWidth: w, maxWidth: w,
      height: h,
      data:{
        from:"CAMP", tX:tX,
          type:["addBalance", "nextBalance", "vendorAc"], by, to:"Δ",
          amRate, amCamp,
          //amMerc,
          amSale, amCost, amSave,
          amTotal,
          userData:this.userData
      },
      //data:{
      //   type:["addBalance", "firstBalance", "vendorAc"], by, to:"Δ",
      //   amRate, amCamp, amMerc, amSale, amCost, amSave, amTotal,
      //   userData:this.userData
      // },
      disableClose: true, panelClass:"dialogLayout"//, autoFocus:false
    });
    refDialog.afterClosed().subscribe(ref =>{
      if(!ref.success){
        console.log(ref)
        this.auth.resource.startSnackBar(ref.info)
        //this.disableForm = false;
      }else{
        console.log("Payment Complete")

      }
    })
  }

  //startPayment(){

        // this.auth.resource.startSnackBar("Payment Successful")
        // if( this.storeTyp == 'Both' || this.storeTyp == 'Onli' ){
        //   this.auth.resource.router.navigate(["/store/add-product"])
        // }else{
        //   this.auth.resource.router.navigate(["/dash"])
        // }
  //}

  sendSMS(){
    const url = "sms:+19725551212?body=hello%20there";
    window.open(url, "_blank");
  }

}

