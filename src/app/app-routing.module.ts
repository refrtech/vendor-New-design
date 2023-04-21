import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/tabs/dashboard/dashboard.component';
import { ProfileComponent } from './components/tabs/profile/profile.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { WalletComponent } from './components/tabs/wallet/wallet.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { InsightComponent } from './components/tabs/insight/insight.component';
import { CampaignComponent } from './components/tabs/campaign/campaign.component';
import { AuthGuard } from './guards/auth.guard';
import { CustomerComponent } from './components/tabs/customer/customer.component';
import { StoreCreateComponent } from './components/store-create/store-create.component';
import { NewLocationComponent } from './components/store-create/new-location/new-location.component';
import { NewStoreComponent } from './components/store-create/new-store/new-store.component';
import { NewCampaignComponent } from './components/store-create/new-campaign/new-campaign.component';
import { FundWalletComponent } from './components/store-create/fund-wallet/fund-wallet.component';
import { AddProductComponent } from './components/store-create/add-product/add-product.component';
import { ListOrderComponent } from './components/tabs/list-order/list-order.component';
import { ListProductComponent } from './components/tabs/list-product/list-product.component';
import { TestComponent } from './placeholders/test/test.component';
import { MerchanthowitworksComponent } from './components/tabs/dashboard/merchanthowitworks/merchanthowitworks.component';
import { KnowmoremerchantComponent } from './components/tabs/dashboard/merchanthowitworks/knowmoremerchant/knowmoremerchant.component';

const routes: Routes = [
  { path: '', component: WelcomeComponent },
  { path: 'test', component: TestComponent },
  {
    path: '',
    component: TabsComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/dash', pathMatch: 'full' },
      { path: 'dash', component: DashboardComponent, canActivate: [AuthGuard] },
      {
        path: 'dashHIW',
        component: MerchanthowitworksComponent,
        canActivate: [AuthGuard],
      },
      { path: 'knowmore/:id', component: KnowmoremerchantComponent },
      {
        path: 'customer',
        component: CustomerComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'campaign',
        component: CampaignComponent,
        canActivate: [AuthGuard],
      },
      { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard] },
      {
        path: 'wallet/:campID',
        component: WalletComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'insight',
        component: InsightComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'profile',
        component: ProfileComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'my-order-list',
        component: ListOrderComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'my-inventory',
        component: ListProductComponent,
        canActivate: [AuthGuard],
      },
      { path: 'dash', redirectTo: '', pathMatch: 'full' },
    ],
  },

  {
    path: 'store',
    component: StoreCreateComponent,
    children: [
      //{path:'', redirectTo:'/create-location', pathMatch:"full" },
      {
        path: 'create-location',
        component: NewStoreComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-location',
        component: NewLocationComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'create-campaign',
        component: NewCampaignComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'fund-wallet/:campID',
        component: FundWalletComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'add-product',
        component: AddProductComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  //{path:'store/:what', component: StoreCreateComponent, canActivate: [AuthGuard] },

  // new design

   {
    path: 'choosestoretype',
    loadChildren: () =>
      import(
        './components/newDesignScreens/choose-store-type/choose-store-type-module/choose-store-type-module.module'
      ).then((m) => {return m.ChooseStoreTypeModuleModule}),
  },
  {
    path: 'chooseprofile',
    loadChildren: () =>
      import(
        './components/newDesignScreens/chooseprofile/chooseprofile-module/chooseprofile-module.module'
      ).then((m) => m.ChooseprofileModuleModule),
  },
  {
    path: 'CPC',
    loadChildren: () =>
      import(
        './components/newDesignScreens/cpc/cpc-module/cpc-module.module'
      ).then((m) => m.CPCModuleModule),
  },
  {
    path: 'Setupaddress',
    loadChildren: () =>
      import(
        './components/newDesignScreens/setup-address/setup-address-module/setup-address-module.module'
      ).then((m) => m.SetupAddressModuleModule),
  },
  {
    path: 'setupbusiness',
    loadChildren: () =>
      import(
        './components/newDesignScreens/setupbusiness/setupbusiness-module/setupbusiness-module.module'
      ).then((m) => m.SetupbusinessModuleModule),
  },
  {
    path: 'setupdetails',
    loadChildren: () =>
      import(
        './components/newDesignScreens/store-details/store-details-module/store-details-module.module'
      ).then((m) => m.StoreDetailsModuleModule),
  },
  {
    path: 'storetiming',
    loadChildren: () =>
      import(
        './components/newDesignScreens/store-timing/store-timing-module/store-timing-module.module'
      ).then((m) => m.StoreTimingModuleModule),
  },

  {
    path: 'setupguide',
    loadChildren: () =>
      import(
        './components/newDesignScreens/setupguide/setupguide-module/setupguide-module.module'
      ).then((m) => m.SetupguideModuleModule),
  },

  {
    path: 'congratulation',
    loadChildren: () =>
      import(
        './components/newDesignScreens/congratulationpage/congratulation-module/congratulation-module.module'
      ).then((m) => m.CongratulationModuleModule),
  },

  {
    path: 'addsuperpowerstore',
    loadChildren: () =>
      import(
        './components/newDesignScreens/addsuperpowerstores/addsuperpowerstores-module/addsuperpowerstores-module.module'
      ).then((m) => m.AddsuperpowerstoresModuleModule),
  },

  {
    path: 'recommendation_CPC',
    loadChildren: () =>
      import(
        './components/newDesignScreens/recommendation-cpc/recommendation-cpc-module/recommendation-cpc-module.module'
      ).then((m) => m.RecommendationCPCModuleModule),
  },


  {
    path: 'recommendationMsg_CPC',
    loadChildren: () =>
      import(
        './components/newDesignScreens/cpc-message-preview/cpcmessagepreview-model/cpcmessagepreview-model.module'
      ).then((m) => m.CpcmessagepreviewModelModule),
  },


  { path: 'welcome', component: WelcomeComponent },
  { path: '404', component: WelcomeComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
