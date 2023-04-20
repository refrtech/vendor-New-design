import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { PaymentService } from 'src/app/services/payment.service';
import { Shop } from 'src/app/universal.model';

@Component({
  selector: 'app-draw-balance',
  templateUrl: './draw-balance.component.html',
  styleUrls: ['./draw-balance.component.scss']
})
export class DrawBalanceComponent implements OnInit {

  minLimit = 1000;
  maxLimitUPI = 100000;
  maxLimitBANK = 200000;

  amountX:number|undefined = undefined;
  payMethod = "";
  makingChanges = false;

  constructor(
    public auth: AuthService,
    private pay: PaymentService,
    private dialogRef: MatDialogRef<DrawBalanceComponent>
  ) { }

  ngOnInit(): void {
  }

  setPayMethod(x:string, BankIMPS:any, BankUPI:any){
    if(x == "IMPS"){

      if(!BankIMPS || !BankIMPS.verified){
        this.auth.resource.startSnackBar("Please sync your banking details for IMPS.")
      }else{
        this.payMethod = x;
      }
    }
    if(x == "UPI"){
      if(!BankUPI || !BankUPI.verified){
        this.auth.resource.startSnackBar("Please sync your VPA details for UPI.")
      }
      else {
        this.payMethod = x;
      }
    }
  }

  getDRAWABLE(acBalV:number, acBalH:number){
    return (
      acBalH > 0 ? acBalV : (
        (acBalV + acBalH > 0 ? acBalV + acBalH : 0)
      ));
  }

  reqDRAW(uid:string, sid:string, acBalV:number, acBalH:number, BankIMPS:any, BankUPI:any,
    username:string
    ){
    this.makingChanges = true;

    if(!uid || !sid){
      this.auth.resource.startSnackBar("Something went wrong...")
      this.makingChanges = false;
    }else{

    if(!this.payMethod){
      this.auth.resource.startSnackBar("Please select a payment method.")
      this.makingChanges = false;
    }else{
        if(!this.amountX || this.amountX == 0 || this.amountX < this.minLimit){
          this.auth.resource.startSnackBar("Please enter amount greater than " + this.minLimit + ".")
          this.makingChanges = false;
        }else{
          if( this.getDRAWABLE(acBalV, acBalH) < 1000 ){
            this.auth.resource.startSnackBar("Drawable balance is less than 1000.")
            this.makingChanges = false;
          }else{

            const balance:number = acBalV;
            const locked:number = ( acBalH > 0 ? acBalV : ( (acBalV + acBalH > 0 ? 0 : acBalV + acBalH) ));
            const redeem:number = this.amountX;
            const xBankIMPS:any = !BankIMPS ? null : BankIMPS;
            const xBankUPI:any = !BankUPI ? null : BankUPI;

this.auth.getStore(sid).pipe(take(1)).subscribe(shop => {
            let storename = shop["name"];
            // console.log("storename ", storename)

            if(this.payMethod == "IMPS" && BankIMPS && BankIMPS.verified){
              this.startIMPS(uid, sid, xBankIMPS, xBankUPI, balance, locked, redeem,
                username, storename)
            }
            if(this.payMethod == "UPI" && BankUPI && BankUPI.verified){
              this.startUPI(uid, sid, xBankIMPS, xBankUPI, balance, locked, redeem,
                username, storename)
            }

})

          }
        }
      }

    }
  }

  startIMPS(user:string, store:string, BankIMPS:any, BankUPI:any, balance:number, locked:number, redeem:number,
    username:string, storename:string
    ){
    console.log("startIMPS")
    this.pay.createPayout("IMPS", BankIMPS, BankUPI, user, store, balance, locked, redeem,
    username, storename
    ).then(() => {
      this.dialogRef.close({success:true, redeem})
    })
  }

  startUPI(user:string, store:string, BankIMPS:any, BankUPI:any, balance:number, locked:number, redeem:number,
    username:string, storename:string
    ){
    console.log("startUPI")
    this.pay.createPayout("UPI", BankIMPS, BankUPI, user, store, balance, locked, redeem,
    username, storename
    ).then(() => {
      this.dialogRef.close({success:true, redeem})
    })
  }

}
