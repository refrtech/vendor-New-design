import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { take } from 'rxjs';
import { PaymentService } from 'src/app/services/payment.service';
import { WindowService } from 'src/app/services/window.service';

declare var RazorpayCheckout:any;

@Component({
  selector: 'app-pay',
  templateUrl: './pay.component.html',
  styleUrls: ['./pay.component.scss']
})
export class PayComponent implements OnInit {

  paymentId:string ="";
  paymentData;
  payFail = false;
  paySuccess = false;

  constructor(
    private pay: PaymentService,
    public dialogRef: MatDialogRef<PayComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private winRef: WindowService,
  ) { 
    this.paymentData = this.data;
    console.log( data );

    if(!data){
      console.log("NO DATA")

    }else{

      if(this.paymentData.from == 'SIGN'){
      this.pay.startGatewaySign(this.data).then(ref => {
        if(!ref){
          this.payFailed("Payment Failed, Try again...");
        }else{
          this.paymentId = ref.id;
          this.createRzpayOrder(this.paymentId, this.paymentData.amTotal, "Refr Technology", "Campaign Refill & Merchandise","#512da8")
        }
      })
      }

      if(this.paymentData.from == 'CAMP'){
        console.log("paymentData", this.paymentData)
      this.pay.startGatewayCamp(this.data).then(ref => {
        if(!ref){
          this.payFailed("Payment Failed, Try again...");
        }else{
          this.paymentId = ref.id;
          console.log("paymentId", ref)
          this.createRzpayOrder(this.paymentId, this.paymentData.amTotal, "Refr Technology", "Onboarding Refill","#512da8")
        }
      })
      }

      if(this.paymentData.from == 'FUND'){
        console.log("paymentData", this.paymentData)
      this.pay.startGatewayCamp(this.data).then(ref => {
        if(!ref){
          this.payFailed("Payment Failed, Try again...");
        }else{
          this.paymentId = ref.id;
          console.log("paymentId", ref)
          this.createRzpayOrder(this.paymentId, this.paymentData.amTotal, "Refr Technology", "Campaign Refill","#512da8")
        }
      })
      }

      if(this.paymentData.from == 'WALL'){
        console.log("paymentData", this.paymentData)
      this.pay.startGatewayWallet(this.data).then(ref => {
        if(!ref){
          this.payFailed("Payment Failed, Try again...");
        }else{
          this.paymentId = ref.id;
          console.log("paymentId", ref)
          this.createRzpayOrder(this.paymentId, this.paymentData.amTotal, "Refr Technology", "Wallet Balance","#512da8")
        }
      })
      }


    }

  }

  ngOnInit(): void {
  }

  payFailed(info:string){
    this.payFail = true;
    setTimeout(() => {
      this.dialogRef.close({success:false, info});
    }, 5000)
  }
/*

            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            order_id: response.razorpay_order_id
*/
  payComplete(type:string, response: any, gwInfo:any){
    this.paySuccess = true;
    if(type !== "razorpay" || !this.paymentData.by || !this.paymentData.amTotal){
      this.payFailed("Payment Failed, You will be refunded within 3 to 15 days.");
    }else{
      console.log("Payment responce", response);
      const gwID = response.razorpay_payment_id;
      const gwSIGN = response.razorpay_signature;
      const gwORDR = response.razorpay_order_id;
      const amt = this.paymentData.amCamp;
      const tX = this.paymentData.tX;
      console.log("tX:", tX)

      if(this.paymentData.from == 'WALL'){
          const amtX:number = this.paymentData.amRate.refill;
          const refrFees:number = this.paymentData.amRate.cut;
          const ExRate:number = this.paymentData.amRate.cutRate;

        this.pay.addVendorHypeBalance(
          this.paymentId, this.paymentData.by, amtX,//this.paymentData.amTotal, 
          gwID,gwSIGN,gwORDR, gwInfo
        );
        this.pay.records("", refrFees)
      }


      if(this.paymentData.from == 'SIGN' || this.paymentData.from == 'CAMP' || this.paymentData.from == 'FUND'){
        if(
          tX == 't1' || tX == 't2' || tX == 't3' || tX == 't4' ||
          tX == 't11' || tX == 't12' || tX == 't13' || tX == 't14' || tX == 't15' || tX == 't16' ||
          false
          ){
          const t = this.pay.resource.campaignPlans.findIndex((x:any) => x.total == amt);
          const campX = this.pay.resource.campaignPlans[t];
          const amtX = campX.refill;
          let camper = {
            cost: 2000,
            refill: 1660, refr: 700,
            refrGST: 44.66, refrGST_c: 9, refrGST_n: 18, refrGST_s: 9, 
            refrGw: 47.2, refrGwRATE: 2.36,
            tX: "t11",
            total: 2000
          }

          this.pay.addVendorHypeBalance(
            this.paymentId, this.paymentData.by, amtX,//this.paymentData.amTotal, 
            gwID,gwSIGN,gwORDR, gwInfo
          ).then(() => {
            const data = {
              campCharge: camper.total,
              campRefill: camper.refill,
              campRefr: camper.refr,
              campGST: camper.refrGST,
              campGateway: camper.refrGw,
              campGatewayTook: (2/100 * camper.cost),
              campGatewayTax: (18/100 * (2/100 * camper.cost)),
            }
            this.pay.recordsCamp(data)
          });
        }
        if(tX == 'tC'){

        }
        if(this.paymentData.userData.campID){
          console.log("CAMP: " + this.paymentData.userData.campID)
          this.pay.completeHypePayment(this.paymentData.userData.campID);
        }
      }


      setTimeout(() => {
        this.dialogRef.close({success:true});
      }, 3000)

    }
  }

  createRzpayOrder(orderId:string, amount:number, to:string, about:string, theme:string) {
    const data = {
      name: to || "No Name",
      description:about ||"No description",
      amount:amount, currency:"INR", //amount_paid:5000, amount_due:126,
      orderId:orderId,
      userData: this.paymentData.userData,
      theme:theme || "#ff0000"
    }
    //console.log(data);
    //RazorpayCheckout.on("payment.success", successCallback);
    //RazorpayCheckout.on("payment.cancel", cancelCallback);
    // RazorpayCheckout.open(initRes);
    // call api to create order_id
    //this.pay.payWithRazor(data);
    this.pay.onlinePaymentNew("IND", data).pipe(take(1)).subscribe((getPayRes: any) => {
      console.log("getPayRes", getPayRes);

      if(getPayRes && getPayRes.success){
    
        getPayRes.modal = {
          ondismiss: () => {
            console.log("ondismiss")
            this.payFailed("Payment Failed, Try again...");
            // this.storeservice.cancelOrder(orderId).subscribe((elem) => {
            //   if(elem.status === 200){
            //     console.log(elem);
            //     //this.toastrService.error('Transaction has been cancelled')
            //     //this.router.navigate(["/tabs/home"])
            //   }
            // });
          },
        };
        getPayRes.handler = (response:any, error:any) => {
          console.log("hello bro: ")
          if (response) {
          console.log("response: ", response)
          const dataVerify = {
            amount:amount, currency:"INR", //amount_paid:5000, amount_due:126,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
            order_id: response.razorpay_order_id
          }
          console.log("dataVerify",dataVerify)
          //this.payComplete("razorpay", response)

          this.pay.verifyPayment("IND", dataVerify).pipe(take(1)).subscribe((getVerifyRes:any) => {
             console.log("getPayRes", getVerifyRes)
             if(!getVerifyRes || !getVerifyRes.success){
              this.payFailed("Payment Failed, Try again...");
             }else{
              this.payComplete("razorpay", response, getVerifyRes.gwInfo)
             }
          })
          //Check if success

          /*
          */
          
            //this.toastrService.success('Payment completed successfully.');

            //this.router.navigate(["/OrderStatus/" + data.orderId +'/' + (this.type || "direct") ]); //DIP
            //this.router.navigate([`/success-message/${response.razorpay_order_id}`]);
          }
          if(error){
            console.log("error: ", error)
            this.payFailed("Payment Failed, Try again..."); // You need to store error
            //this.toastrService.success('Payment failed.');
            //this.router.navigate(["/tabs/home"])
          }
        };
        const rzp = new this.winRef.nativeWindow.Razorpay(getPayRes);
        rzp.open();

      }
    });
  }


}
