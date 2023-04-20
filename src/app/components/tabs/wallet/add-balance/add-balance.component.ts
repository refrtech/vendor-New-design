import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-add-balance',
  templateUrl: './add-balance.component.html',
  styleUrls: ['./add-balance.component.scss']
})
export class AddBalanceComponent implements OnInit {

  makingChanges = false;
  payX:any|number|undefined = undefined;
  refrCut = 10; // 10% of any value

  constructor(
    public auth: AuthService,
    private dialogRef: MatDialogRef<AddBalanceComponent>
  ) { }

  ngOnInit(): void {
  }

  choosePay(amt:number){
    this.payX = amt;
  }

  getCut(){
    if(this.payX && this.payX > 999){
      return ( this.payX * this.refrCut / 100 );
    }else{
      return undefined;
    }
  }

  startPay(){
      this.makingChanges = true;
      console.log(!this.payX , (this.payX < 1000) , this.invalidAMT(this.payX) )

    if(!this.payX || this.payX < 1000 || this.invalidAMT(this.payX) ){
      this.auth.resource.startSnackBar("Amount must be higher than ₹999")
      this.makingChanges = false;
    }else{
      const cut = this.getCut() || 0;
      const refill = this.payX - cut;
      this.dialogRef.close({success:true,amt:this.payX, rate:{ cut:cut, refill:refill, cutRate: this.refrCut } });
    }

  }

  invalidAMT(amt:number){
    const newNum  = new FormControl(amt, [
      Validators.pattern('^[0-9]+$')
    ]);
    return newNum.invalid;
  }

}
