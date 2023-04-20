import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatStepper } from '@angular/material/stepper';
import { ActivatedRoute, NavigationEnd, RouterEvent } from '@angular/router';
import { filter, of, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-store-create',
  templateUrl: './store-create.component.html',
  styleUrls: ['./store-create.component.scss'],
  providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {displayDefaultIndicatorType: false},
    },
  ]
})
export class StoreCreateComponent implements OnInit  {

  @ViewChild('stepper') stepper!: MatStepper;
  activeNow = "";
  selectedIndex:number = -1;
  stepLin = true;
  stepEdit = false;
  // activeIndex = 0;

  completed1 = false;
  completed2 = false;
  completed3 = false;
  completed4 = false;
 

  constructor(
    public auth: AuthService,
    private actRoute: ActivatedRoute
    //private httpClient: HttpClient,
    //public depends: DependencyService
  ) {
    // force route reload whenever params change;
    //this.auth.resource.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  ngOnInit(): void {
    this.execute()
    this.auth.resource.router.events.pipe(
      filter((event: any) => {
        return event instanceof NavigationEnd;
        //event instanceof NavigationEnd;
      })
    )
    .subscribe(ref => {
      console.log("Mano", ref)
      this.activeNow = "";
      this.execute();
      //this.fetchData();
    });
  }

  execute(){
    //const routePra = this.actRoute.snapshot.params;
    //const campID = routePra["campID"];
    //console.log("campID", what, campID)
    //console.log("Man", routePra)
    const routePraURL = this.auth.resource.router.url;
    const what = routePraURL.split("store/")[1];
    console.log("ManoV", what)

if(!what){
  console.log("I AM Here")

    
}else{
    if(
      what !== "create-location" &&
      what !== "add-location" &&
      what !== "create-campaign" &&
      !what.includes("fund-wallet/") &&
      what !== "add-product" 
      ){ this.auth.resource.router.navigate(["/"]) }else{

      if(what == "create-location" || what == "add-location"){ 
        // this.completed1 = false;
        // this.completed2 = false;
        // this.completed3 = false;
        // this.completed4 = false;
        // this.activeIndex = 0;
          this.auth.user$.pipe(take(1)).subscribe(mine => {
            if(mine){

              if(what == "create-location"){

                if(mine.storeLoc.length > 0){
                  this.auth.resource.router.navigate(['/store/add-location']);
                }else{
                  this.activeNow = "createLocation";
                }

              }
              if(what == "add-location"){
                this.activeNow = "addLocation"
              }
            }else{
              this.auth.resource.router.navigate(['/']);
            }
          })
      }
      if(what == "create-campaign"){ 
        // this.completed1 = true;
        // this.completed2 = false;
        // this.completed3 = false;
        // this.completed4 = false;
        // this.activeIndex = 1;
        this.activeNow = "createCampaign";
        this.nextClick(); }
      
      if(what.includes("fund-wallet/")){ 
        // this.completed1 = true;
        // this.completed2 = true;
        // this.completed3 = false;
        // this.completed4 = false;
        // this.activeIndex = 2;
        this.activeNow = "fundWallet";
        this.nextClick(); }
      if(what == "add-product"){ 
        // this.completed1 = true;
        // this.completed2 = true;
        // this.completed3 = true;
        // this.completed4 = false;
        // this.activeIndex = 3;
        this.activeNow = "addProduct";
        this.nextClick(); }
    }
}

  }

  // getRoute(){
  //   //const activeNow = this.auth.resource.router.url.split("store/")[1];
  //   return  of(( this.activeNow == "createLocation" ? 0 : 0 ) + ( this.activeNow == "addLocation" ? 0 : 0 ) + 
  //           ( this.activeNow == "createCampaign" ? 1 : 0 ) + 
  //           ( this.activeNow == "fundWallet" ? 2 : 0 ) + 
  //           ( this.activeNow == "addProduct" ? 3 : 0 ) + 
  //           ( 0 ));
  // }
  
  nextClick(): void {
    //this.stepLin = false;
    this.stepEdit = true;
    
    this.completed1 = (this.activeNow == 'createCampaign' || this.activeNow == 'fundWallet' || this.activeNow == 'addProduct' ) ? true:false;
    this.completed2 = (this.activeNow == 'fundWallet' || this.activeNow == 'addProduct') ? true:false;
    this.completed3 = (this.activeNow == 'addProduct') ? true:false;
    this.completed4 = false;

    //this.stepper.selectedIndex = this.selectedIndex;
    setTimeout(() => {
    this.selectedIndex = ( 0 ) +
    ( this.activeNow == 'createLocation' ? 0 : 0 ) + ( this.activeNow == 'addLocation' ? 0 : 0 ) + 
    ( this.activeNow == 'createCampaign' ? 1 : 0 ) + 
    ( this.activeNow == 'fundWallet' ? 2 : 0 ) + 
    ( this.activeNow == 'addProduct' ? 3 : 0 ) + 
    ( 0 );
       //this.stepLin = true;
       this.stepEdit = false;

    }, 100);
  }

}

