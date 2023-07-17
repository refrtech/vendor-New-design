import { AfterViewInit, Component, ElementRef, Inject, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

import { Geolocation, Position } from '@capacitor/geolocation';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, take } from 'rxjs';
import { DependencyService } from 'src/app/services/dependency.service';
import { GoogleMap } from '@angular/google-maps';
import { CropperComponent } from 'src/app/placeholders/cropper/cropper.component';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-new-store',
  templateUrl: './new-store.component.html',
  styleUrls: ['./new-store.component.scss']
})
export class NewStoreComponent implements OnInit, AfterViewInit {

  @ViewChild('mapSearchField') searchField!: ElementRef;
  @ViewChild(GoogleMap) Gmap!: GoogleMap;
  @ViewChild('phone') inputPhone!: ElementRef;
  apiLoaded$!: Observable<boolean>;
  startScan = false;

  imageUrlLogo:any = "";
  imageUrlBanner:any = "";

  //filteredOptions: any[] = [];

  storeLoc:any = {
    nationISO: "IND",
    stateISO: "",
    storeType:"",
    storeName:"",
    storeAbout:"",
    fullname:"",//mine.name
    phone:"", // mine.phone ? mine.phone.split('+91')[1] : ''
    email:"",// mine.email
    storeCat:"",
    storeSubCat:"",
    locAddress: "",
    locSearch:"",
    loc:{},
    postal_code:"",
    locality:"",
    administrative_area_level_2:"",
    administrative_area_level_1:"",
    point_of_interest:"",
    opensDaily: true, opensDailyS:"07:00", opensDailyE:"23:00",
    openMon: true, openMonS:"07:00", openMonE:"23:00",
    openTue: true, openTueS:"07:00", openTueE:"23:00",
    openWed: true, openWedS:"07:00", openWedE:"23:00",
    openThu: true, openThuS:"07:00", openThuE:"23:00",
    openFri: true, openFriS:"07:00", openFriE:"23:00",
    openSat: true, openSatS:"07:00", openSatE:"23:00",
    openSun: false, openSunS:"07:00", openSunE:"23:00",
    delivery: "Citywide", logistics:false, exchange: true, COD: true,
    by:"",
  }

  options: google.maps.MapOptions = {
    disableDefaultUI: true,
    fullscreenControl: false,
    zoomControl: true
  };
  markOptions: google.maps.MarkerOptions = {
    draggable: false
  };
  initialCordinates = {
    lat: 19.0760,
    lng: 72.8777
  };
  initialMark = {
    lat: 19.0760,
    lng: 72.8777
  }
  initialZoom = 11;

  indStates:any = [];

  submitFirst = false;
  disableForm = false;
  loadPlacesAPI = false;
  currentUser = {phone:"", email:""};

  constructor(
    public auth: AuthService,
    private bottomSheet: MatBottomSheet,
    private httpClient: HttpClient,
    public depends: DependencyService,
  ) { }

  ngOnInit(): void {
    this.auth.user$.pipe(take(1)).subscribe(mine => {
      this.storeLoc.phone = mine.phone ? mine.phone.split('+91')[1] : '';
      this.storeLoc.email = mine.email ? mine.email : "";
      this.storeLoc.fullname = mine.name;
      this.storeLoc.by = mine.uid;
      this.currentUser = {
        phone:mine.phone,
        email:mine.email
      }

    })


  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.indStates = this.auth.resource.foreignMarks[this.auth.resource.foreignMarks.findIndex((n:any) => n.iso == "IND")].states;
    }, 3000);
    this.addSearchBox();
  }


  async addSearchBox(){
    this.apiLoaded$ = await this.httpClient.jsonp('https://maps.googleapis.com/maps/api/js?sensor=false&key=AIzaSyABtVV28ilpCAlbhN-tEPe_t57QGwQ5WiM&libraries=places', 'callback')
    .pipe(map(() => {
      return true;
    }),catchError(() => of(false)),);

    setTimeout(() => {
    const searchBox = new google.maps.places.SearchBox(this.searchField.nativeElement,);
    //this.Gmap.controls[google.maps.ControlPosition.TOP_CENTER].push(this.searchField.nativeElement,)
    //this.Gmap.controls[google.maps.ControlPosition.LEFT_BOTTOM].push(this.searchField.nativeElement,)

    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if(places?.length == 0){return;}
      const bounds = new google.maps.LatLngBounds();
      places?.forEach(place => {
        if(!place.geometry || !place.geometry.location){return;}else{
          if(place.geometry.viewport){
            this.loadPlacesAPI = true;
            bounds.union(place.geometry.viewport);
            this.inputClicked(place)
            //vicinity
            let latX =place.geometry.location.lat();
            let lngX =place.geometry.location.lng();
            this.storeLoc.loc = {
              latitude: latX, longitude: lngX
            }
            this.initialCordinates = {
              //center: {
                lat: latX, lng: lngX
              //},
              //zoom: 16
            }; this.initialMark = this.initialCordinates;
            this.initialZoom = 16;
            /*
            this.storeLoc.loc = {
              accuracy: locX.coords.accuracy,
              altitude: locX.coords.altitude, altitudeAccuracy: locX.coords.altitudeAccuracy,
              heading: locX.coords.heading,
              latitude: locX.coords.latitude, longitude: locX.coords.longitude,
              speed: locX.coords.speed,
              timestamp: locX.timestamp,
            }
            */
          }else{
            bounds.extend(place.geometry.location);
          }
        }
      })
      this.Gmap.fitBounds(bounds)
    })

    }, 3000)
  }

  getInfoFromApi(latitude:number, longitude:number){
    this.loadPlacesAPI = true;
    this.depends.getLocationInfo("IND", latitude, longitude).pipe().subscribe((res:any) => {
      if(!res || !res.success || !res.result || !res.result[0]){
        this.auth.resource.startSnackBar("Failed to Autofill data!")
        this.loadPlacesAPI = false;
      }else{
        //this.filteredOptions = res.result;
        this.storeLoc.locSearch = res.result[0].formatted_address
        this.inputClicked(res.result[0])

      }
    })
  }


  async getCurrentPosition() {
    this.startScan = true;
  try{
    const locX:Position = await Geolocation.getCurrentPosition();

    if(!locX){
      this.startScan = false;
    }else{
      this.storeLoc.loc = {
        //accuracy: locX.coords.accuracy,
        //altitude: locX.coords.altitude, altitudeAccuracy: locX.coords.altitudeAccuracy,
        //heading: locX.coords.heading,
        latitude: locX.coords.latitude, longitude: locX.coords.longitude,
        //speed: locX.coords.speed,
        //timestamp: locX.timestamp
      }
      this.initialCordinates = {
        //center: {
          lat: this.storeLoc.loc?.latitude,
          lng: this.storeLoc.loc?.longitude
        //},
        //zoom: 16
      };
      this.initialMark = this.initialCordinates;
      this.initialZoom = 16;
      //http://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&sensor=false
      this.startScan = false;
      //let key = "AIzaSyABtVV28ilpCAlbhN-tEPe_t57QGwQ5WiM";
      //const newLocation = await this.httpClient.jsonp( `http://maps.googleapis.com/maps/api/geocode/json?key=${key}&latlng=${this.storeLoc.loc?.latitude},${this.storeLoc.loc?.longitude}&sensor=false`, 'callback');
      //.pipe(map(() => true),catchError(() => of(false)),);
      this.getInfoFromApi(this.storeLoc.loc?.latitude, this.storeLoc.loc?.longitude)
    }

  }catch (error) {
    this.startScan = false;
    this.auth.resource.startSnackBar("Please provide location permissions.")
  }

  }


  inputClicked(result:any){
    result?.address_components.map((component:any) => {
      const types = component.types;
      if (types.includes('postal_code')) {
        this.storeLoc.postal_code = component.long_name
      }

      if (types.includes('locality')) {
        this.storeLoc.locality = component.long_name
      }

      if (types.includes('administrative_area_level_2')) {
        this.storeLoc.administrative_area_level_2 = component.long_name
      }

      if (types.includes('administrative_area_level_1')) {
        this.storeLoc.administrative_area_level_1 = component.long_name;
          const stateIndex = this.indStates.find((x:any) => {
            const z = this.storeLoc.administrative_area_level_1.toLowerCase() == x.name.toLowerCase();
            return z
          })
          if(stateIndex?.isos){
            this.storeLoc.stateISO = stateIndex.isos;
          }
        // const state = this.indStates[
        //   this.indStates.findIndex(x => {
        //     const z = x.name.toLowerCase() == this.storeLoc.administrative_area_level_1.toLowerCase();
        //   })
        // ];
        // if(state){
        //   this.storeLoc.indStateISO = state.isos;
        // }
      }

      if (types.includes('point_of_interest')) {
        this.storeLoc.point_of_interest = component.long_name
      }

      if(types.includes('country')){
        if(component.long_name.toLowerCase() !== "india"){
          this.storeLoc.postal_code = "";
          this.storeLoc.locality = "";
          this.storeLoc.administrative_area_level_2 = "";
          this.storeLoc.administrative_area_level_1 = "";
          this.storeLoc.stateISO = "";
          this.storeLoc.point_of_interest = "";
        }
      }

    })

    this.loadPlacesAPI = false;
  }


  addMarker(event: google.maps.MapMouseEvent) {
    if(event.latLng){
      const latLon = event.latLng.toJSON();
      this.storeLoc.loc = {
        //accuracy: locX.coords.accuracy,
        //altitude: locX.coords.altitude, altitudeAccuracy: locX.coords.altitudeAccuracy,
        //heading: locX.coords.heading,
        latitude: latLon.lat, longitude: latLon.lng,
        //speed: locX.coords.speed,
        //timestamp: locX.timestamp
      }
      //this.initialZoom = 16;
      this.initialMark = latLon;
      //this.initialCordinates = latLon;
      this.getInfoFromApi( latLon.lat, latLon.lng)
      /*
      this.initialCordinates = {
        //center: {
          lat: this.storeLoc.loc?.latitude,
          lng: this.storeLoc.loc?.longitude
        //},
        //zoom: 16
      };
      this.initialMark = this.initialCordinates;
      this.initialZoom = 16;
      */
    }
  }
/*
inputClicked = (result) => {

  result?.address_components.map(component => {
    const types = component.types

    if (types.includes('postal_code')) {
      $('postal_code').value = component.long_name
    }

    if (types.includes('locality')) {
      $('locality').value = component.long_name
    }

    if (types.includes('administrative_area_level_2')) {
      $('city').value = component.long_name
    }

    if (types.includes('administrative_area_level_1')) {
      $('state').value = component.long_name
    }

    if (types.includes('point_of_interest')) {
      $('landmark').value = component.long_name
    }
  });

  $('address').value = result.formatted_address;

  // to avoid labels overlapping prefilled contents
  M.updateTextFields();
  removeAddressCards();
}
*/



  async takePicture(type:string){
    if(!this.disableForm){
      const image = await Camera.getPhoto({
        quality: 100,
        height: 300,
        width: 300,
        allowEditing: false,
        source:CameraSource.Camera,
        resultType: CameraResultType.Uri
      });
      const imageUrl = image.webPath || "";
      if(imageUrl){
      this.startCropper(imageUrl, type);
      }
    }
  }
  async choosePhoto(type:string){
    if(!this.disableForm){
      const image = await Camera.pickImages({
        quality: 100,
        height: 300,
        width: 300,
        limit: 1,
      });
      const imageUrl = image.photos[0].webPath || "";
      if(imageUrl){
      this.startCropper(imageUrl, type);
      }
    }
  }

  startCropper(webPath:string, type:string){
    if(!this.disableForm){
      let isPhone = this.auth.resource.getWidth < 768;
      let w = isPhone ? this.auth.resource.getWidth + "px" : "480px";
      let h = isPhone ? this.auth.resource.getHeight + "px" : "";
      const refDialog = this.auth.resource.dialog.open(CropperComponent, {
        width: w, minWidth: "320px", maxWidth: "480px",
        height:h,
        data:{webPath:webPath, type:type},
        disableClose: true, panelClass:"dialogLayout"//, autoFocus:false
      });
      refDialog.afterClosed().subscribe(result =>{
        if(!result.success){
          if(result.info){
            this.auth.resource.startSnackBar(result.info)
          }
        }else{
          if(type == "logo"){
            this.imageUrlLogo = result.croppedImage;
          }
          if(type == "banner"){
            this.imageUrlBanner = result.croppedImage;
          }
        }
      })
    }
  }


  createStore(addNewLoc:boolean){
    this.submitFirst = true;
    this.disableForm = true;
    if(
      !this.storeLoc.storeType ||
      !this.storeLoc.storeName || !this.storeLoc.storeAbout ||
      !this.storeLoc.storeCat || !this.storeLoc.storeSubCat ||
      !this.storeLoc.phone || !this.storeLoc.email ||
      !this.storeLoc.locAddress || !this.storeLoc.locSearch || //!this.storeLoc.locality ||
      !this.storeLoc.postal_code || !this.storeLoc.administrative_area_level_2 || !this.storeLoc.administrative_area_level_1 ||

      !this.storeLoc.nationISO || !this.storeLoc.stateISO || !this.storeLoc.by
      ){
        if( !this.storeLoc.storeType ){
          this.auth.resource.startSnackBar("Store type is required");
        }else{
          if( !this.storeLoc.storeName ){
            this.auth.resource.startSnackBar("Store name is required");
          }else{
            if( !this.storeLoc.storeAbout ){
              this.auth.resource.startSnackBar("Short intro is required");
            }else{

            if( !this.storeLoc.storeCat ){
              this.auth.resource.startSnackBar("Store category is required");
            }else{
              if( !this.storeLoc.storeSubCat ){
                this.auth.resource.startSnackBar("Store sub category is required");
              }else{
                if( !this.storeLoc.phone ){
                  this.auth.resource.startSnackBar("Store phone is required");
                }else{
                  if( !this.storeLoc.email ){
                    this.auth.resource.startSnackBar("Store email is required");
                  }else{
                    if( !this.storeLoc.locAddress ){
                      this.auth.resource.startSnackBar("Store address is required");
                    }else{
                      if( !this.storeLoc.locSearch ){
                        this.auth.resource.startSnackBar("Store location is required");
                      }else{
                        //if( !this.storeLoc.locality ){
                          //this.auth.resource.startSnackBar("Store locality is required");
                        //}else{
                        if( !this.storeLoc.administrative_area_level_1 ){
                          this.auth.resource.startSnackBar("Store state is required");
                        }else{
                          if( !this.storeLoc.administrative_area_level_2 ){
                            this.auth.resource.startSnackBar("Store city is required");
                          }else{
                            if( !this.storeLoc.stateISO || !this.storeLoc.nationISO ){
                              this.auth.resource.startSnackBar("Store state and city is required");
                            }else{
                              if( !this.storeLoc.postal_code ){
                                this.auth.resource.startSnackBar("Store postal code is required");
                              }else{
                                if(!this.storeLoc.by){
                                  this.auth.resource.startSnackBar("You need to be signed to create a store");
                                }else{
                                  this.auth.resource.startSnackBar("Invalid Fields");
                                }
                              }
                            }
                          }
                        //}
                        }
                      }
                    }
                  }
                }
              }
            }
          }

          }
        }
        this.disableForm = false;
    }else{
      const phone = "+91" + this.storeLoc.phone;
      const email = this.storeLoc.email.toLowerCase();
      if(
        !this.currentUser.phone && !this.auth.resource.invalidPhone( phone ) ||
        !this.currentUser.email && this.auth.resource.invalidEmail(this.storeLoc.email) ||
        !this.currentUser.phone
        //!this.currentUser.email ||
      ){ // verify phone or email
        if(!this.currentUser.phone && !this.auth.resource.invalidPhone(phone)){
          this.disableForm = false;
          this.auth.resource.startSnackBar("Phone number is invalid.")
        }else{
          if(!this.currentUser.email && this.auth.resource.invalidEmail( email )){
            this.disableForm = false;
            this.auth.resource.startSnackBar("Email address is invalid.")
          }else{

            const bS = this.bottomSheet.open(BottomSheetOTP, {
              data: {phone: this.storeLoc.phone, uid: this.storeLoc.by}, //panelClass:"bottomSheetClassUpdate",
              hasBackdrop: true,
              disableClose: true
            });

            bS.afterDismissed().subscribe(result => {
              if(!result.success){
                this.disableForm = false;
                // scroll to phone number
                this.inputPhone.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
                //this.inputPhone.nativeElement.autoFocus();
                this.inputPhone.nativeElement.select();
              }else{
                this.createNewStore(addNewLoc);
              }
              // Restore focus to an appropriate element for the user's workflow here.
            });

            //this.auth.resource.startSnackBar("Please verify phone number.")
          }
        }
      }else{
        this.createNewStore(addNewLoc);
      }

    }
  }

  createNewStore(addNewLoc:boolean){
        this.auth.createStore(this.storeLoc, this.imageUrlLogo, this.imageUrlBanner).then(res => {
          this.auth.resource.startSnackBar("The store has been created.");
          if(!addNewLoc){
            this.auth.resource.router.navigate(["/store/create-campaign"]);
            // create new location
          }else{
            this.auth.resource.router.navigate(["/store/add-location"]);
            // go to next route (create campaign)
          }
        }).catch(err => {
          this.disableForm = false;
          this.auth.resource.startSnackBar("The store has not been created.")
        })
  }

}


export class PhoneNumber {
  country: string ="91";
  iso: string ="IND";
  coin: string ="INR";
  digits: number = 10;
  area: string ="";
  prefix: string ="";
  line: string ="";
  // format phone numbers as E.164
  get e164() {
    const num = this.country + this.area + this.prefix + this.line
    return `+${num}`
  }
}


@Component({
  selector: 'bottom-sheet-otp',
  templateUrl: './bottom-sheet-otp.html',
  styleUrls: ['./bottom-sheet-otp.scss']
})
export class BottomSheetOTP implements AfterViewInit {
  otpSent = false;
  //showOtpSend = true;
  stepDisable = false;
  verificationCode = "";
  phoneNumber = new PhoneNumber();
  phoneNumFull:string = "";

  constructor(
    public auth:AuthService,
    public bfRef: MatBottomSheetRef<BottomSheetOTP>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: {phone: string; uid:string}
  ) {
    this.phoneNumFull = data.phone;
    this.setContactNumber();

    //if(!mine.phone){
    //}
  }

  ngAfterViewInit(): void {
    this.auth.setupReCapca();
    setTimeout(() => {
      this.execute()
      //this.otpSent = true;
    }, 3000);
  }

  setContactNumber(){
      this.phoneNumber.area = this.phoneNumFull.slice(0,3);
      this.phoneNumber.prefix = this.phoneNumFull.slice(3,6);
      this.phoneNumber.line = this.phoneNumFull.slice(6,this.phoneNumber.digits);
  }


  execute(){
    this.sendOtp(this.phoneNumber.e164)
  }

  sendOtp(phone:string){
    //this.showOtpSend = false;
    this.auth.addPhoneWithOTP( phone ).then(dataV => {
      if(!dataV.success){
        this.auth.resource.startSnackBar(dataV.info);
      }else{
        this.otpSent = true;
        this.auth.resource.startSnackBar("Sms sent on " + this.data.phone);
      }
    })
  }

  verifyOtp(){
    this.stepDisable = true;
    //this.showOtpSend = false;
    if(this.verificationCode?.length < 6){
      this.stepDisable = false;
      this.auth.resource.startSnackBar("issue: verification code invalid.")
    }else{
      this.auth.confirmationResult.confirm(this.verificationCode).then((credential:any) => {
        this.auth.addPhoneNumber(this.data.uid, this.phoneNumber.e164, this.phoneNumber.iso, this.phoneNumber.coin).then(() => {
          this.bfRef.dismiss({success:true});
        })
      }).catch((err:any) => {
        console.error(err);
        this.verificationCode = "";
        this.auth.resource.startSnackBar(err);
        this.stepDisable = false;
        //this.bfRef.dismiss({success:false});
      })
    }
  }

  changeNumber(){
    this.bfRef.dismiss({success:false});
  }

}
