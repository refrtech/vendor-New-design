import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { addDoc, collection, collectionData, doc, Firestore, limit, orderBy, query, updateDoc, where, FieldValue, increment, serverTimestamp } from '@angular/fire/firestore';
import { arrayUnion } from '@firebase/firestore';
//import { AngularFireAuth } from '@angular/fire/compat/auth';
//import { AngularFirestore } from '@angular/fire/compat/firestore';

//import app from 'firebase/compat/app';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../universal.model';
import { DependencyService } from './dependency.service';
import { ResourceService } from './resource.service';

/*
name	uppercase	lowercase
alpha	Α	α
beta	Β	β
gamma	Γ	γ
delta	Δ	δ - SENT 2 THE COMPANY
epsilon	Ε	ε
zeta	Ζ	ζ
eta	Η	η
theta	Θ	θ
iota	Ι	ι
kappa	Κ	κ
lambda	Λ	λ
mu	Μ	μ
nu	Ν	ν
xi	Ξ	ξ
omicron	Ο	ο
pi	Π	π
rho	Ρ	ρ
sigma	Σ	σ
tau	Τ	τ
upsilon	Υ	υ
phi	Φ	φ
chi	Χ	χ
psi	Ψ	ψ
omega	Ω	ω
*/


@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  gWay:string = "walt";

  razorpayOptions = {}

  constructor(
    private httpClient: HttpClient,
    //public afAuth: AngularFireAuth,
    public afAuth: Auth,
    //private afs: AngularFirestore,
    private firestore: Firestore,
    public resource: ResourceService,
    public dependancy:DependencyService
  ) { }

  get getServerTimestamp(){ return serverTimestamp; }

  records(ac:string, amt:number){
    if(
      ac == "amt_refund" ||
      ac == "amt_refundMIX" ||
      ac == "amt_refundCOD" ||
      ac == "amt_refundBAL" ||

      ac == "amt_client" ||
      ac == "amt_vendor" ||
      ac == "amt_ship" ||
      ac == "amt_gateway" ||

      ac == "amtShop_client" ||
      ac == "amtShop_vendor" ||
      ac == "amtShop_ship" ||
      ac == "amtShop_shipVendor" ||
      ac == "amtShop_taxes" ||
      ac == "amtShop_tcs" ||
      ac == "amtShop_tds" ||
      ac == "amtShop_refr" ||
      ac == "amtShop_gateway" ||

      ac == "amtShopBurn_client" ||
      ac == "amtShopBurn_vendor" ||
      ac == "amtShopBurn_ship" ||
      ac == "amtShopBurn_shipVendor" ||
      ac == "amtShopBurn_taxes" ||
      ac == "amtShopBurn_tcs" ||
      ac == "amtShopBurn_tds" ||
      ac == "amtShopBurn_refr" ||
      ac == "amtShopBurn_gateway" ||

      ac == "client" ||
      ac == "gateway" ||
      ac == "given" ||
      ac == "refr" ||
      ac == "ship" ||
      ac == "taken" ||
      ac == "takenClient" ||
      ac == "takenVendor" ||
      ac == "taxes" ||
      ac == "tcs" ||
      ac == "tds" ||
      ac == "vendor"
    ){
    const gWayRef = doc(this.firestore,`assess`, `accounts`);

    return updateDoc(gWayRef, {ac: increment(amt)})
    }else{
      this.resource.startSnackBar("No such account.")
    }
  }

  recordsOrdrRefund(data:any){
    const gWayRef = doc(this.firestore,`assess`, `accounts`);
    return updateDoc(gWayRef, {
      amt_refund: increment(data.amt_refund),
      amt_refundMIX: increment(data.amt_refundMIX),
      amt_refundCOD: increment(data.amt_refundCOD),
      amt_refundBAL: increment(data.amt_refundBAL),
    })
  }

  recordsOrdr(data:any){
    const gWayRef = doc(this.firestore,`assess`, `accounts`);
    return updateDoc(gWayRef, {
      amt_client: increment(data.client),
      amt_vendor: increment(data.vendor + data.shipVendor),
      amt_ship: increment(data.ship),
      amt_gateway: increment(data.gateway),

      amtShopBurn_client: increment(data.client),
      amtShopBurn_vendor: increment(data.vendor),
      amtShopBurn_ship: increment(data.ship),
      amtShopBurn_shipVendor: increment(data.shipVendor),
      amtShopBurn_taxes: increment(data.taxes),
      amtShopBurn_tcs: increment(data.tcs),
      amtShopBurn_tds: increment(data.tds),
      amtShopBurn_refr: increment(data.refr),
      amtShopBurn_gateway: increment(data.gateway),


      amtShopBurn_sales: increment(data.sales),
      amtShopBurn_orders: increment(data.orders),
      amtShopBurn_products: increment(data.products),
    })
  }

  recordsCamp(data:any){
    const gWayRef = doc(this.firestore,`assess`, `accounts`);
    return updateDoc(gWayRef, {
      campCharge: data.campCharge,
      campRefill: data.campRefill,
      campRefr: data.campRefr,
      campGST: data.campGST,
      campGateway: data.campGateway,
      campGatewayTook: data.campGatewayTook,
      campGatewayTax: data.campGatewayTax,
    })
  }


  startGatewaySign(data:any){
    const newTimestamp = this.getServerTimestamp();
    const dataSend:any = {
      type:["addBalance", "firstBalance", "vendorAc", data.by],
      by:data.by, to:"Δ",
      amRate:data.amRate, amCamp:data.amCamp, amMerc:data.amMerc, amSale:data.amSale, amCost:data.amCost, amSave:data.amSave,
      amTotal:data.amTotal,
      sin: newTimestamp, upd: newTimestamp, com: newTimestamp
    }
    console.log("dataSend",dataSend);
    const gWayRefC = collection(this.firestore, `${this.gWay}`);
    return addDoc(gWayRefC, dataSend).then(ref => {
      const gWayRef = doc(this.firestore,`${this.gWay}`, `${ref.id}`)
      return updateDoc(gWayRef, {id:ref.id}).then(() => {return ref;})
    })
  }

  startGatewayCamp(data:any){
    const newTimestamp = this.getServerTimestamp();
    const dataSend:any = {
      type:["addBalance", "campaignBalance", "vendorAc", data.by],
      by:data.by, to:"Δ",
      amRate:data.amRate, amCamp:data.amCamp,
      //amMerc:data.amMerc,
      amSale:data.amSale, amCost:data.amCost, amSave:data.amSave,
      amTotal:data.amTotal,
      sin: newTimestamp, upd: newTimestamp, com: newTimestamp
    }
    console.log("dataSend",dataSend);
    const gWayRefC = collection(this.firestore,`${this.gWay}`);
    return addDoc(gWayRefC, dataSend).then(ref => {
      const gWayRef = doc(this.firestore,`${this.gWay}`, `${ref.id}`)
      return updateDoc(gWayRef, {id:ref.id}).then(() => {return ref;})
    })
  }

  startGatewayWallet(data:any){
    const newTimestamp = this.getServerTimestamp();
    const dataSend:any = {
      type:["addBalance", "walletBalance", "vendorAc", data.by],
      by:data.by, to:"Δ",
      //amRate:data.amRate, // amCamp:data.amCamp,
      //amMerc:data.amMerc,
      amSale:data.amSale, amCost:data.amCost, amSave:data.amSave,
      amTotal:data.amTotal,
      sin: newTimestamp, upd: newTimestamp, com: newTimestamp
    }
    console.log("dataSend",dataSend);
    const gWayRefC = collection(this.firestore,`${this.gWay}`);
    return addDoc(gWayRefC, dataSend).then(ref => {
      const gWayRef = doc(this.firestore,`${this.gWay}`, `${ref.id}`)
      return updateDoc(gWayRef, {id:ref.id}).then(() => {return ref;})
    })
  }

  startGatewayPayout(data:any){
    const newTimestamp = this.getServerTimestamp();
    const dataSend:any = {
      type:["payout", "requestPayout", "vendorAc", data.to],
      by:"Δ", to:data.to,
      status:0,
      amTotal:data.amTotal,
      sin: newTimestamp, upd: newTimestamp, com: newTimestamp
    }
    console.log("dataSend",dataSend);
    const gWayRefC = collection(this.firestore,`${this.gWay}`);
    return addDoc(gWayRefC, dataSend).then(ref => {
      const gWayRef = doc(this.firestore,`${this.gWay}`, `${ref.id}`)
      return updateDoc(gWayRef, {id:ref.id}).then(() => {return ref;})
    })
  }




  onlinePaymentNew(iso:string, obj:any){
    //return this.http.post<any>(`${environment.baseURL}/payment/initPaymentNew`, obj)
    const body = {
      type:"razorpay",
      gwID:"",
      amount:obj.amount, currency:obj.currency,
      amount_paid:obj.amount_paid,
      amount_due:obj.amount_due,
      receipt:obj.orderId,

      name: obj.name,
      description: obj.description,
      userData: obj.userData,
      theme: obj.theme,
      status:0
    }
    console.log("send payment")
    return this.httpClient.post(`${environment.server}/api/payments/sendPayment/${ iso }`, body);
  }

  onlinePaymentRefund(iso:string, orderId:string, paymentId:string, amount:number, currency:string){
    //return this.http.post<any>(`${environment.baseURL}/payment/initPaymentNew`, obj)
    const body = {
      paymentId: paymentId,
      amount:amount, currency: currency,
      receipt: orderId,
      /*
      type:"razorpay",
      gwID:"",
      amount_paid:obj.amount_paid,
      amount_due:obj.amount_due,
      receipt:obj.orderId,

      name: obj.name,
      description: obj.description,
      userData: obj.userData,
      theme: obj.theme,
      status:0
      */
    }
    console.log("send payment")
    return this.httpClient.post(`${environment.server}/api/payments/refundPayment/${ iso }`, body);
  }

  verifyPayment(iso:string, obj:any){
    //return this.http.post<any>(`${environment.baseURL}/payment/initPaymentNew`, obj)
    const body = {
      type:"razorpay",
      amount:obj.amount, currency:obj.currency,
      gwID:obj.paymentId, gwSIGN:obj.signature, gwORDR:obj.order_id,
    }
    console.log("verify payment")
    return this.httpClient.post(`${environment.server}/api/payments/verifyPayment/${ iso }`, body);
  }

  addVendorBalance(id:string, uid:string, amt: number, gwID:string, gwSIGN:string, gwORDR:string, gwInfo:any){
    const gWayRefC = doc(this.firestore,`${this.resource.env.db.users}`, `${uid}`);
    return updateDoc(gWayRefC, {acBalV:amt}).then(() => {
      return this.completePayment(id, gwID, gwSIGN, gwORDR,gwInfo);
    });
  }
  addVendorReserve(id:string, uid:string, amt: number, gwID:string, gwSIGN:string, gwORDR:string, gwInfo:any){
    const userRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uid}`);
    return updateDoc(userRef, {acBalVr:amt}).then(() => {
      return this.completePayment(id, gwID, gwSIGN, gwORDR,gwInfo);
    });
  }
  addVendorHypeBalance(id:string, uid:string, amt: number, gwID:string, gwSIGN:string, gwORDR:string, gwInfo:any){
    const userRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uid}`);
    return updateDoc(userRef, { acBalH: increment(amt) }).then(() => {
      return this.completePayment(id, gwID, gwSIGN, gwORDR, gwInfo);
    });
  }
  addClientBalance(id:string, uid:string, amt: number, gwID:string, gwSIGN:string, gwORDR:string, gwInfo:any){
    const userRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uid}`);
    return updateDoc(userRef, {acBalC:amt}).then(() => {
      return this.completePayment(id, gwID, gwSIGN, gwORDR,gwInfo);
    });
  }
  addClientReserve(id:string, uid:string, amt: number, gwID:string, gwSIGN:string, gwORDR:string, gwInfo:any){
    const userRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uid}`);
    return updateDoc(userRef, {acBalCr:amt}).then(() => {
      return this.completePayment(id, gwID, gwSIGN, gwORDR,gwInfo);
    });
  }
  addClientPointsBalance(id:string, uid:string, amt: number, gwID:string, gwSIGN:string, gwORDR:string, gwInfo:any){
    const userRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uid}`);
    return updateDoc(userRef, {acBalP:amt}).then(() => {
      return this.completePayment(id, gwID, gwSIGN, gwORDR,gwInfo);
    });
  }

  completePayment(id:string, gwID:string, gwSIGN:string, gwORDR:string, gwInfo:any){
    const userRef = doc(this.firestore, `${this.gWay}`, `${id}`);
    return updateDoc(userRef, {gwID:gwID, gwSIGN, gwORDR, status:10, gwInfo:gwInfo});
  }

  completeHypePayment(campID:string){
    const userRef = doc(this.firestore, `${this.resource.env.db.hypes}`, `${campID}`);
    return updateDoc(userRef, {paid: true});
  }

  getAllPayments(uid:string, s:number, type:string[]){
    const catData = collection(this.firestore, `${this.gWay}`)
    const qu = query(catData,
      where("type","array-contains", uid ),
      //where("by","==",uid),
      //orderBy("sin", "desc"),
      orderBy("com", "desc"),
      limit(s));
    return collectionData( qu );
  }

  getAllOrdersR(uid:string, s:number, type:string[]){
    const catData = collection(this.firestore, `${this.gWay}`)
    const qu = query(catData,
      where("to","==",uid),
      where("status","==",0),
      //where("type","array-contains","addORDER"),
      where("type","array-contains","REDEEM"),
      //where("type","array-contains-any",type),
      orderBy("com", "desc"),
      //limit(s)
      );
    return collectionData( qu );
  }

  getAllOrdersO(uid:string, s:number, type:string[]){
    const catData = collection(this.firestore, `${this.gWay}`)
    const qu = query(catData,
      where("to","==",uid),
      //where("status",">",0),
      where("type","array-contains","addORDER"),
      //where("type","array-contains","clientAc"),
      //where("type","array-contains-any",type),
      orderBy("com", "desc"),
      limit(s)
      );
    return collectionData( qu );
  }

  setCampPOS(id:string, camp:any, amTotal:number, earn:number, refrBy:any){
    const newTimestamp = this.getServerTimestamp();
    const gWayRef = doc(this.firestore,`${this.gWay}`, `${id}`)
    return updateDoc(gWayRef, { type: arrayUnion("addORDER"), //refrBy:refrBy,
      camp:camp, amTotal:amTotal, earn:earn, status:10, com:newTimestamp
    })
  }

  rejectReedem(id:string){
    const gWayRef = doc(this.firestore,`${this.gWay}`, `${id}`)
    const newTimestamp = this.getServerTimestamp();
    return updateDoc(gWayRef, { status:-10, upd:newTimestamp })
  }

  setCampF2F(id:string, camp:any, amTotal:number, earnTotal:number, iEarn:number, refr:any){
    const newTimestamp = this.getServerTimestamp();
    const gWayRef = doc(this.firestore,`${this.gWay}`, `${id}`)
    return updateDoc(gWayRef, { type: arrayUnion("addORDER", refr.uid), refr:refr, //refrBy:refrBy,
    //camp:camp,
      amTotal:amTotal, earnTotal:earnTotal, earn:iEarn,  status:10, com:newTimestamp
    })
  }

  transferPOS(sid:string, uidV:string, uidC:string, earn:number, amTotal:number, vFan:number){
    const newTimestamp = this.getServerTimestamp();
    const vendorRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uidV}`);
    const clientRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uidC}`);
    const storeRef = doc(this.firestore, `${this.resource.env.db.shops}`, `${sid}`);
    return updateDoc(vendorRef, {acBalH: increment(-earn) }).then(() => {
      return updateDoc(clientRef, {acBalC: increment(earn) }).then(() => {
        return updateDoc(storeRef, {
          vEarn: increment(amTotal),
          vGave: increment(earn),
          vFan: increment(vFan),
          vOrdr: increment(1),
        }).then(() => {
          return {success:true }
        });
      });
    });

  }

  transferOfflineF2F(sid:string, uidV:string, uidC:string, uidR:string, earnTotal:number, iEarn:number, refEarn:number, amTotal:number, vFan:number){
    const newTimestamp = this.getServerTimestamp();
    const vendorRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uidV}`);
    const clientRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uidC}`);
    const clientRefVia = doc(this.firestore, `${this.resource.env.db.users}`, `${uidR}`);
    const storeRef = doc(this.firestore, `${this.resource.env.db.shops}`, `${sid}`);
    return updateDoc(vendorRef, {acBalH: increment(-earnTotal) }).then(() => {
      return updateDoc(clientRef, {acBalC: increment(iEarn) }).then(() => {// purchased by
        return updateDoc(clientRefVia, {acBalC: increment(refEarn) }).then(() => { // refered by
          return updateDoc(storeRef, {
            vEarn: increment(amTotal),
            vGave: increment(earnTotal),
            vFan: increment(vFan),
            vOrdr: increment(1),
          }).then(() => {
            return {success:true }
          });
        });
      });
    });

  }


  setCodesCampaignPOS(code:string, campID:string, earn:number, uid:string, sale:number){
    const newTimestamp = this.getServerTimestamp();
    const codeRef = doc(this.firestore, `${this.resource.env.db.codes}`, `${code}`);
    return updateDoc(codeRef,
      {
        active: true,
        camp: arrayUnion(campID),
        //current: campID,
        used: arrayUnion(uid),
        claim:increment(earn),
        total:increment(1),
        sale:increment(sale),
        redeem:arrayUnion({uid:uid, type:"POS", earn:earn}),
        past:arrayUnion(uid)
      })
  }

  setCodesCampaignF2F(code:string, campID:string, earn:number, cut:number, got:number, uid:string, sale:number){
    const newTimestamp = this.getServerTimestamp();
    const codeRef = doc(this.firestore, `${this.resource.env.db.codes}`, `${code}`);
    return updateDoc(codeRef,
      {
        camp: arrayUnion(campID),
        //current: campID, active: true,
        used: arrayUnion(uid),
        claim:increment(earn),
        total:increment(1),
        sale:increment(sale),
        redeem:arrayUnion({uid:uid, type:"F2F", earn:earn, cut:cut, got:got}),
        past:arrayUnion(uid)
      })
  }

  changeStatusOnlineStore(id:string, status:number, loStatus:any){
    const newTimestamp = this.getServerTimestamp();
    const gWayRef = doc(this.firestore,`${this.gWay}`, `${id}`)
    return updateDoc(gWayRef, {
      status:status, logistics:loStatus,
      com:newTimestamp
      //done:newTimestamp
    })
  }

  changeStatusOnlineStoreBURN(id:string, status:number, loStatus:any){
    const newTimestamp = this.getServerTimestamp();
    const gWayRef = doc(this.firestore,`${this.gWay}`, `${id}`)
    return updateDoc(gWayRef, {
      status:status, logistics:loStatus,
      com:newTimestamp
      //done:newTimestamp
    })
  }

  changeRefundOnlineF2F(ordrinfo:any, status:number, loStatus:any, razorRef:any ){
    const newTimestamp = this.getServerTimestamp();
    this.dependancy.sendSMS("IN",ordrinfo.logistics.phone,"Dear Customer, your REFR order from "+ ordrinfo.storeName +" has been refunded.");
    const gWayRef = doc(this.firestore,`${this.gWay}`, `${ordrinfo.id}`)
    return updateDoc(gWayRef, {
      gwRefund: arrayUnion(razorRef),
      status:status, logistics:loStatus, com:newTimestamp
    })
  }

  changeRefundOnlineDIRECT(ordrinfo:any, status:number, loStatus:any, razorRef:any ){
    console.log(ordrinfo);
    this.dependancy.sendSMS("IN",ordrinfo.logistics.phone,"Dear Customer, your REFR order from "+ ordrinfo.storeName +" has been refunded.");
    const newTimestamp = this.getServerTimestamp();
    const gWayRef = doc(this.firestore,`${this.gWay}`, `${ordrinfo.id}`)
    return updateDoc(gWayRef, {
      gwRefund: arrayUnion(razorRef),
      status:status, logistics:loStatus, com:newTimestamp
    })
  }

  changeRefundOnlineBURN(ordrinfo:any, status:number, loStatus:any, razorRef:any ){
    this.dependancy.sendSMS("IN",ordrinfo.logistics.phone,"Dear Customer, your REFR order from "+ ordrinfo.storeName +" has been refunded.");
    const newTimestamp = this.getServerTimestamp();
    const gWayRef = doc(this.firestore,`${this.gWay}`, `${ordrinfo.id}`)
    return updateDoc(gWayRef, {
      gwRefund: arrayUnion(razorRef),
      status:status, logistics:loStatus, com:newTimestamp
    })
  }

  transferDeliveredF2F(sid:string, ordrId:string, newLO:number, uidC:string, uidR:string, amtC:number, amtR:number){
    //const vendorRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uidV}`);
    const clientRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uidC}`);
    const clientRefVia = doc(this.firestore, `${this.resource.env.db.users}`, `${uidR}`);
    //const storeRef = doc(this.firestore, `${this.resource.env.db.shops}`, `${sid}`);

    const newTimestamp = this.getServerTimestamp();
    const informRefC = collection(this.firestore, `${this.resource.env.db.inform}`,);

    const dataSend = {
      id:"",
      by:uidC,
      sid:sid,
      sin: newTimestamp,
      status: true,
      walt:ordrId,
      about: "Waiting for 14 days", //"done 14 days",
      what:"O-LINK", type:"F2F"
    }

    // CREATE
    return addDoc(informRefC, dataSend).then(informRef => {// purchased by
      const informDoc = doc(this.firestore,`${this.resource.env.db.inform}`, `${informRef.id}`)
      return updateDoc(informDoc, {id:informRef.id}).then(() => {
    //return updateDoc(clientRef, { acBalC: increment(amtC), acBalCr: increment(-amtC) }).then(() => {// purchased by
      //return updateDoc(clientRefVia, { acBalC: increment(amtR), acBalCr: increment(-amtR) }).then(() => { // refered by
        return this.changeStatusOnlineStore(ordrId, 10, newLO)
      //})
    //})
      })
    })
  }

  transferDeliveredDIRECT(sid:string, ordrId:string, newLO:number, uidC:string, //uidR:string,
    amtC:number //, amtR:number
    ){
    //const vendorRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uidV}`);
    const clientRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uidC}`);
    //const clientRefVia = doc(this.firestore, `${this.resource.env.db.users}`, `${uidR}`);
    //const storeRef = doc(this.firestore, `${this.resource.env.db.shops}`, `${sid}`);

    const newTimestamp = this.getServerTimestamp();
    const informRefC = collection(this.firestore, `${this.resource.env.db.inform}`,);

    const dataSend = {
      id:"",
      by:uidC,
      sid:sid,
      sin: newTimestamp,
      status: true,
      walt:ordrId,
      about: "Waiting for 14 days", //"done 14 days",
      what:"O-LINK", type:"DIRECT"
    }
    console.log("dataSend", dataSend)

    // CREATE
    return addDoc(informRefC, dataSend).then(informRef => {// purchased by
      const informDoc = doc(this.firestore,`${this.resource.env.db.inform}`, `${informRef.id}`)
      return updateDoc(informDoc, {id:informRef.id}).then(() => {
    //return updateDoc(clientRef, { acBalC: increment(amtC), acBalCr: increment(-amtC) }).then(() => {// purchased by
        return this.changeStatusOnlineStore(ordrId, 10, newLO)
    //})
      })
    })
  }

  transferDeliveredBURN(sid:string, ordrId:string, newLO:number,
    //uidC:string, //uidR:string,
    //amtC:number //, amtR:number
  uidC:string, amtC:number,
  uidV:string, amtRemoveReserveV:number, amtBurstV:number // ordr amount to be transfered

    ){
    const vendorRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uidV}`);
    const clientRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uidC}`);
    //const clientRefVia = doc(this.firestore, `${this.resource.env.db.users}`, `${uidR}`);
    const storeRef = doc(this.firestore, `${this.resource.env.db.shops}`, `${sid}`);

    const newTimestamp = this.getServerTimestamp();
    const informRefC = collection(this.firestore, `${this.resource.env.db.inform}`,);
/*
    // const dataSend = {
    //   id:"",
    //   by:uidC,
    //   sid:sid,
    //   sin: newTimestamp,
    //   status: true,
    //   walt:ordrId,
    //   about: "Waiting for 14 days", //"done 14 days",
    //   what:"O-LINK", type:"DIRECT"
    // }
    // console.log("dataSend", dataSend)
*/
    // CREATE
    //return addDoc(informRefC, dataSend).then(informRef => {// purchased by
      //const informDoc = doc(this.firestore,`${this.resource.env.db.inform}`, `${informRef.id}`)
      //return updateDoc(informDoc, {id:informRef.id}).then(() => {
    //return updateDoc(clientRef, { acBalC: increment(amtC), acBalCr: increment(-amtC) }).then(() => {// purchased by
    return updateDoc(storeRef, { vAte: increment(amtRemoveReserveV) } ).then(() => {// update ate
      return updateDoc(vendorRef, { acBalV: increment(amtBurstV), acBalVr: increment(-amtRemoveReserveV) }).then(() => {// purchased by
        return this.changeStatusOnlineStoreBURN(ordrId, 10, newLO)
      })
    })
    //})
      //})
    //})
  }

  transferRefundF2F(
    sid:string, uidV:string, uidC:string, uidR:string,
    costUSER:number, transferRefrCash:number, cashback:number, referalCashback:number
    //earnTotal:number, iEarn:number, refEarn:number, amTotal:number, vFan:number
    //ordrId:string, newLO:number, uidC:string, uidR:string, amtC:number, amtR:number
    ){

    const vendorRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uidV}`);
    const clientRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uidC}`);
    const clientRefVia = doc(this.firestore, `${this.resource.env.db.users}`, `${uidR}`);
    //const storeRef = doc(this.firestore, `${this.resource.env.db.shops}`, `${sid}`);

    return updateDoc(vendorRef, { acBalVr: increment(-costUSER), acBalH: increment(cashback + referalCashback) }).then(() => {// deduct cost in reserve & return cashback given to both
      return updateDoc(clientRef, { acBalC:increment(transferRefrCash), acBalCr:increment(-cashback) }).then(() => { // return refrcash to user
        return updateDoc(clientRefVia, { acBalCr:increment(-referalCashback) }).then(() => { // return refrcash to user
          return {success:true}
        })
      })
        //this.pay.updateClientF2F_ONLINE( uid, -transferRefrCash )

    })

      // //if( journey == "F2F_ONLINE" ){
      //   this.pay.updateVendorReserveF2F_ONLINE( mid, costUSER ) // added to vender reserve
      //   //if(ordrTYPE == "COD" || ordrTYPE == "RefrCASH" || ordrTYPE == "RefrCASH+COD" ){ console.log("Add amount to pending in vendor as to be collected.") }
      //   //if(ordrTYPE == "ONLINE" || ordrTYPE == "RefrCASH+ONLINE"){ console.log("Add amount to pending in vendor as paid.") }

      //   if(ordrTYPE == "RefrCASH" || ordrTYPE == "RefrCASH+COD" || ordrTYPE == "RefrCASH+ONLINE" ){
      //     this.pay.updateClientF2F_ONLINE( uid, -transferRefrCash ) // deduct from refrcash
      //     //console.log("Deduct amount from user refrcash.")
      //   }
      //   if(cashback > 0){// when cashback has to be given
      //     this.pay.updateVendorHypeF2F_ONLINE( mid, -(cashback + referalCashback) )
      //     this.pay.updateClientReserveF2F_ONLINE( uid, cashback )
      //     if(referalCODE){
      //     this.pay.updateClientReserveF2F_ONLINE( referalUID, referalCashback )
      //     }
      //   //}
      // }
/*

    return updateDoc(vendorRef, {acBalH: increment(-earnTotal) }).then(() => {
      return updateDoc(clientRef, {acBalC: increment(iEarn) }).then(() => {// purchased by
        return updateDoc(clientRefVia, {acBalC: increment(refEarn) }).then(() => { // refered by
          return updateDoc(storeRef, {
            vEarn: increment(amTotal),
            vGave: increment(earnTotal),
            vFan: increment(vFan),
            vOrdr: increment(1),
          }).then(() => {
            return {success:true }
          });
        });
      });
    });
*/
    /*
    return updateDoc(clientRef, { acBalCr: increment(-amtC) }).then(() => {// purchased by
      return updateDoc(clientRefVia, { acBalCr: increment(-amtR) }).then(() => { // refered by
        return this.changeStatusOnlineStore(ordrId, -10, newLO)
      })
    })
    */
  }

  transferRefundDIRECT(
    sid:string, uidV:string, uidC:string, //uidR:string,
    costUSER:number, transferRefrCash:number //, cashback:number, referalCashback:number
    //earnTotal:number, iEarn:number, refEarn:number, amTotal:number, vFan:number
    //ordrId:string, newLO:number, uidC:string, uidR:string, amtC:number, amtR:number
    ){

    const vendorRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uidV}`);
    const clientRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uidC}`);
    //const clientRefVia = doc(this.firestore, `${this.resource.env.db.users}`, `${uidR}`);
    //const storeRef = doc(this.firestore, `${this.resource.env.db.shops}`, `${sid}`);

    return updateDoc(vendorRef, { acBalVr: increment(-costUSER)/*, acBalH: increment(cashback + referalCashback)*/ }).then(() => {// deduct cost in reserve & return cashback given to both
    return updateDoc(clientRef, { acBalC:increment(transferRefrCash)/*, acBalCr:increment(-cashback)*/ }).then(() => { // return refrcash to user
        //return updateDoc(clientRefVia, { acBalCr:increment(-referalCashback) }).then(() => { // return refrcash to user
          return {success:true}
        //})
      })
        //this.pay.updateClientF2F_ONLINE( uid, -transferRefrCash )

    })

      // //if( journey == "F2F_ONLINE" ){
      //   this.pay.updateVendorReserveF2F_ONLINE( mid, costUSER ) // added to vender reserve
      //   //if(ordrTYPE == "COD" || ordrTYPE == "RefrCASH" || ordrTYPE == "RefrCASH+COD" ){ console.log("Add amount to pending in vendor as to be collected.") }
      //   //if(ordrTYPE == "ONLINE" || ordrTYPE == "RefrCASH+ONLINE"){ console.log("Add amount to pending in vendor as paid.") }

      //   if(ordrTYPE == "RefrCASH" || ordrTYPE == "RefrCASH+COD" || ordrTYPE == "RefrCASH+ONLINE" ){
      //     this.pay.updateClientF2F_ONLINE( uid, -transferRefrCash ) // deduct from refrcash
      //     //console.log("Deduct amount from user refrcash.")
      //   }
      //   if(cashback > 0){// when cashback has to be given
      //     this.pay.updateVendorHypeF2F_ONLINE( mid, -(cashback + referalCashback) )
      //     this.pay.updateClientReserveF2F_ONLINE( uid, cashback )
      //     if(referalCODE){
      //     this.pay.updateClientReserveF2F_ONLINE( referalUID, referalCashback )
      //     }
      //   //}
      // }
/*

    return updateDoc(vendorRef, {acBalH: increment(-earnTotal) }).then(() => {
      return updateDoc(clientRef, {acBalC: increment(iEarn) }).then(() => {// purchased by
        return updateDoc(clientRefVia, {acBalC: increment(refEarn) }).then(() => { // refered by
          return updateDoc(storeRef, {
            vEarn: increment(amTotal),
            vGave: increment(earnTotal),
            vFan: increment(vFan),
            vOrdr: increment(1),
          }).then(() => {
            return {success:true }
          });
        });
      });
    });
*/
    /*
    return updateDoc(clientRef, { acBalCr: increment(-amtC) }).then(() => {// purchased by
      return updateDoc(clientRefVia, { acBalCr: increment(-amtR) }).then(() => { // refered by
        return this.changeStatusOnlineStore(ordrId, -10, newLO)
      })
    })
    */
  }

  transferRefundBURN(
    sid:string, uidV:string, uidC:string, //uidR:string,
    costUSER:number, transferRefrCash:number //, cashback:number, referalCashback:number
    //earnTotal:number, iEarn:number, refEarn:number, amTotal:number, vFan:number
    //ordrId:string, newLO:number, uidC:string, uidR:string, amtC:number, amtR:number
    ){

    const vendorRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uidV}`);
    const clientRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uidC}`);
    //const clientRefVia = doc(this.firestore, `${this.resource.env.db.users}`, `${uidR}`);
    //const storeRef = doc(this.firestore, `${this.resource.env.db.shops}`, `${sid}`);

    return updateDoc(vendorRef, { acBalVr: increment(-costUSER)/*, acBalH: increment(cashback + referalCashback)*/ }).then(() => {// deduct cost in reserve & return cashback given to both
    return updateDoc(clientRef, { acBalC:increment(transferRefrCash)/*, acBalCr:increment(-cashback)*/ }).then(() => { // return refrcash to user
        //return updateDoc(clientRefVia, { acBalCr:increment(-referalCashback) }).then(() => { // return refrcash to user
          return {success:true}
        //})
      })
        //this.pay.updateClientF2F_ONLINE( uid, -transferRefrCash )

    })

      // //if( journey == "F2F_ONLINE" ){
      //   this.pay.updateVendorReserveF2F_ONLINE( mid, costUSER ) // added to vender reserve
      //   //if(ordrTYPE == "COD" || ordrTYPE == "RefrCASH" || ordrTYPE == "RefrCASH+COD" ){ console.log("Add amount to pending in vendor as to be collected.") }
      //   //if(ordrTYPE == "ONLINE" || ordrTYPE == "RefrCASH+ONLINE"){ console.log("Add amount to pending in vendor as paid.") }

      //   if(ordrTYPE == "RefrCASH" || ordrTYPE == "RefrCASH+COD" || ordrTYPE == "RefrCASH+ONLINE" ){
      //     this.pay.updateClientF2F_ONLINE( uid, -transferRefrCash ) // deduct from refrcash
      //     //console.log("Deduct amount from user refrcash.")
      //   }
      //   if(cashback > 0){// when cashback has to be given
      //     this.pay.updateVendorHypeF2F_ONLINE( mid, -(cashback + referalCashback) )
      //     this.pay.updateClientReserveF2F_ONLINE( uid, cashback )
      //     if(referalCODE){
      //     this.pay.updateClientReserveF2F_ONLINE( referalUID, referalCashback )
      //     }
      //   //}
      // }
/*

    return updateDoc(vendorRef, {acBalH: increment(-earnTotal) }).then(() => {
      return updateDoc(clientRef, {acBalC: increment(iEarn) }).then(() => {// purchased by
        return updateDoc(clientRefVia, {acBalC: increment(refEarn) }).then(() => { // refered by
          return updateDoc(storeRef, {
            vEarn: increment(amTotal),
            vGave: increment(earnTotal),
            vFan: increment(vFan),
            vOrdr: increment(1),
          }).then(() => {
            return {success:true }
          });
        });
      });
    });
*/
    /*
    return updateDoc(clientRef, { acBalCr: increment(-amtC) }).then(() => {// purchased by
      return updateDoc(clientRefVia, { acBalCr: increment(-amtR) }).then(() => { // refered by
        return this.changeStatusOnlineStore(ordrId, -10, newLO)
      })
    })
    */
  }

  startShiping(id:string, shipData:any){
    const newTimestamp = this.getServerTimestamp();
    const gWayRef = doc(this.firestore,`${this.gWay}`, `${id}`)
    return updateDoc(gWayRef, {
      shipCreate: shipData,
      shipUpdate:null,
      ship:newTimestamp
    })
  }

  updateShiping(id:string, shipData:any){
    const newTimestamp = this.getServerTimestamp();
    const gWayRef = doc(this.firestore,`${this.gWay}`, `${id}`)
    return updateDoc(gWayRef, {
      shipUpdate:shipData,
      ship:newTimestamp
    })
  }

  async updateBankIMPS(uid:string, details:any){
    const newTimestamp = this.getServerTimestamp();
    const userRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uid}`);
    return updateDoc(userRef, { uid:uid, BankIMPS: details, upd: newTimestamp });
  }

  async updateBankUPI(uid:string, details:any){
    const newTimestamp = this.getServerTimestamp();
    const userRef = doc(this.firestore, `${this.resource.env.db.users}`, `${uid}`);
    return updateDoc(userRef, { uid:uid, BankUPI: details, upd: newTimestamp });
  }

  async createPayout(
    type:string, bankIMPS:any, bankUPI:any, user:string, store:string, balance:number, locked:number, redeem:number,
    username:string, storename:string
    ){
    const newTimestamp = this.getServerTimestamp();
        // create transaction here
    const payData = {
      to: user,
      iBalance: +balance, iLocked: +locked, iRedeem: +redeem,
      amTotal: +redeem,
      username, storename,
    }
    this.startGatewayPayout(payData).then(ref => {
      const dataSend = {
        id:"",
        username, storename,
        user, store, pay:ref.id, bankIMPS, bankUPI,
        iBalance: +balance, iLocked: +locked, iRedeem: +redeem,
        paid:false, type: type,
        status:0,
        sin: newTimestamp, upd: newTimestamp
      }
      const payRefC = collection(this.firestore, `${this.resource.env.db.payouts}`);
      return addDoc(payRefC, dataSend).then(ref  => {
        const payRef = doc(this.firestore, `${this.resource.env.db.payouts}`, `${ref.id}`);
        return updateDoc(payRef, {id:ref.id}).then(() => {
          const userRef = doc(this.firestore, `${this.resource.env.db.users}`, `${user}`);
          return updateDoc(userRef, {payout:true})
        })
      });
    })
        // create transaction here

  }

}
