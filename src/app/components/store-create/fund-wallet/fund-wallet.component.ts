import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Hype } from 'src/app/universal.model';
import { PayComponent } from '../../pay/pay.component';

@Component({
  selector: 'app-fund-wallet',
  templateUrl: './fund-wallet.component.html',
  styleUrls: ['./fund-wallet.component.scss']
})
export class FundWalletComponent implements OnInit {
  userData = {
    uid:null, name:null,
    email:null, phone:null,
    campID:null
  };
  campaign$: Observable<any> = of();
  storeTyp = "";
  cart: string[] = [];
  oferOFF = "";
  oferONL = "";
  customRate = 0;

  disableForm = false;
  paymentDone = false;

  constructor(
    public auth: AuthService,
    private actRoute: ActivatedRoute
  ) {
    this.execute();
  }

  ngOnInit(): void {}

  execute(){
    const routePra = this.actRoute.snapshot.params;
    const what = routePra["campID"];
    console.log(what);

    if(!what){
      
    }else{
      this.auth.getCampaignByID(what).pipe(take(1)).subscribe((hype:any[]) => {
        if(!hype || !hype[0]){}else{
          console.log("Mant", hype[0]);
          this.campaign$ = of(hype[0]);
          this.storeTyp = hype[0].storeTyp;
          this.auth.resource.storeTypeNow = hype[0].storeTyp;
          this.auth.user$.pipe(take(1)).subscribe(mine => {
            this.userData = {
              uid: mine.uid,
              name: mine.name,
              email: mine.email,
              phone: mine.phone,
              campID: hype[0].id
            }
          })
          if(hype[0].tX == "tC"){ this.customRate = hype[0].customPay; }
          if(hype[0].paid){
            this.paymentDone = true;
          }
        }
      })
    }
  }

  getCart(tit:string){
    return this.cart.filter((x) => x == tit).length;
  }

  setCheck(tit:string, type: string, free:number){
    if(type == 'Onli'){
      this.oferOFF = tit;
    }else{
      this.oferONL = tit;
    }
    const m = this.cart.filter((x:any) => x == tit)
    console.log("Hit",m)
    if(m.length < free){
      for(var i=0; i < free; i++){
        this.cart.push(tit);
      }
    }
  }

  getMerchCost(){
      let x = 0;
    if(this.cart.length == 0){ return x; }else{
      for (let i = 0; i < this.cart.length; i++) {
        //const element = this.cart[i];
        const a = this.auth.resource.merchandiseList.findIndex((m:any) => m.tit == this.cart[i]);
        x = x + this.auth.resource.merchandiseList[a].cost;
        if((i+1) == this.cart.length){
          return x;
        }
      }
    }
  }

  minMerch(tit:string, free:number){
    return (this.oferOFF == tit || this.oferONL == tit) && (this.cart.filter(x => x == tit).length == free)
  }

  oferCost(tit:string){
    const o = this.auth.resource.merchandiseList.findIndex(x => { return x.tit == tit; });
    if(o == -1){return 0}else{
      return this.auth.resource.merchandiseList[o].cost * this.auth.resource.merchandiseList[o].free;
    }
  }

  campCost(tX:string){
    if(tX == "tC"){
      return this.customRate || 0;
    }else{
      const t = this.auth.resource.campaignPlans.findIndex((x:any) => x.tX == tX);
      if(t == -1){
        return 0;
      }else{
        return this.auth.resource.campaignPlans[t].total;
      }
    }
  }

  cheackOut(by:string, tX:string, oferOFF:string, oferONL:string){
    this.disableForm = true;
    if( !by || !tX ){
      this.auth.resource.startSnackBar("Something went wrong...")
      this.disableForm = false;
    }else{
      let payX = ( this.campCost(tX) + (this.getMerchCost() || 0) ) - ( (oferOFF ? this.oferCost(oferOFF):0) + ( oferONL ? this.oferCost(oferONL):0) );

      const amRate = this.auth.resource.campaignPlans;
      const amCamp = this.campCost(tX);
      const amMerc = this.getMerchCost() || 0;
      const amSale = (this.campCost(tX) + ( (oferOFF ? this.oferCost(oferOFF):0) + ( oferONL ? this.oferCost(oferONL):0) ));
      const amCost = payX;
      const amSave = (oferOFF ? this.oferCost(oferOFF):0) + ( oferONL ? this.oferCost(oferONL):0);
      const amTotal = payX;

      //this.startPayment()
      console.log( amRate, amCamp, amMerc, amSale,amCost,amSave,amTotal );
      this.startPayment( by, tX, amRate, amCamp, amMerc, amSale,amCost,amSave,amTotal );
    }
  }

  startPayment( by:string, tX:string, amRate:any, amCamp:number, amMerc:number, amSale:number, amCost:number, amSave:number, amTotal:number ){
    let w = this.auth.resource.getWidth + "px";
    let h = this.auth.resource.getHeight + "px";

    const refDialog = this.auth.resource.dialog.open(PayComponent, {
      width: w, minWidth: w, maxWidth: w,
      height: h, 
      data:{ 
        //campID: this.userData.campID,
        from:"SIGN", tX:tX,
        type:["addBalance", "firstBalance", "vendorAc"], by, to:"Δ", amRate, amCamp, 
        amMerc, 
        amSale, amCost, amSave, 
        amTotal, userData:this.userData },
      
      disableClose: true, panelClass:"dialogLayout"//, autoFocus:false
    });
    refDialog.afterClosed().subscribe(ref =>{
      if(!ref.success){
        console.log(ref)
        this.auth.resource.startSnackBar(ref.info)
        this.disableForm = false;
      }else{
        this.auth.resource.startSnackBar("Payment Successful")
        if( this.storeTyp == 'Both' || this.storeTyp == 'Onli' ){
          this.auth.resource.router.navigate(["/store/add-product"])
        }else{
          this.auth.resource.router.navigate(["/dash"])
        }
      }
    })
    
  }

}
