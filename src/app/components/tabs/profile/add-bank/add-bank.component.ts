import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-add-bank',
  templateUrl: './add-bank.component.html',
  styleUrls: ['./add-bank.component.scss']
})
export class AddBankComponent implements OnInit {

  type = "";
  makingChanges = false;

  bankX = {
    IFSC:"",
    AcNo:"",
    NAME:""
  }
  vpaX = ""

  constructor(
    private resource: ResourceService,
    private dialogRef: MatDialogRef<AddBankComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    if(data.type  == 'IMPS'){
      this.type = 'IMPS';
    }
    if(data.type == 'UPI'){
      this.type = 'UPI';
    }
   }

  ngOnInit(): void {
  }

  invalid_IFSC(IFSC:string){
    const newKey  = new FormControl(IFSC, [
      Validators.pattern('^[A-Za-z]{4}0[A-Z0-9a-z]{6}$')
    ]);
    return newKey.invalid;
  }

  invalid_AcNo(AcNo:string){
    const newKey  = new FormControl(AcNo, [
      //Validators.pattern('^(?:[0-9]{11}|[0-9]{2}-[0-9]{3}-[0-9]{6})$')
      Validators.pattern('^[0-9]{9,18}$'),
      Validators.minLength(9),
      Validators.maxLength(18)
    ]);
    return newKey.invalid;
  }

  invalid_NAME(NAME:string){
    const newKey  = new FormControl(NAME, [
      Validators.pattern('^[0-9A-Za-z ]+$'),
      Validators.minLength(3),
      Validators.maxLength(32)
    ]);
    return newKey.invalid;
  }

  submitBANK(){
    this.makingChanges = true;

    if(!this.bankX.IFSC || this.invalid_IFSC(this.bankX.IFSC) ){
      this.resource.startSnackBar("Please Enter Valid IFSC")
      this.makingChanges = false;
    }else{
      if(!this.bankX.AcNo || this.invalid_AcNo(this.bankX.AcNo)){
        this.resource.startSnackBar("Please Enter Valid Account Number")
        this.makingChanges = false;
      }else{
        if(!this.bankX.NAME || this.invalid_NAME(this.bankX.NAME)){
          this.resource.startSnackBar("Please Enter Valid Name")
          this.makingChanges = false;
        }else{
          this.dialogRef.close({success:true, bank: this.bankX});
        }
      }
    }
  }


  invalid_VPA(VPA:string){
    const newKey  = new FormControl(VPA, [
      //Validators.pattern('^[\w.-]+@[\w.-]+$')
      Validators.pattern('^[a-zA-Z0-9\\.\\-]{2,256}\\@[a-zA-Z][a-zA-Z]{2,64}$')
    ]);
    return newKey.invalid;
  }

  submitUPI(){
    this.makingChanges = true;
    if(!this.vpaX || this.invalid_VPA(this.vpaX)){
      this.resource.startSnackBar("Please Enter Valid UPI ID")
      this.makingChanges = false;
    }else{
      this.dialogRef.close({success:true, vpa: this.vpaX});
    }
  }

}
