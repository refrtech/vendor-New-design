import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { catchError, map, Observable, of, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

import { Geolocation, Position } from '@capacitor/geolocation';

import { GoogleMap } from '@angular/google-maps';
import { DependencyService } from 'src/app/services/dependency.service';
import { HttpClient } from '@angular/common/http';
import { Shop } from 'src/app/universal.model';

declare var google: { maps: { places: { SearchBox: new (arg0: any) => any; }; LatLngBounds: new () => any; Animation: { DROP: any; }; }; }

@Component({
  selector: 'app-new-location',
  templateUrl: './new-location.component.html',
  styleUrls: ['./new-location.component.scss']
})
export class NewLocationComponent implements OnInit, AfterViewInit {

  @ViewChild('mapSearchField') searchField!: ElementRef;
  @ViewChild(GoogleMap) Gmap!: GoogleMap;
  apiLoaded$!: Observable<boolean>;
  startScan = false;

  store$: Observable<any> = of();

  storeLoc:any = {
    storeID: "",

    nationISO: "IND",
    stateISO: "",

    locAddress: "",
    locSearch:"",
    loc:{},
    postal_code:"",
    locality:"",
    administrative_area_level_2:"",
    administrative_area_level_1:"",
    point_of_interest:"",
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
  storeOptions: google.maps.MarkerOptions = {
    draggable: false
  };
  storeMarks: any[] = []
  initialZoom = 11;

  indStates:any = [];

  //submitFirst = false;
  disableForm = false;
  loadPlacesAPI = false;

  constructor(
    public auth: AuthService,
    private httpClient: HttpClient,
    public depends: DependencyService,
  ) {
    // force route reload whenever params change;
    //this.auth.resource.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.indStates = this.auth.resource.foreignMarks[this.auth.resource.foreignMarks.findIndex((n:any) => n.iso == "IND")].states;    
      this.execute()  
    this.addSearchBox();
    }, 3000);
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
      places?.forEach((place:any) => {
        if(!place.geometry || !place.geometry.location){return;}else{
          if(place.geometry.viewport){
            this.loadPlacesAPI = true;
            bounds.union(place.geometry.viewport);
            this.inputClicked(place)
            console.log("PLACES", place.geometry.location.lat(), place.geometry.location.lng())
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
            console.log("union", place)
          }else{
            bounds.extend(place.geometry.location);
            console.log("extend")
          } 
        }
      })
      this.Gmap.fitBounds(bounds)
    })

    }, 3000)
  }

  async execute(){
    const currentUser = await this.auth.afAuth.currentUser;
    const uid = currentUser?.uid;
    if(!uid){

    }else{
      this.auth.getMyStore(uid).pipe(take(1)).subscribe((store:any[]) => {
        if(!store || !store[0] || !store[0].id){
          // Retry

        }else{
          this.storeLoc.storeID = store[0].id;
          this.store$ = of(store[0])

          for (let i = 0; i < store[0].loc.length; i++) {
            const element = {
              position:{
              lat: store[0].loc[i].lat, lng: store[0].loc[i].lon,
              },
              visible: false, opacity: 0.1,
              //label: { color: '#ffffff', text: 'Marker label', },
              title: store[0].name,
              options: {
                //animation: google.maps.Animation.DROP,
                icon: 'assets/other/locate.svg'
              }
            };
            this.storeMarks.push(element)
          }
          console.log(this.storeMarks)
/*
          const x = {
            position:{
            lat: 19.0760, lng: 72.8777,
            },
            visible: false, opacity: 0.1,
            //label: { color: '#ffffff', text: 'Marker label', },
            title: 'Marker title',
            options: {
              //animation: google.maps.Animation.DROP,
              icon: 'assets/other/locate.svg'
            }
          }
*/
        }
      })
    }
  }

  getInfoFromApi(latitude:number, longitude:number){
    this.loadPlacesAPI = true;
    this.depends.getLocationInfo("IND", latitude, longitude).pipe().subscribe((res:any) => {
      console.log("HIT",res)
      if(!res || !res.success || !res.result || !res.result[0]){
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
      //console.log(this.storeLoc.loc )
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
    console.log("result", result)
    result.address_components.map((component:any) => {
      const types = component.types
      console.log("types", types)

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
          console.log("state", z, this.storeLoc.administrative_area_level_1, x.name)
            return z
          })
          if(stateIndex?.isos){
            console.log("stateIndex", stateIndex)
            this.storeLoc.stateISO = stateIndex.isos;
          }
        // const state = this.indStates[
        //   this.indStates.findIndex(x => {
        //     const z = x.name.toLowerCase() == this.storeLoc.administrative_area_level_1.toLowerCase();
        //     console.log("z",z);
        //   })
        // ];
        // if(state){
        //   console.log("state",state)
        //   this.storeLoc.indStateISO = state.isos;
        // }
      }

      if (types.includes('point_of_interest')) {
        this.storeLoc.point_of_interest = component.long_name
      }

      if(types.includes('country')){
        console.log("types", types, component.long_name)
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




  createStoreLocation(addNewLoc:boolean){
    console.log(this.storeLoc)
    //this.submitFirst = true;
    this.disableForm = true;

    if(
      !this.storeLoc.locAddress || !this.storeLoc.locSearch || //!this.storeLoc.locality || 
      !this.storeLoc.postal_code || !this.storeLoc.administrative_area_level_2 || !this.storeLoc.administrative_area_level_1 ||

      !this.storeLoc.nationISO || !this.storeLoc.stateISO || !this.storeLoc.storeID 
    ){
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
                  this.auth.resource.startSnackBar("Invalid Fields");
                }
              }
            }
          }
        }
      }
      this.disableForm = false;
    }else{
      this.addNewLocation(addNewLoc);
    }
  }

  addNewLocation(addNewLoc:boolean){
    this.auth.addLocation(this.storeLoc).then(() => {
      this.auth.resource.startSnackBar("The new location been created.");
      if(!addNewLoc){
        this.auth.resource.router.navigate(["/store/create-campaign"])
        // go to next route (create campaign)
      }else{
        this.resetRoute()
        //this.auth.resource.router.navigate(["/store/create-location"])
        // create new location redirect
      }
    }).catch(err => {
      console.log(err)
    })
  }


  resetRoute(){
    this.store$ = of();

    this.storeLoc = {
      storeID: "",
  
      nationISO: "IND",
      stateISO: "",
  
      locAddress: "",
      locSearch:"",
      loc:{},
      postal_code:"",
      locality:"",
      administrative_area_level_2:"",
      administrative_area_level_1:"",
      point_of_interest:"",
    }
    this.initialCordinates = {
      lat: 19.0760, 
      lng: 72.8777
    };
    this.initialMark = {
      lat: 19.0760, 
      lng: 72.8777
    }
    this.storeMarks = [];

    this.initialZoom = 11;
    this.indStates = [];
  
    //this.submitFirst = false;
    this.disableForm = false;
    this.ngAfterViewInit();
  }

}
