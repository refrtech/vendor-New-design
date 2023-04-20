import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ResourceService } from 'src/app/services/resource.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {

  form: FormGroup = new FormGroup({
    name : new FormControl(),
    phone: new FormControl(),
  });

  constructor(
    public resource : ResourceService,
    private _bottomSheetRef: MatBottomSheetRef<NewCustomerComponent>
  ) { }

  ngOnInit(): void {
  }

  close() {
    this._bottomSheetRef.dismiss();
  }

  invalidPhone(phone: string) {
    const newkey = new FormControl(phone,[
      Validators.pattern('^[1-9]{1}[0-9]{9}$')
    ]);
    return newkey.invalid;
  }

  invalidName(name:string){
    const newKey  = new FormControl(name, [
      Validators.pattern('^[A-Za-z ]+$')
    ]);
    return newKey.invalid;
  }

  submit() {
    if ( !this.form.value.phone || this.invalidPhone(this.form.value.phone)) {
      this.resource.startSnackBar("Invalid Phone phone.");
    }
    else{

      if(!this.form.value.name || this.form.value.name?.trim() == "" || this.invalidName(this.form.value.name)){
      this.resource.startSnackBar("Please Enter Contcat Name.");
      }else {
        //console.log("valid phone & valid Contact Name" +this.form.value);
        this._bottomSheetRef.dismiss({success:true, ...this.form.value });
      }

    } 
  }

}
