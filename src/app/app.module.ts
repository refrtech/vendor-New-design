import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent, BottomSheetUpdate } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatStepperModule } from '@angular/material/stepper';
import { MatSelectModule } from '@angular/material/select';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';

import {
  BottomSheetNotification,
  TabsComponent,
} from './components/tabs/tabs.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { WalletComponent } from './components/tabs/wallet/wallet.component';
import { ProfileComponent } from './components/tabs/profile/profile.component';
import { SignComponent } from './components/welcome/sign/sign.component';

import { DashboardComponent } from './components/tabs/dashboard/dashboard.component';
import { CampaignComponent } from './components/tabs/campaign/campaign.component';
import { InsightComponent } from './components/tabs/insight/insight.component';
import { CustomerComponent } from './components/tabs/customer/customer.component';
import { StoreCreateComponent } from './components/store-create/store-create.component';
import {
  BottomSheetOTP,
  NewStoreComponent,
} from './components/store-create/new-store/new-store.component';
import { NewLocationComponent } from './components/store-create/new-location/new-location.component';
import { NewCampaignComponent } from './components/store-create/new-campaign/new-campaign.component';
import { FundWalletComponent } from './components/store-create/fund-wallet/fund-wallet.component';
import { AddProductComponent } from './components/store-create/add-product/add-product.component';
import { PayComponent } from './components/pay/pay.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { ListOrderComponent } from './components/tabs/list-order/list-order.component';
import { ListProductComponent } from './components/tabs/list-product/list-product.component';
import { AddBalanceComponent } from './components/tabs/wallet/add-balance/add-balance.component';

import {
  provideFirebaseApp,
  getApp,
  initializeApp,
  FirebaseApp,
} from '@angular/fire/app';
import { provideAuth, initializeAuth } from '@angular/fire/auth';
import {
  provideFirestore,
  getFirestore,
  enableIndexedDbPersistence,
  connectFirestoreEmulator,
} from '@angular/fire/firestore';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';

import {
  indexedDBLocalPersistence,
  browserPopupRedirectResolver,
} from 'firebase/auth';

import { SocialSharing } from '@awesome-cordova-plugins/social-sharing/ngx';
// 1. Import the libs you need
// import { AngularFireModule } from '@angular/fire/compat';
// import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
// import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// import { AngularFireAuthModule } from '@angular/fire/compat/auth';
// import {
//   getAuth,
//   indexedDBLocalPersistence,
//   initializeAuth,
//   provideAuth,
// } from '@angular/fire/auth';

import { Ng2GoogleChartsModule } from 'ng2-google-charts';
import { GoogleMapsModule } from '@angular/google-maps';
import { ImageCropperModule } from 'ngx-image-cropper';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';

import { ContentComponent } from './placeholders/content/content.component';
import { CropperComponent } from './placeholders/cropper/cropper.component';
import { UploadProductComponent } from './components/tabs/list-product/upload-product/upload-product.component';
import { OrdrPlacedComponent } from './components/store-create/ordr-placed/ordr-placed.component';
import { PlanBalanceComponent } from './components/tabs/wallet/plan-balance/plan-balance.component';
import { ShareAdvocacyComponent } from './components/tabs/dashboard/share-advocacy/share-advocacy.component';
import { ShareLoyaltyComponent } from './components/tabs/dashboard/share-loyalty/share-loyalty.component';
import { OrdrShipComponent } from './components/tabs/list-order/ordr-ship/ordr-ship.component';
import { OrdrTrackComponent } from './components/tabs/list-order/ordr-track/ordr-track.component';
import { NewCustomerComponent } from './components/tabs/customer/new-customer/new-customer.component';
import { AddBankComponent } from './components/tabs/profile/add-bank/add-bank.component';
import { DrawBalanceComponent } from './components/tabs/wallet/draw-balance/draw-balance.component';
import { TestComponent } from './placeholders/test/test.component';
import { MerchanthowitworksComponent } from './components/tabs/dashboard/merchanthowitworks/merchanthowitworks.component';
import { KnowmoremerchantComponent } from './components/tabs/dashboard/merchanthowitworks/knowmoremerchant/knowmoremerchant.component';
import { NotificationorderpopupComponent } from './components/tabs/dashboard/notificationorderpopup/notificationorderpopup.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoyaltystepawayComponent } from './components/newDesignScreens/loyaltystepaway/loyaltystepaway.component';
import { LoyaltycongratComponent } from './components/newDesignScreens/loyaltycongrat/loyaltycongrat.component';
import { StudentoffersComponent } from './components/newDesignScreens/studentoffers/studentoffers.component';
import { DocumentsfieldsComponent } from './components/newDesignScreens/documentsfields/documentsfields.component';
import { StudentofferSectionComponent } from './components/newDesignScreens/studentoffer-section/studentoffer-section.component';
import { DailydropsComponent } from './components/newDesignScreens/dailydrops/dailydrops.component';
import { DailydropsSectionComponent } from './components/newDesignScreens/dailydrops-section/dailydrops-section.component';
import { PaymentSummmaryComponent } from './components/newDesignScreens/payment-summmary/payment-summmary.component';
import { NewDashboardComponent } from './components/newDesignScreens/new-dashboard/new-dashboard.component';
import { SidenavtabsComponent } from './components/newDesignScreens/sidenavtabs/sidenavtabs.component';
import { MatChipsModule } from '@angular/material/chips';
import { NewWalletComponent } from './components/newDesignScreens/new-wallet/new-wallet.component';
import { OrdersComponent } from './components/newDesignScreens/orders/orders.component';
import { OrderDetailsComponent } from './components/newDesignScreens/orders/order-details/order-details.component';
import { NewRecommendationComponent } from './components/newDesignScreens/new-recommendation/new-recommendation.component';
import { RecommendationsettingpageComponent } from './components/newDesignScreens/new-recommendation/recommendationsettingpage/recommendationsettingpage.component';

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    BottomSheetNotification,
    WelcomeComponent,
    BottomSheetUpdate,
    WalletComponent,
    ProfileComponent,
    SignComponent,
    DashboardComponent,
    CampaignComponent,
    InsightComponent,
    ContentComponent,
    CustomerComponent,
    StoreCreateComponent,
    CropperComponent,
    MerchanthowitworksComponent,
    KnowmoremerchantComponent,
    NewStoreComponent,
    BottomSheetOTP,
    NewLocationComponent,
    NewCampaignComponent,
    FundWalletComponent,
    AddProductComponent,
    PayComponent,
    ListOrderComponent,
    ListProductComponent,
    AddBalanceComponent,
    UploadProductComponent,
    OrdrPlacedComponent,
    PlanBalanceComponent,
    ShareAdvocacyComponent,
    ShareLoyaltyComponent,
    OrdrShipComponent,
    OrdrTrackComponent,
    NewCustomerComponent,
    AddBankComponent,
    DrawBalanceComponent,
    TestComponent,
    NotificationorderpopupComponent,
    LoyaltystepawayComponent,
    LoyaltycongratComponent,
    StudentoffersComponent,
    DocumentsfieldsComponent,
    StudentofferSectionComponent,
    DailydropsComponent,
    DailydropsSectionComponent,
    PaymentSummmaryComponent,
    NewDashboardComponent,
    SidenavtabsComponent,
    NewWalletComponent,
    OrdersComponent,
    OrderDetailsComponent,
    NewRecommendationComponent,
    RecommendationsettingpageComponent,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    FormsModule,
    ReactiveFormsModule,
    MatChipsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatProgressBarModule,
    MatDialogModule,
    MatBottomSheetModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    MatMenuModule,
    MatTabsModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatStepperModule,
    MatAutocompleteModule,
    MatSlideToggleModule,
    MatSidenavModule,
    MatDatepickerModule,
    MatNativeDateModule,


    // 3. Initialize
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    //provideFirestore(() => getFirestore()),
    provideFirestore(() => {
      const firestore = getFirestore();
      //connectFirestoreEmulator(firestore, 'localhost', 8080);
      enableIndexedDbPersistence(firestore);
      return firestore;
    }),
    provideAuth(() =>
      initializeAuth(getApp(), {
        persistence: indexedDBLocalPersistence,
        popupRedirectResolver: browserPopupRedirectResolver,
      })
    ),
    provideStorage(() => getStorage()),
    provideMessaging(() => getMessaging()),

    // 3. Initialize
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule, // firestore
    // AngularFireAuthModule, // auth
    // AngularFireStorageModule, // storage

    // provideAuth(() => {
    //   if (Capacitor.isNativePlatform()) {
    //     return initializeAuth(getApp(), {
    //       persistence: indexedDBLocalPersistence,
    //     });
    //   } else {
    //     return getAuth();
    //   }
    // }),

    Ng2GoogleChartsModule,
    GoogleMapsModule,
    ImageCropperModule,

    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
  ],
  providers: [
    {
      provide: MatDialogRef,
      useValue: {},
    },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' },
    SocialSharing,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
