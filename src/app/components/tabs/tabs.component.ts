import { AfterViewInit, Component, Inject, OnInit,OnChanges, SimpleChanges } from '@angular/core';
import { MatBottomSheet, MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Router } from '@angular/router';
import { Observable, of, take } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { DependencyService } from 'src/app/services/dependency.service';
import { ThemeService } from 'src/app/services/theme.service';
import { VendorHIWComponent } from './wallet/add-balance/vendor-hiw/vendor-hiw.component';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.scss']
})
export class TabsComponent implements OnInit, AfterViewInit {
  title = 'Refr';
  infocus = false;
  showMenu = false;

  navRoutes = [
    { tit: "Dashboard", link: "/dash" },
    { tit: "My Store", link: "/profile" },
    { tit: "Campaigns", link: "/campaign" },
    { tit: "Wallets", link: "/wallet" },
    { tit: "Products", link: "/my-inventory" },
    { tit: "My Customers", link: "/customer" },
    { tit: "Orders", link: "/my-order-list" },
    {tit:'Store Setting',link:"/storesetting" }
    //{ tit:"Subscriptions", link:"/dash" },
    //{ tit:"Integrations", link:"/api" },
    ///{ tit:"Reports", link:"/insight" },
    //{ tit:"Settings", link:"/dash" },
  ]

  constructor(
    public router: Router,
    public auth: AuthService,
    public themeService: ThemeService,
    private bottomSheet: MatBottomSheet,
    public dependancy: DependencyService,
    private _bottomSheet: MatBottomSheet
  ) {
  }

  ngOnInit(): void {
    if (this.auth.resource.getWidth > 767) {
      this.showMenu = true;
    }
    /*
    menu_position = menu_current_item.offsetLeft - 16;
    menu_indicator.style.left = menu_position + "px";
    menu_bar.style.backgroundPosition = menu_position-8 + 'px';
    menu_item.forEach(() =>
      (select_menu_item: any){
        select_menu_item.addEventListener('click', function(e){
          e.preventDefault();
          menu_position = this.offsetLeft - 16;
          menu_indicator.style.left = menu_position + "px";
          menu_bar.style.backgroundPosition = menu_position-8 + 'px';
          [...select_menu_item.parentElement.children].forEach(
            sibling => {
              sibling.classList.remove('sc-current');
            })
          select_menu_item.classList.add('sc-current');
        });
      }
    )
    */
  }

  ngAfterViewInit() {

    // let menu_bar:any = document.querySelector('.sc-bottom-bar');
    // let menu_item = document.querySelectorAll('.sc-menu-item');
    // let menu_indicator:any = document.querySelector('.sc-nav-indicator');
    // let menu_current_item:any = document.querySelector('.sc-current');
    // let menu_position;

    //menu_position = (menu_current_item.offsetLeft || 0) - 16;
    //menu_indicator.style.left = menu_position + "px";
    //menu_bar.style.backgroundPosition = menu_position-8 + 'px';
  }


  getIndiWidth() {
    return this.auth.resource.getWidth > 360 ? (360 / 5) : (this.auth.resource.getWidth / 5)
  }

  openBottomSheet(notes: any): void {
    // let isPhone = this.auth.resource.getWidth < 768;
    // let w = isPhone ? this.auth.resource.getWidth + "px" : "480px";
    // let h = isPhone ? this.auth.resource.getHeight + "px" : "";

    this.bottomSheet.open(BottomSheetNotification, {
       panelClass: "bottomSheetClass", //hasBackdrop: false,
    });
  }
  infossss() {
    if (this.dependancy.activeroute == '/dash') {
      this.router.navigate(['/dashHIW'])
    }
    else if (this.dependancy.activeroute == '/wallet') {
      this._bottomSheet.open(VendorHIWComponent, {
        panelClass: 'storepage',
      });
    }
  }

}




@Component({
  selector: 'bottom-sheet-notification',
  templateUrl: './bottom-sheet-notification.html',
})
export class BottomSheetNotification implements OnInit, AfterViewInit ,OnChanges{
  notes: any = [];
  notificationList$: Observable<any[]> = of();

  constructor(
    private bsRef: MatBottomSheetRef<BottomSheetNotification>,
    private auth: AuthService,
  ) {
    this.notificationList$.subscribe((notifications: string[]) => {
      // call your custom function passing the new length of notifications
      const audio = new Audio();
      audio.src = 'https://firebasestorage.googleapis.com/v0/b/refr-india.appspot.com/o/not-kiddin-243.mp3?alt=media&token=edd1b859-a85b-45db-a034-302210698947';
      audio.load();
      audio.play();
      if (notifications) {
        audio.play().then(() => {
          // success
        }).catch((error) => {
          // handle error
          console.error('Not able to play audio '+error);
        });
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    const audio = new Audio();
    audio.src = 'https://firebasestorage.googleapis.com/v0/b/refr-india.appspot.com/o/not-kiddin-243.mp3?alt=media&token=edd1b859-a85b-45db-a034-302210698947';
    audio.load();
    audio.play();
     //changes['notificationList$']
  }
  ngAfterViewInit(): void {
    this.auth.user$.pipe(take(1)).subscribe((mine) => {

      if (mine) {
        this.getNotifiy(mine.phone);
        const handler = {
          set: function(target:any, property:any, value:any) {
            target[property] = value;
            // Call your function here to handle the change
            //myFunction();
            const audio = new Audio();
            audio.src = 'https://firebasestorage.googleapis.com/v0/b/refr-india.appspot.com/o/not-kiddin-243.mp3?alt=media&token=edd1b859-a85b-45db-a034-302210698947';
            audio.load();
            audio.play();
            if ( audio.src) {
              audio.play().then(() => {
                // success
              }).catch((error) => {
                // handle error
                console.error('Not able to play audio '+error);
              });
            }
            return true;
          }
        };

        const proxy = new Proxy(this.notificationList$, handler);
      }
    })
  }

  ngOnInit(): void {

    // this.auth.user$.pipe(take(1)).subscribe((mine) => {
    //   if (mine) {
    //     this.getNotifiy(mine.phone);
    //   }
    // })
  }

  getNotifiy(phone: string) {
    if(phone.includes("+91") == true) {
      this.notificationList$ =  this.auth
      .getNotify(30, phone);
    } else {
      this.notificationList$ =  this.auth
      .getNotify(30, '+91'+phone);
    }

      // .pipe(take(1))
      // .subscribe((d: any) => {
      //   if (d.length == 0 && phone.includes("+91") == true) {
      //     this.auth
      //     .getNotify(50, phone.slice(3,13))
      //     .pipe(take(1))
      //     .subscribe((d: any) => {
      //       this.notificationList$ = of(d);
      //     })
      //   }
      //   else if (d.length == 0 && phone.includes("+91") == false) {
      //     this.auth
      //     .getNotify(50, "+91"+phone)
      //     .pipe(take(1))
      //     .subscribe((d: any) => {
      //       this.notificationList$ = of(d);
      //     })
      //   }
      //   else {
      //     this.notificationList$ = of(d);
      //   }
      // });
  }

  openLink(): void {
    this.bsRef.dismiss();
  }

  clearNotifications() {
    this.auth.clearNotifications()
    this.bsRef.dismiss();
  }
}
