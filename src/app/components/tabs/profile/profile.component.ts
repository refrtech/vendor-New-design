import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Observable, of, take } from 'rxjs';
import { CropperComponent } from 'src/app/placeholders/cropper/cropper.component';
import { AuthService } from 'src/app/services/auth.service';
import { DependencyService } from 'src/app/services/dependency.service';
import { PaymentService } from 'src/app/services/payment.service';
import { ThemeService } from 'src/app/services/theme.service';
import { Hype, Shop } from 'src/app/universal.model';
import { AddBankComponent } from './add-bank/add-bank.component';

export class PhoneNumber {
  country: string = "91";
  iso: string = "IND";
  coin: string = "INR";
  digits: number = 10;
  area: string = "";
  prefix: string = "";
  line: string = "";
  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line
    return `+${num}`
  }
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  userID = "";
  storeID = "";
  storeName = "";
  storeLogo = "";
  storeBanner = "";
  storeBannersActive = "";
  storeBannersList: string[] = [];
  store$: Observable<any> = of();
  dataCurrent: any;
  typeORDER: any = null;
  listLoc: any[] = [];
  makingChanges = true;
  freeParcel = false;
  freeStart = 0;
  cityCharge = 0;
  nationCharge = 0;
  storeLoc = {
    storeType: "",
    opensDaily: true, opensDailyS: "07:00", opensDailyE: "23:00",
    openMon: true, openMonS: "07:00", openMonE: "23:00",
    openTue: true, openTueS: "07:00", openTueE: "23:00",
    openWed: true, openWedS: "07:00", openWedE: "23:00",
    openThu: true, openThuS: "07:00", openThuE: "23:00",
    openFri: true, openFriS: "07:00", openFriE: "23:00",
    openSat: true, openSatS: "07:00", openSatE: "23:00",
    openSun: false, openSunS: "07:00", openSunE: "23:00",
    openBreak: false, openBreakS: "11:00", openBreakE: "15:00",
    delivery: "Citywide", logistics: false,
    exchange: true,
    return: true,
    refund: true,
    phoneHide: true,
    COD: true,
    storeCat: "",
    storeSubCat: ""
  }
  userExist = true; userCheck = false;
  phoneNumber = new PhoneNumber();
  phoneNumFull: string = "";
  verificationCode: string = "";
  step = 0;
  disableLoc = true;
  imageLOADED: string[] = [];
  viewPrimeUser = false;
  storeEmail = "";
  storePhone = "";

  constructor(
    public themeService: ThemeService,
    public auth: AuthService,
    private pay: PaymentService,
    public dependancy: DependencyService,
    public router: Router,
  ) {
    this.dependancy.activeroute = this.router.url;
  }


  currentEmail = "";

  ngOnInit(): void {
    this.auth.user$.pipe(take(1)).subscribe(user => {
      const data = {
        //false, user.username,
        name: user.name || "",

        soFB: user.soFB || "",
        soIG: user.soIG || "",
        soYT: user.soYT || "",
        soTW: user.soTW || "",
        soWA: user.soWA || "",
        //user.info, user.url, user.typ, user.sex, user.stat, user.check,
        uid: user.uid, iso: user.iso || "",
        phoneNumFull: user.phone.split("+91")[1] || "",
        email: user.email || "",
        GST:user.GST || "",
      }
      this.currentEmail = user.email || "";
      this.userID = user.uid;
      this.changeAbout(data)


    })
  }

  onloadIMG(url: string) {
    this.imageLOADED.push(url);
  }

  updateCharges(
    freeParcel: boolean,
    freeStart: number, cityCharge: number, nationCharge: number,
    freeParcelC: boolean,
    freeStartC: number, cityChargeC: number, nationChargeC: number
  ) {
    this.makingChanges = true;

    // freeParcel = false;
    // freeStart;
    // cityCharge;
    // nationCharge;
    if (!freeParcel) {
      this.typeORDER["freeParcel"] = false;
      this.typeORDER["freeStart"] = 0;
      this.typeORDER["cityCharge"] = 0;
      this.typeORDER["nationCharge"] = 0;
      this.auth.updateStoreOrdr(this.storeID, this.typeORDER).then(() => {
        this.makingChanges = false;
        this.auth.resource.startSnackBar("Delivery charges updated!");
      }).catch(err => {
        this.makingChanges = false;
        this.typeORDER["freeParcel"] = freeParcelC;
        this.typeORDER["freeStart"] = freeStartC;
        this.typeORDER["cityCharge"] = cityChargeC;
        this.typeORDER["nationCharge"] = nationChargeC;
        this.auth.resource.startSnackBar("Issue: " + err)
      })
    } else {
      this.typeORDER["freeParcel"] = true;
      this.typeORDER["freeStart"] = freeStart || 0;
      this.typeORDER["cityCharge"] = cityCharge || 0;
      this.typeORDER["nationCharge"] = nationCharge || 0;
      if (freeStartC >= 0 || cityChargeC >= 0 || nationChargeC >= 0) {
        this.auth.updateStoreOrdr(this.storeID, this.typeORDER).then(() => {
          this.makingChanges = false;
        }).catch(err => {
          this.makingChanges = false;
          this.typeORDER["freeParcel"] = freeParcelC ? freeParcelC : false;
          this.typeORDER["freeStart"] = freeStartC ? freeStartC : 0;
          this.typeORDER["cityCharge"] = cityChargeC ? cityChargeC : 0;
          this.typeORDER["nationCharge"] = nationChargeC ? nationChargeC : 0;
          this.auth.resource.startSnackBar("Issue: " + err)
        })
      } else {
        this.typeORDER["freeParcel"] = freeParcelC;
        this.typeORDER["freeStart"] = freeStartC;
        this.typeORDER["cityCharge"] = cityChargeC;
        this.typeORDER["nationCharge"] = nationChargeC;
      }
    }
  }

  updateTiming() {
    this.makingChanges = true;
    const data = {
      opensDaily: this.storeLoc.opensDaily, opensDailyS: this.storeLoc.opensDailyS, opensDailyE: this.storeLoc.opensDailyE,
      openMon: this.storeLoc.openMon, openMonS: this.storeLoc.openMonS, openMonE: this.storeLoc.openMonE,
      openTue: this.storeLoc.openTue, openTueS: this.storeLoc.openTueS, openTueE: this.storeLoc.openTueE,
      openWed: this.storeLoc.openWed, openWedS: this.storeLoc.openWedS, openWedE: this.storeLoc.openWedE,
      openThu: this.storeLoc.openThu, openThuS: this.storeLoc.openThuS, openThuE: this.storeLoc.openThuE,
      openFri: this.storeLoc.openFri, openFriS: this.storeLoc.openFriS, openFriE: this.storeLoc.openFriE,
      openSat: this.storeLoc.openSat, openSatS: this.storeLoc.openSatS, openSatE: this.storeLoc.openSatE,
      openSun: this.storeLoc.openSun, openSunS: this.storeLoc.openSunS, openSunE: this.storeLoc.openSunE,
      openBreak: (this.storeLoc.openBreak ? true : false),
      openBreakS: (this.storeLoc.openBreakS ? this.storeLoc.openBreakS : "11:00"),
      openBreakE: (this.storeLoc.openBreakE ? this.storeLoc.openBreakE : "15:00"),
    }

    this.auth.changeTimeData(this.storeID, data).then(() => {
      this.makingChanges = false;
    }).catch(err => {
      this.makingChanges = false;
      this.auth.resource.startSnackBar("Issue: " + err)
    })

  }

  setUpTime(type: string, t: any) {
    if (type == 'from') {
      this.storeLoc.openMonS = t;
      this.storeLoc.openTueS = t;
      this.storeLoc.openWedS = t;
      this.storeLoc.openThuS = t;
      this.storeLoc.openFriS = t;
      this.storeLoc.openSatS = t;
      this.storeLoc.openSunS = t;
    }
    if (type == 'until') {
      this.storeLoc.openMonE = t;
      this.storeLoc.openTueE = t;
      this.storeLoc.openWedE = t;
      this.storeLoc.openThuE = t;
      this.storeLoc.openFriE = t;
      this.storeLoc.openSatE = t;
      this.storeLoc.openSunE = t;
    }
  }

  updateOrdr(type: string, current: any, val: any) {
    this.makingChanges = true;
    this.typeORDER[type] = val;

    this.auth.updateStoreOrdr(this.storeID, this.typeORDER).then(() => {

      if (type == 'delivery') {
        this.storeLoc.delivery = val;
      }
      if (type == 'logistics') {
        this.storeLoc.logistics = val;
      }
      if (type == 'exchange') {
        this.storeLoc.exchange = val;
      }
      if (type == 'refund') {
        this.storeLoc.refund = val;
      }
      if (type == 'phoneHide') {
        this.storeLoc.phoneHide = val;
      }
      if (type == 'return') {
        this.storeLoc.return = val;
      }

      if (type == 'COD') {
        this.storeLoc.COD = val;
      }

      this.makingChanges = false;
    }).catch(err => {
      this.makingChanges = false;
      this.typeORDER[type] = current;
      this.auth.resource.startSnackBar("Issue: " + err)
    })



    // const xLoc = store.schedule;
    // xLoc["delivery"] = store.typeORDER.delivery; xLoc["logistics"] = store.typeORDER.logistics;
    // xLoc["exchange"] = store.typeORDER.exchange; xLoc["refund"] = store.typeORDER.refund; xLoc["return"] = store.typeORDER.return;
    // xLoc["COD"] = store.typeORDER.COD;
  }


  setContactNumber() {
    // if(!know){
    //   this.phoneNumber.area = "";
    //   this.phoneNumber.prefix = "";
    //   this.phoneNumber.line = "";
    // }else{
    this.phoneNumber.area = this.phoneNumFull.slice(0, 3);
    this.phoneNumber.prefix = this.phoneNumFull.slice(3, 6);
    this.phoneNumber.line = this.phoneNumFull.slice(6, this.phoneNumber.digits);
    //}
  }

  // getX(x:any){
  //   return x
  // }

  changeAbout(data: any): void {
    this.dataCurrent = data;
    this.auth.resource.first.setValue(data.name);
    //this.auth.resource.first.setValue( data.name.split(' ')[0] );
    //this.auth.resource.last.setValue( data.name.split(' ')[1] || "");
    if (data.phoneNumFull) {
      this.phoneNumFull = data.phoneNumFull;
      this.setContactNumber();
    }
    this.auth.getMyStore(data.uid).pipe(take(1)).subscribe((store: any[]) => {
      if (!store || !store[0] || !store[0].id) {
        // Retry

      } else {
        this.auth.resource.last.setValue(store[0].name);

        this.storeID = store[0].id;
        this.storeName = store[0].name;
        this.storeLogo = store[0].logo;
        this.storeBanner = store[0].banner;
        this.storeEmail = store[0].email;
        this.storePhone = store[0].phone;

        if (store[0].banner.length > 0) {
          this.storeBannersList = store[0].banners;
          this.storeBannersActive = store[0].banners[0];
        }

        this.listLoc = store[0].loc;
        let xLoc: any = {
          ...store[0].schedule,
          openBreak: !store[0].schedule.openBreak ? false : store[0].schedule.openBreak,
          openBreakS: !store[0].schedule.openBreak ? "11:00" : store[0].schedule.openBreakS,
          openBreakE: !store[0].schedule.openBreak ? "15:00" : store[0].schedule.openBreakE,
        };

        //xLoc["logistics"] = {
        //...store[0].typeORDER.logistics,
        // openBreak: !store[0].schedule.openBreak ? false : store[0].schedule.openBreak,
        // openBreakS: !store[0].schedule.openBreak ? "11:00" : store[0].schedule.openBreakS,
        // openBreakE : !store[0].schedule.openBreak ?  "15:00" : store[0].schedule.openBreakE,
        //};
        // if(!xLoc["logistics"].openBreak){
        // xLoc["logistics"].openBreak = false;
        // xLoc["logistics"].openBreakS = "11:00";
        // xLoc["logistics"].openBreakE = "15:00";
        // }

        xLoc["delivery"] = store[0].typeORDER.delivery;
        xLoc["exchange"] = store[0].typeORDER.exchange; xLoc["refund"] = store[0].typeORDER.refund; xLoc["return"] = store[0].typeORDER.return;

        xLoc["phoneHide"] = store[0].typeORDER.phoneHide || false;

        xLoc["COD"] = store[0].typeORDER.COD;
        xLoc["storeType"] = store[0].type;
        xLoc["storeCat"] = store[0].cat;
        xLoc["storeSubCat"] = store[0].subCat;

        this.storeLoc = xLoc;
        this.typeORDER = store[0].typeORDER;
        this.typeORDER["freeParcel"] = store[0].typeORDER.freeParcel ? store[0].typeORDER.freeParcel : false;
        this.typeORDER["freeStart"] = store[0].typeORDER.freeStart ? store[0].typeORDER.freeStart : 0;
        this.typeORDER["cityCharge"] = store[0].typeORDER.cityCharge ? store[0].typeORDER.cityCharge : 0;
        this.typeORDER["nationCharge"] = store[0].typeORDER.nationCharge ? store[0].typeORDER.nationCharge : 0;
        this.freeParcel = this.typeORDER["freeParcel"];
        this.freeStart = this.typeORDER["freeStart"];
        this.cityCharge = this.typeORDER["cityCharge"];
        this.nationCharge = this.typeORDER["nationCharge"];


        this.store$ = of(store[0])

        /*
        opensDaily: true, opensDailyS:"07:00", opensDailyE:"23:00",
        openMon: true, openMonS:"07:00", openMonE:"23:00",
        openTue: true, openTueS:"07:00", openTueE:"23:00",
        openWed: true, openWedS:"07:00", openWedE:"23:00",
        openThu: true, openThuS:"07:00", openThuE:"23:00",
        openFri: true, openFriS:"07:00", openFriE:"23:00",
        openSat: true, openSatS:"07:00", openSatE:"23:00",
        openSun: false, openSunS:"07:00", openSunE:"23:00",
        delivery: "Citywide", logistics:false, exchange: true, COD: true,
        */
      }
    })
    this.makingChanges = false;
  }

  async takePicture(type: string) {
    if (!this.makingChanges) {
      const image = await Camera.getPhoto({
        quality: 100,
        height: 300,
        width: 300,
        allowEditing: false,
        //source:CameraSource.Camera,
        resultType: CameraResultType.Uri
      });
      const imageUrl = image.webPath || "";
      if (imageUrl) {
        this.startCropper(imageUrl, type);
      } else {
      }
    }
  }

  startCropper(webPath: string, type: string) {
    if (!this.makingChanges) {
      let isPhone = this.auth.resource.getWidth < 768;
      let w = isPhone ? this.auth.resource.getWidth + "px" : "480px";
      let h = isPhone ? this.auth.resource.getHeight + "px" : "";
      const refDialog = this.auth.resource.dialog.open(CropperComponent, {
        width: w, minWidth: "320px", maxWidth: "480px",
        height: h,
        data: { webPath: webPath, type: type },
        disableClose: true, panelClass: "dialogLayout"//, autoFocus:false
      });
      refDialog.afterClosed().subscribe(result => {
        if (!result.success) {
          if (result.info) {
            this.auth.resource.startSnackBar(result.info)
          }
        } else {

          if (type == "logo") {
            this.auth.updateStoreLogo(this.storeID, result.croppedImage).then(ref => {
              if (!ref || !ref.success) {
                this.auth.resource.startSnackBar("Upload Failed!");
                this.makingChanges = false;
              } else {
                this.storeLogo = ref.url;
                this.auth.resource.startSnackBar("Logo Update Under Review!");
                this.makingChanges = false;
              }
            });
          }

          if (type == "banner") {
            this.auth.updateStoreBanner(this.storeID, result.croppedImage).then(ref => {
              if (!ref || !ref.success) {
                this.auth.resource.startSnackBar("Upload Failed!");
                this.makingChanges = false;
              } else {
                this.storeBanner = ref.url;
                this.auth.resource.startSnackBar("Banner Update Under Review!");
                this.makingChanges = false;
              }
            });
          }

          if (type == "banners") {
            this.auth.addStoreBanners(this.storeID, result.croppedImage).then(ref => {
              if (!ref || !ref.success) {
                this.auth.resource.startSnackBar("Upload Failed!");
                this.makingChanges = false;
              } else {
                this.storeBannersList.push(ref.url)
                if (this.storeBannersList.length == 1) {
                  this.storeBannersActive = this.storeBannersList[0];
                }
                this.auth.resource.startSnackBar("Store Pics Update Under Review!");
                this.makingChanges = false;
              }
            });
          }

        }
      })
    }
  }

  removeStoreBanner(resultImage: string) {
    this.makingChanges = true;
    this.auth.removeStoreBanners(this.storeID, resultImage).then(() => {
      this.storeBanner = resultImage;
      const ind = this.storeBannersList.indexOf(resultImage);
      this.storeBannersList.splice(ind, 1);
      if (this.storeBannersList.length > 0) {
        this.storeBannersActive = this.storeBannersList[0];
      } else {
        this.storeBannersActive = "";
      }
      this.auth.resource.startSnackBar("Banner updated.");
      this.makingChanges = false;
      //this.auth.resource.last.enable();
    });
  }

  updateEmail() {
    this.makingChanges = true;
    if (this.auth.resource.invalidEmail(this.currentEmail)) {
      this.auth.resource.startSnackBar("provide proper email address.")
      this.currentEmail = "";
      this.makingChanges = false;
    } else {
      this.auth.updateUserEmail(this.userID, this.currentEmail).then(() => {
        this.makingChanges = false;
        this.dataCurrent.email = this.currentEmail;
        this.auth.resource.startSnackBar("Email Update Under Review!");
      })
    }
  }

  updateStoreName() {
    this.makingChanges = true;
    this.auth.resource.last.disable();
    if (this.auth.resource.last.invalid
    ) {
      this.auth.resource.last.enable();
      this.makingChanges = false;
      this.auth.resource.startSnackBar("issue: format must be A-Za-z.")
    } else {
      const newName = this.auth.resource.last.value; //+ (this.auth.resource.last.value ? (" " + this.auth.resource.last.value) : "");
      this.auth.updateStoreBio(this.storeID,
        //uid,
        this.storeName, newName,
        //this.dataCurrent.soIG, this.dataCurrent.soYT,this.dataCurrent.soTW,this.dataCurrent.soWA,
        //this.dataCurrent.username, this.dataCurrent.info, this.dataCurrent.url, this.dataCurrent.typ, this.dataCurrent.sex, this.dataCurrent.stat
      ).then(() => {
        this.storeName = newName;
        this.auth.resource.startSnackBar("Name Update Under Review!");
        this.auth.resource.last.enable();
        this.makingChanges = false;
      });

    }
  }

  updateSocial(uid: string, type: string, info: string) {
    this.makingChanges = true;
    if (!info) {
      this.makingChanges = false;
      this.auth.resource.startSnackBar("issue: format must be A-Za-z0-9.")
    } else {

      this.auth.updateUserBio(
        uid, this.dataCurrent.name, this.dataCurrent.name,
        (type == "FB" ? info : this.dataCurrent.soFB),
        (type == "IG" ? info : this.dataCurrent.soIG),
        (type == "YT" ? info : this.dataCurrent.soYT),
        (type == "TW" ? info : this.dataCurrent.soTW),
        (type == "WA" ? info : this.dataCurrent.soWA),
        this.dataCurrent.GST,this.auth.resource.GST.value
        //this.dataCurrent.username, this.dataCurrent.info, this.dataCurrent.url, this.dataCurrent.typ, this.dataCurrent.sex, this.dataCurrent.stat
      ).then(() => {
        if (type == "FB") { this.dataCurrent.soFB = info }
        if (type == "IG") { this.dataCurrent.soIG = info }
        if (type == "YT") { this.dataCurrent.soYT = info }
        if (type == "TW") { this.dataCurrent.soTW = info }
        if (type == "WA") { this.dataCurrent.soWA = info }
        this.auth.resource.startSnackBar("Social Update Under Review!");
        this.makingChanges = false;
      });
    }
  }

  updateName(uid: string) {
    this.makingChanges = true;
    this.auth.resource.first.disable();
    if (this.auth.resource.first.invalid
    ) {
      this.auth.resource.first.enable();
      this.makingChanges = false;
      this.auth.resource.startSnackBar("issue: format must be A-Za-z.")
    } else {
      const newName = this.auth.resource.first.value; //+ (this.auth.resource.last.value ? (" " + this.auth.resource.last.value) : "");
      this.auth.updateUserBio(
        uid, this.dataCurrent.name, newName,
        this.dataCurrent.soFB,
        this.dataCurrent.soIG, this.dataCurrent.soYT, this.dataCurrent.soTW, this.dataCurrent.soWA,this.dataCurrent.GST,this.auth.resource.GST.value
        //this.dataCurrent.username, this.dataCurrent.info, this.dataCurrent.url, this.dataCurrent.typ, this.dataCurrent.sex, this.dataCurrent.stat
      ).then(() => {
        this.dataCurrent.name = newName;
        this.auth.resource.startSnackBar("Name Update Under Review!");
        this.auth.resource.first.enable();
        this.makingChanges = false;
      });
    }
  }

  updateSGT(uid: string) {
    this.makingChanges = true;
    this.auth.resource.GST.disable();
    if (this.auth.resource.GST.invalid
    ) {
      this.auth.resource.GST.enable();
      this.makingChanges = false;
      this.auth.resource.startSnackBar("issue: Please Enter valide GST Number.")
    }
    else {
      const newGST = this.auth.resource.GST.value;
      this.auth.updateUserBio(
        uid, this.dataCurrent.name, this.auth.resource.first.value,
        this.dataCurrent.soFB,
        this.dataCurrent.soIG, this.dataCurrent.soYT, this.dataCurrent.soTW, this.dataCurrent.soWA,this.dataCurrent.GST,this.auth.resource.GST.value
        //this.dataCurrent.username, this.dataCurrent.info, this.dataCurrent.url, this.dataCurrent.typ, this.dataCurrent.sex, this.dataCurrent.stat
      ).then(() => {
        this.dataCurrent.GST = newGST;
        this.auth.resource.startSnackBar("GST Update Under Review!");
        this.auth.resource.first.enable();
        this.makingChanges = false;
      });
    }
  }


  step0() {//FIGREOUT USER > NEW=SIGNUP|OLD=LOGIN
    let validatePhone = this.phoneNumber.country + this.phoneNumber.area + this.phoneNumber.prefix + this.phoneNumber.line;
    if (this.auth.resource.invalidPhone(validatePhone)) {
      this.auth.resource.startSnackBar("issue: format must be 0-9.")
    } else {
      const step0_CheckUserExist = this.auth.step0_userForward(this.phoneNumber.e164, true);
      step0_CheckUserExist.then((data: any) => {
        if (!data.success) {
          if (data.info == "401" || data.code == "auth/user-disabled") {
            this.auth.stepDisable = false;
            this.auth.resource.startSnackBar("The account associated has been disabled!")
          }
        } else {
          if (data.exist) {
            this.auth.stepDisable = false;
            this.auth.resource.startSnackBar("The phone number is already associated with another account");
            //this.phoneNumber.country = "";
            this.phoneNumber.area = "";
            this.phoneNumber.prefix = "";
            this.phoneNumber.line = "";
          } else {
            this.step = 1;
            this.auth.stepDisable = false;
            this.auth.setupReCapca()
            //this.startPhoneAdd()
          }
        }
      })
    }
  }

  // startPhoneAdd(){
  //   this.auth.step4_resetLogin( this.phoneNumber.e164 ).then(data => {
  //     //this.finalRESULT(data);
  //   })
  //   const stepAdd_USERS_PHONE = this.auth.stepAdd_USERS_PHONE( this.phoneNumber.e164, //validatePassword,
  //     this.phoneNumber.iso, this.phoneNumber.coin );
  // }

  step1() {//CREATE NEW USER
    // this.auth.resource.first.disable();
    // this.auth.resource.last.disable();
    this.auth.resource.pass.disable();

    let validatePassword = this.auth.resource.pass.value;
    if (this.auth.resource.invalidPassword(validatePassword)) {
      this.auth.resource.pass.setValue("");
      // this.auth.resource.first.enable();
      // this.auth.resource.last.enable();
      this.auth.resource.pass.enable();
      this.auth.resource.startSnackBar("issue: format must be 0-9A-Za-z@.")
    } else {
      this.auth.verifyPhoneWithOTP(this.phoneNumber.e164, true).then(data => {
        //this.finalRESULT(data);
        if (!data.success) {
          if (data.info !== "401") {
            this.auth.stepDisable = false;
            this.auth.resource.startSnackBar(data.info)
          } else {
            this.auth.stepDisable = false;
            this.auth.resource.startSnackBar("issue: Dirty Data!")
          }
        } else {
          this.step = 2;
          this.auth.stepDisable = false;
        }
      });
      // stepAdd_USERS_PHONE.then(data => {

      // })
    }
  }

  step2() {
    if (this.verificationCode?.length < 6) {
      this.auth.resource.startSnackBar("issue: verification code invalid.")
    } else {
      this.auth.step2_varifyCODE(this.verificationCode, this.phoneNumber.e164,// "", ""
      ).then(data => {
        //this.auth.resource.playSound('beep')
        //this.finalRESULT(data);
        if (!data.success) {
          if (data.info !== "401") {
            this.auth.stepDisable = false;
            this.auth.resource.startSnackBar(data.info)
          } else {
            this.auth.stepDisable = false;
            this.auth.resource.startSnackBar("issue: Dirty Data!")
          }
        } else {
          this.step = 0;
          this.auth.stepDisable = false;
        }
      })
    }
  }

  addGoogle(state: boolean, hasfacebook: boolean) {//FIGREOUT USER > NEW=SIGNUP|OLD=LOGIN
    if (state) {
      this.auth.resource.startSnackBar("The account is already associated with a google account.")
    } else {
      this.auth.googleSync(hasfacebook).then(data => {
        if (!data.success) {
          this.auth.resource.startSnackBar(data.info)
        } else {

        }
      })
      //this.auth.resource.startSnackBar("Comming Soon...")
    }
  }

  addFacebook(state: boolean, hasgogle: boolean) {//FIGREOUT USER > NEW=SIGNUP|OLD=LOGIN
    if (state) {
      this.auth.resource.startSnackBar("The account is already associated with a facebook account.")
    } else {
      this.auth.facebookSync(hasgogle).then(data => {
        if (!data.success) {
          this.auth.resource.startSnackBar(data.info)
        } else {

        }
      })
      //this.auth.resource.startSnackBar("Comming Soon...")
    }
  }



  setUpBANK(uid: string, phone: string, email: string, state: boolean) {
    if (state) {
      this.auth.resource.startSnackBar("The account is already associated with a UPI account.")
    } else {
      if (!phone || !email) {
        this.auth.resource.startSnackBar("Please assign a phone & email to the account.")
      } else {
        let isPhone = this.auth.resource.getWidth < 768;
        let w = isPhone ? this.auth.resource.getWidth + "px" : "480px";
        let h = isPhone ? this.auth.resource.getHeight + "px" : "";
        const refDialog = this.auth.resource.dialog.open(AddBankComponent, {
          width: w, minWidth: "320px", maxWidth: "480px",
          height: h,
          data: { type: "IMPS" },
          disableClose: true, panelClass: "dialogLayout"//, autoFocus:false
        });
        refDialog.afterClosed().subscribe(result => {
          if (!result.success) {
          } else {
            const bank_account = {
              contact_id: "",
              name: result.bank.NAME,
              ifsc: result.bank.IFSC,
              account_number: result.bank.AcNo,
              verified: false
            }
            this.makingChanges = true;
            this.pay.updateBankIMPS(uid, bank_account).then(() => {
              this.makingChanges = false;
            })
          }
        })
      }
    }
  }

  setUpUPI(uid: string, phone: string, email: string, state: boolean) {
    if (state) {
      this.auth.resource.startSnackBar("The account is already associated with a UPI account.")
    } else {
      if (!phone || !email) {
        this.auth.resource.startSnackBar("Please assign a phone & email to the account.")
      } else {
        let isPhone = this.auth.resource.getWidth < 768;
        let w = isPhone ? this.auth.resource.getWidth + "px" : "480px";
        let h = isPhone ? this.auth.resource.getHeight + "px" : "";
        const refDialog = this.auth.resource.dialog.open(AddBankComponent, {
          width: w, minWidth: "320px", maxWidth: "480px",
          height: h,
          data: { type: "UPI" },
          disableClose: true, panelClass: "dialogLayout"//, autoFocus:false
        });
        refDialog.afterClosed().subscribe(result => {
          if (!result.success) {
          } else {
            const vpa = {
              contact_id: "",
              address: result.vpa,
              verified: false
            }
            this.makingChanges = true;
            this.pay.updateBankUPI(uid, vpa).then(() => {
              this.makingChanges = false;
            })
          }
        })
      }
    }
  }

}
