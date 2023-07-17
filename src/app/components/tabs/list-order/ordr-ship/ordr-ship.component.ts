import { Component, Inject, OnInit } from '@angular/core';
import { ref } from '@angular/fire/storage';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DependencyService } from 'src/app/services/dependency.service';

@Component({
  selector: 'app-ordr-ship',
  templateUrl: './ordr-ship.component.html',
  styleUrls: ['./ordr-ship.component.scss']
})
export class OrdrShipComponent implements OnInit {

  makingChanges = false;

    shipment = {
      uid:"uid",

      // For Pickup Location
      name: "",
      address: "", address_2: "",
      city: "", state:"", country: "",
      pin_code: "",

      // For Order Detail
      order_id: "",
      order_date: "",
      comment: "Refr Tech",

      billing_customer_name: "", billing_last_name: "",
      billing_address: "", billing_address_2: "",
      billing_pincode: "", billing_city: "", billing_country: "", billing_state: "",
      billing_email: "", billing_phone: "",

      order_items:<any[]>[
        // {
        //   name: "Product", sku: "chakra123",
        //   units: 10, selling_price: "100", discount: "", tax: "", hsn: 441122
        // }
      ],

      payment_method: "",//"COD", //COD||Prepaid
      shipping_charges: 0, giftwrap_charges: 0, transaction_charges: 0,
      total_discount: 0, sub_total: 0,

      O_length: 0.5, O_breadth: 0.5, O_height: 0.5, // cms & >0.5
      O_weight: 0.5 // KG & >0

    }

    payment:any = null;


  constructor(
    public depends: DependencyService,
    public auth: AuthService,
    private dialogRef: MatDialogRef<OrdrShipComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.payment = data.ordr;

    const pickME = data.ordr.logistics.addressPick;
    const pickTyp = data.ordr.logistics.addressPickT
    const dropME = data.ordr.logistics.addressDrop
    const dropTyp = data.ordr.logistics.addressDropT
    const ordrTYPE = data.ordr.ordrTYPE; // COD

    if(!pickME || !dropME){
      this.auth.resource.startSnackBar("Something went wrong...")
    }else{
      this.shipment.order_id = data.ordr.id
      this.shipment.name = data.ordr.storeName

      this.shipment.address = pickME?.line1
      this.shipment.address_2 = pickME.area
      this.shipment.city = pickME.city
      this.shipment.state = pickME.region
      this.shipment.country = "India"
      this.shipment.pin_code = pickME.zip

      this.shipment.billing_customer_name = data.ordr.userName || " "
      this.shipment.billing_last_name = " "//data.ordr.userName
      this.shipment.billing_address = dropME.address || " "
      this.shipment.billing_address_2 = dropME.landmark || " "
      this.shipment.billing_pincode = dropME.zip || " "

      this.shipment.billing_city = dropME.city || "Mumbai" || " "
      this.shipment.billing_state = dropME.state || "Maharashtra" || " "
      this.shipment.billing_country = dropME.nation || "India" || " "

      this.shipment.billing_email = data.ordr.logistics.email || " "
      this.shipment.billing_phone = data.ordr.logistics.phone || " "

      this.shipment.sub_total = data.ordr.amTotal;

      if(ordrTYPE == "COD"){this.shipment.payment_method = "COD"}else{this.shipment.payment_method = "Prepaid"}
      for (let p = 0; p < data.ordr.cart.length; p++) {
        const e = data.ordr.cart[p];
        const hsnCode = ""//(e.code ? e.code : "");
        const element = {
          name: e.title, sku: e.id || "",
          units: e.Q,
          selling_price: e.cost,
          discount: "", tax: "",
          hsn: hsnCode
        }
        this.shipment.order_items.push(element)
      }
    }
  }

  ngOnInit(): void {
  }

  submitShipment(uid:string, whenX:any){
    this.makingChanges = true;
    this.shipment.uid = uid;
    const DateX:Date = new Date() //whenX.toDate();
    const DateModel = {
      Y: (DateX.getFullYear()),
      M: ( (DateX.getMonth() + 1).toString().length == 2 ? "" : "0") + (DateX.getMonth() + 1),
      D: (DateX.getDate().toString().length == 2 ? "" : "0") + DateX.getDate(),
      h: (DateX.getHours().toString().length == 2 ? "" : "0") + DateX.getHours(),
      m: (DateX.getMinutes().toString().length == 2 ? "" : "0") + DateX.getMinutes(),
    }
    const newDate = DateModel.Y +"-"+ DateModel.M +"-"+ DateModel.D +" "+ DateModel.h +":"+ DateModel.m;
    this.shipment.order_date = newDate;

    if(
      !this.shipment.uid ||
      !this.shipment.name || !this.shipment.pin_code  ||
      !this.shipment.address ||
      !this.shipment.city || !this.shipment.state || !this.shipment.country ||

      !this.shipment.order_id ||
      !this.shipment.order_date ||
      !this.shipment.comment ||

      !this.shipment.billing_customer_name ||
      !this.shipment.billing_last_name ||
      !this.shipment.billing_address ||
      !this.shipment.billing_address_2 ||
      !this.shipment.billing_pincode ||
      !this.shipment.billing_city ||
      !this.shipment.billing_country ||
      !this.shipment.billing_state ||
      !this.shipment.billing_email ||
      !this.shipment.billing_phone ||

      !this.shipment.order_items || (this.shipment.order_items.length > 0 ? false : true) ||
      !this.shipment.payment_method ||
      //!this.shipment.shipping_charges || !this.shipment.giftwrap_charges || !this.shipment.transaction_charges || !this.shipment.total_discount || !this.shipment.sub_total ||

      !this.shipment.O_length || !this.shipment.O_breadth || !this.shipment.O_height ||
      !this.shipment.O_weight
      ){
      this.auth.resource.startSnackBar("Please fill required details.")
      this.makingChanges = false;
    }else{

      if(
        this.shipment.O_length < 0.5 ||
        this.shipment.O_breadth < 0.5 ||
        this.shipment.O_height < 0.5 ||
        this.shipment.O_weight < 0.5
      ){
        this.auth.resource.startSnackBar("Minimum l*b*h*w must be 0.5 cm & kg.")
        this.makingChanges = false;
      }else{
    this.depends.submitShipment("IN", this.shipment)//.pipe()
    .subscribe((res:any) => {
      if(!res || !res.success){
        this.auth.resource.startSnackBar("Something went wrong.")
        this.makingChanges = false;
      }else{

        if(!res.data){
          if(res.info == "Low balance"){
            this.auth.resource.startSnackBar("Wait until we load our wallets.")
            this.makingChanges = false;
          }else{
            if(res.info == "No Providers"){
              this.auth.resource.startSnackBar("There are no providers at this time, try later!")
              this.makingChanges = false;
            }else{
              this.auth.resource.startSnackBar("We were unable to start pickup.")
              this.makingChanges = false;
            }
          }

        }else{
          this.makingChanges = false;
          const payDataUpdate = {
            zEstimate: res.data.estimate,
            zBalance: res.dataCHECK.balance_amount,

            y1Login: res.dataLOG,
            y2Pickup: res.dataADDED,
            y3Order: res.dataCREATE,
            y4Provider: res.dataPROVIDERS,
            y5Chosen: res.p,
            y6Assign: res.dataASSIGN,
          }

          this.dialogRef.close({success:true, payDataUpdate});
        }

      }
    })
      }



    }
  }


}
