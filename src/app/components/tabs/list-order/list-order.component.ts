import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DependencyService } from 'src/app/services/dependency.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ThemeService } from 'src/app/services/theme.service';
import { User } from 'src/app/universal.model';
import { OrdrShipComponent } from './ordr-ship/ordr-ship.component';
import { OrdrTrackComponent } from './ordr-track/ordr-track.component';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit {
  payments$: Observable<any[]> = of();
  paymentOrder$: Observable<any[]> = of();
  showDetailsOrders: string[] =[];
  makeChanges = false;

  constructor(
    public themeService: ThemeService,
    public auth: AuthService,
    public pay: PaymentService,
    public router:Router,
    public dependancy:DependencyService
  ) {
    this.dependancy.activeroute = this.router.url;
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
  
    this.auth.user$.pipe(take(1)).subscribe((mine:any) => {
      if(!mine){

      }else{
        //this.execute(mine);
        if(mine.storeLoc?.length > 0){
          if(mine.storeCam?.length > 0){
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
      const typeO:string[] = ["addOrder"];
      // this.payments$ = of([])
      this.paymentOrder$ = this.pay.getAllOrdersO(mine.uid, 50, typeO) //.pipe(take(1));
      //this.payments$ = this.pay.getAllOrdersO(mine.uid, 5, type).pipe(take(1));
    }, 3000);

  };

  expandOrderCard(id:string) {
    if(!this.showDetailsOrders.includes(id)){
      this.showDetailsOrders.push(id);
    }else{
      this.showDetailsOrders.splice( this.showDetailsOrders.indexOf(id) , 1)
    }
 }

 ordrStatus(journey:string, ordr:any, setStatus:any){
  this.makeChanges = true;
  console.log(setStatus)
  
if(journey == "F2F"){

if(setStatus == "Placed"){
  this.makeChanges = false;

}

if(setStatus == "Refund"){// goes to Refunded
  const ordrTYPE = ordr.ordrTYPE;

  const sid = ordr.sid;
  const uidV = ordr.to;
  const uidC = ordr.by;
  const uidR = ordr.refr.uid;

  const costUSER = ordr.amTotal;
  const transferRefrCash = ordr.invoice.useRefrCash ? ordr.invoice.amtRefrCash : 0;
  const cashback = ordr.earn;
  const referalCashback = ordr.refr.earn;

  this.pay.transferRefundF2F(
    sid, uidV, uidC, uidR, 
    costUSER, transferRefrCash, cashback, referalCashback
    ).then(ref => {
      if(!ref.success){

      }else{
        if(ordrTYPE == "RefrCASH+ONLINE" || ordrTYPE == "ONLINE"){
          const paymentID = ordr.gwID;
          const paymentAmt = ordr.amCost;
          this.pay.onlinePaymentRefund("IN", ordr.id, paymentID, paymentAmt, "INR").pipe(take(1)).subscribe((razorRef:any) => {
              console.log(razorRef)
            if(!razorRef || !razorRef.success){
              this.auth.resource.startSnackBar("Failed to refund.")
            }else{
              const newLO = ordr.logistics;
              newLO.status = -1000;
              
              this.makeChanges = false;
              return this.pay.changeRefundOnlineF2F(ordr.id, -10, newLO, razorRef)
            }
          })
  
        }else{
          const newLO = ordr.logistics;
          newLO.status = -1000;
          
          this.makeChanges = false;
          return this.pay.changeRefundOnlineF2F(ordr.id, -10, newLO, {})
        }
      }
    })

/*
  const newLO = ordr.logistics;
  newLO.status = -1000;

  const uidC = ordr.by;
  const uidR = ordr.refr.uid;
  const amtC = ordr.earn;
  const amtR = ordr.refr.earn;
  if(!ordr.gwInfo){
    console.log("GATEWAY INFO")
    this.pay.transferRefund(ordr.id, newLO, uidC, uidR, amtC, amtR).then(() => {
      this.makeChanges = false;
    })
  }else{
    console.log("GATEWAY INFO", ordr.gwInfo)
  }
*/      
/*
  this.pay.changeStatusOnlineF2F(ordr.id, -10, newLO).then(() => {
    this.makeChanges = false;
  })
*/
}

if(setStatus == "Delivered"){// goes to Delivered
  const newLO = ordr.logistics;
  newLO.status = 20;

  /*
  this.pay.changeStatusOnlineF2F(ordr.id, 10, newLO)
  */
  const uidC = ordr.by;
  const uidR = ordr.refr.uid;
  const amtC = ordr.earn;
  const amtR = ordr.refr.earn;
  const sid = ordr.sid;

  this.pay.transferDeliveredF2F(sid, ordr.id, newLO, uidC, uidR, amtC, amtR).then(() => {
    // remove from reserved & add to permenent balance
    this.makeChanges = false;
  })
}

}

if(journey == "DIRECT"){

if(setStatus == "Placed"){
  this.makeChanges = false;

}

if(setStatus == "Refund"){// goes to Refunded
  const ordrTYPE = ordr.ordrTYPE;

  const sid = ordr.sid;
  const uidV = ordr.to;
  const uidC = ordr.by;
  //const uidR = ordr.refr.uid;

  const costUSER = ordr.amTotal;
  const transferRefrCash = ordr.invoice.useRefrCash ? ordr.invoice.amtRefrCash : 0;
  //const cashback = ordr.earn;
  //const referalCashback = ordr.refr.earn;

  this.pay.transferRefundDIRECT(
    sid, uidV, uidC, //uidR, 
    costUSER, transferRefrCash //, cashback, referalCashback
    ).then(ref => {
      if(!ref.success){
        this.auth.resource.startSnackBar("Failed to refund.")
      }else{
        if(ordrTYPE == "RefrCASH+ONLINE" || ordrTYPE == "ONLINE"){
          const paymentID = ordr.gwID;
          const paymentAmt = ordr.amCost;
          this.pay.onlinePaymentRefund("IN", ordr.id, paymentID, paymentAmt, "INR").pipe(take(1)).subscribe((razorRef:any) => {
              console.log("razorRef", razorRef)
            if(!razorRef || !razorRef.success){
              this.auth.resource.startSnackBar("Failed to refund.")
            }else{
              const newLO = ordr.logistics;
              newLO.status = -1000;
              
              this.makeChanges = false;
              return this.pay.changeRefundOnlineDIRECT(ordr.id, -10, newLO, razorRef)
            }
          })
  
        }else{
          const newLO = ordr.logistics;
          newLO.status = -1000;
          
          this.makeChanges = false;
          return this.pay.changeRefundOnlineDIRECT(ordr.id, -10, newLO, {})
        }
      }
    })

}

if(setStatus == "Delivered"){// goes to Delivered
  const newLO = ordr.logistics;
  newLO.status = 20;

  /*
  this.pay.changeStatusOnlineF2F(ordr.id, 10, newLO)
  */
  const uidC = ordr.by;
  //const uidR = ordr.refr.uid;
  const amtC = ordr.earn;
  //const amtR = ordr.refr.earn;
  const sid = ordr.sid;
  console.log("dataSend", ordr)

  this.pay.transferDeliveredDIRECT(sid, ordr.id, newLO, uidC, //uidR, 
    amtC //, amtR
    ).then(() => {
    // remove from reserved & add to permenent balance
    this.makeChanges = false;
  })
}

}

if(journey == "BURN"){

if(setStatus == "Placed"){
  this.makeChanges = false;

}

if(setStatus == "Refund"){// goes to Refunded
  const ordrTYPE = ordr.ordrTYPE;

  const sid = ordr.sid;
  const uidV = ordr.to;
  const uidC = ordr.by;
  //const uidR = ordr.refr.uid;

  const costUSER = ordr.amTotal;
  const transferRefrCash = ordr.invoice.useRefrCash ? ordr.invoice.amtRefrCash : 0;
  //const cashback = ordr.earn;
  //const referalCashback = ordr.refr.earn;

  this.pay.transferRefundBURN(
    sid, uidV, uidC, //uidR, 
    costUSER, transferRefrCash //, cashback, referalCashback
    ).then(ref => {
      if(!ref.success){

      }else{

        if(ordrTYPE == "RefrCASH+ONLINE" || ordrTYPE == "ONLINE"){
          const paymentID = ordr.gwID;
          const paymentAmt = ordr.amCost;
          this.pay.onlinePaymentRefund("IN", ordr.id, paymentID, paymentAmt, "INR").pipe(take(1)).subscribe((razorRef:any) => {
              console.log(razorRef)
            if(!razorRef || !razorRef.success){
              this.auth.resource.startSnackBar("Failed to refund.")
            }else{
              const newLO = ordr.logistics;
              newLO.status = -1000;
              
              this.makeChanges = false;
              return this.pay.changeRefundOnlineBURN(ordr.id, -10, newLO, razorRef).then(() => {

      return this.pay.recordsOrdrRefund({
        amt_refund:0,
        amt_refundMIX:(ordrTYPE == "RefrCASH+ONLINE" ? 0:0),
        amt_refundCOD: 0,
        amt_refundBAL:((ordrTYPE == "RefrCASH+ONLINE" || ordrTYPE == "RefrCASH") ? 0:0),
      })

              })
            }
          })
  
        }else{
          const newLO = ordr.logistics;
          newLO.status = -1000;
          
          this.makeChanges = false;
          return this.pay.changeRefundOnlineBURN(ordr.id, -10, newLO, {})
        }
      }
    })

}

if(setStatus == "Delivered"){// goes to Delivered
  const newLO = ordr.logistics;
  newLO.status = 20;

  const require = ordr.logistics.require;
  const amParcel = ordr.amParcel;
  const amBurst = ordr.amBurst;
  const amTax = ordr.amTax; // taken on order
  const amTaxTCS = ordr.amTaxTCS;
  const amTaxTDS = ordr.amTaxTDS;
  const amGateway = ordr.amGateway;
  const amTotal = ordr.amTotal;
  const amRefrCash =  ordr.invoice.useRefrCash ? ordr.invoice.amtRefrCash : 0;

  const tcs = amTaxTCS;
  const tds = amTaxTDS;
  const gateway = amGateway;
  const logistics = ( require ? amParcel : 0); // deduct if required value from shiprocket

  // This is a burn order therefore 10% cut
  const amRefr = (7.64/100 * amBurst) // cut 10% = 7.64 now 2.6+7 later
  const decuction = (amRefr + tcs + tds + gateway + logistics)
  const amBurstBURN = (amBurst - decuction);
  /*
  this.pay.changeStatusOnlineF2F(ordr.id, 10, newLO)
  */


  const uidV = ordr.to;
  const amtRemoveReserveV = amTotal;
  const amtBurstV = require ? (amBurstBURN + amParcel) : amBurstBURN;
  
  const uidC = ordr.by;
  //const uidR = ordr.refr.uid;
  const amtC = 0;
  const amtR = 0;//ordr.refr.earn;
  const sid = ordr.sid;


  this.pay.transferDeliveredBURN(sid, ordr.id, newLO, 
    //uidC, //uidR, 
    //amtC //, amtR
    uidC, amtC, 
    uidV, amtRemoveReserveV, amtBurstV
    ).then(() => {

      this.pay.recordsOrdr({
        client: ((amtC + amtR ) - amRefrCash),
        vendor: amtBurstV,
        ship: ( require ? amParcel : 0),
        shipVendor: ( !require ? amParcel : 0),
        taxes: amTax,
        tcs: amTaxTCS,
        tds: amTaxTDS,
        refr: amRefr,
        gateway: amGateway, 

        sales: amTotal,
        orders: 1,
        products: (ordr.cart?.length || 0),
      });

    // remove from reserved & add to permenent balance
    this.makeChanges = false;
  })
}

}


if(setStatus == "Shipping"){// goes to Shipping
const newLO = ordr.logistics;
newLO.status = 10;

if(!ordr.logistics.require){
  this.pay.changeStatusOnlineStore(ordr.id, 10, newLO).then(() => {
    this.makeChanges = false;
  }) 
}else{
  //this.makeChanges = false;
  let w = (this.auth.resource.getWidth - 16) + 'px';
  let h = (this.auth.resource.getHeight - 16) + 'px';

  const refDialog = this.auth.resource.dialog.open(OrdrShipComponent, {
    width: w, minWidth: "320px", maxWidth: "480px",
    height:h,
    data:{ordr:ordr},
    disableClose: true, 
    panelClass:"dialogClassShipment"//, autoFocus:false
  });
  refDialog.afterClosed().subscribe(result =>{
    if(!result || !result.success){
      this.makeChanges = false;
    }else{
      this.pay.startShiping(ordr.id, result.payDataUpdate).then(() => {
        this.pay.changeStatusOnlineStore(ordr.id, 10, newLO).then(() => {
          this.makeChanges = false;
        }) 
      })
    }
  })
}
}

if(setStatus == "Track"){// opens & updates tracking
const ship = ordr.logistics.require
let w = (this.auth.resource.getWidth - 16) + 'px';
let h = (this.auth.resource.getHeight - 16) + 'px';

const refDialog = this.auth.resource.dialog.open(OrdrTrackComponent, {
  width: w, minWidth: "320px", maxWidth: "480px",
  //height:h, 
  maxHeight: h,
  data:{ordr:ordr},
  //disableClose: true, 
  panelClass:"dialogClass"//, autoFocus:false
});
refDialog.afterClosed().subscribe(result =>{
  if(!result || !result.success){
    this.makeChanges = false;
  }else{
    if(!ship){

    }else{
    // this.pay.updateShiping(ordr.id, result.payDataUpdate).then(() => {
    // })
    let status = result.status;
    console.log("MARYADA", status)
    // STATUS CODE	DESCRIPTION
    // 0	
    // 6	Shipped
    // 7	Delivered
    // 8	Cancelled
    // 9	RTO Initiated
    // 10	RTO Delivered
    // 11	Pending
    // 12	Lost
    // 13	Pickup Error
    // 14	RTO Acknowledged
    // 15	Pickup Rescheduled
    // 16	Cancellation Requested
    // 17	Out For Delivery
    // 18	In Transit
    // 19	Out For Pickup
    // 20	Pickup Exception
    // 21	Undelivered

    if(status == 0 || status == 8 || status == 16){
      // x.journey == 'F2F' && x.status == -10 && x.logistics.status == -1000 || 
      // x.journey == 'DIRECT' && x.status == -10 && x.logistics.status == -1000 || 
      // x.journey == 'BURN' && x.status == -10 && x.logistics.status == -1000
      if(ordr.status == -10 && ordr.logistics.status == -1000){
        console.log("already refunded")
      }else{
        this.ordrStatus(journey, ordr, "Refund")
        console.log("Done refunded")
      }
    }else{
      if(status == 7){
        this.ordrStatus(journey, ordr, "Delivered")
        this.chargeVendor(ordr, ordr.logistics.weight)
      }
    }


    }
    this.makeChanges = false;
  }
})

}

}

  chargeVendor(ordr:any, weight:number){
    
  }

  getVARIENT(v:any){
    console.log("MANKIND", v)
    return v.type + ": " + v.name;
  }
  
}
