import { Component } from '@angular/core';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { take } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
import { DependencyService } from './services/dependency.service';
import { ThemeService } from './services/theme.service';

//import { SplashScreen } from '@capacitor/splash-screen';
// import { StatusBar, Style, BackgroundColorOptions } from '@capacitor/status-bar';

//import { initializeApp } from 'firebase/app';
//import { indexedDBLocalPersistence, initializeAuth } from 'firebase/auth';
// import { Capacitor } from '@capacitor/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Refr';
  showWarn = false;

  constructor(
    public auth: AuthService,
    public depends: DependencyService,
    public themeService: ThemeService,
    private bottomSheet: MatBottomSheet
  ){


    // const app = initializeApp(environment.firebase);
    // if (Capacitor.isNativePlatform()) {
    //   // initializeAuth(app, {
    //   //   persistence: indexedDBLocalPersistence
    //   // });
    // }

    //if(auth.resource.appMode){
      //this.executeApp( this.themeService.currentActive() == 'dark' ? "#000000":"#ffffff");
    //}

    

    // Load Color Scheme
    this.themeService.load();
    this.internetChecks();
  }

  async executeApp(cX:string){
    // Hide the splash (you should do this on app launch)
    //await SplashScreen.hide();
    // Display content under transparent status bar (Android only)
    //StatusBar.setOverlaysWebView({ overlay: true });
    
    //await StatusBar.setStyle({ style: Style.Dark });
    // await StatusBar.setStyle({ style: Style.Light });
    //await StatusBar.setStyle({ style: Style.Default });
    // await StatusBar.setBackgroundColor({color:cX})
    //await StatusBar.hide();
  }
  
  internetChecks(){
    let firstTry = false;
    this.auth.resource.internetConnected().then(res => {
      if(!res){
        this.showWarn = true;
        console.log("No Internet...")
        this.auth.resource.startSnackBar("No Internet...")
      }else{
        //this.showWarn = true;
        setTimeout(() => {
          this.showWarn = false;  
          if(!firstTry){
          firstTry = true;  
          this.execute();
          }
        }, (!firstTry ? 1000 : 3000));
      }
    }).catch(err => {
      console.log("No Internet...")
      this.auth.resource.startSnackBar("No Internet: " + err)
    })
  }
  

  execute(){
    if(this.auth.resource.appMode && environment.production){
      //this.executeApp("#512DA8");
    }
    // Setup Data for resources
    console.log("Setup Data for resources")
    //this.auth.resource.onlineOffline().pipe(take(1)).subscribe(net => {
      //if( net ){
        this.depends.getState()/*.pipe(take(1))*/.subscribe((getStateRes: any) => {
          // {
          //   vr: 101.1, 
          //   web:1.1, andi: 1.1, ios: 1.1,
          //   env: enviroment.prod,
          //   code:"Albatrosses", date: 1644195271637
          // }
          if(
            !getStateRes || 
            getStateRes.vr > environment.refrBot.vr ||
            !this.auth.resource.appMode && getStateRes.web > environment.refrBot.web ||
            this.auth.resource.appMode && getStateRes.andi > environment.refrBot.andi
            // getStateRes.ios > environment.ios
            ){
            // vr check
            // device check
            // os check
            this.auth.resource.updateAvil = true;
            this.openBottomSheet(getStateRes)
            this.themeService.update(this.themeService.colorScheme == 'dark' ? 'light' : 'light')
          }else{
            this.auth.resource.foreignMarks = getStateRes.markets;
            this.auth.resource.vendorTaxes = getStateRes.taxes;
            this.auth.resource.merchandiseList = getStateRes.merchandise;
            this.auth.resource.campaignPlans = getStateRes.campaignPlans;
            this.auth.getCategoryList().pipe(take(1)).subscribe(cat => {
              console.log(cat)
              this.auth.resource.categoryList = cat;
            })
          }

        });
      //}else{

      //}
    //})
  }

  openBottomSheet(data:any): void {
    // let isPhone = this.auth.resource.getWidth < 768;
    // let w = isPhone ? this.auth.resource.getWidth + "px" : "480px";
    // let h = isPhone ? this.auth.resource.getHeight + "px" : "";

    this.bottomSheet.open(BottomSheetUpdate, {
      data: data, panelClass:"bottomSheetClassUpdate", hasBackdrop: true,
      disableClose: true
    });
  }

}

@Component({
  selector: 'bottom-sheet-update',
  templateUrl: './tasks/bottom-sheet-update.html',
})
export class BottomSheetUpdate {

  constructor(
    public auth:AuthService
  ) {
  }

}