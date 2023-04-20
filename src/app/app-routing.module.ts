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
import { SetupbusinessComponent } from './components/newDesignScreens/setupbusiness/setupbusiness.component';
import { ChooseprofileComponent } from './components/newDesignScreens/chooseprofile/chooseprofile.component';
import { ChooseStoreTypeComponent } from './components/newDesignScreens/choose-store-type/choose-store-type.component';
import { StoreDetailsComponent } from './components/newDesignScreens/store-details/store-details.component';
import { SetupAddressComponent } from './components/newDesignScreens/setup-address/setup-address.component';
import { StoreTimingComponent } from './components/newDesignScreens/store-timing/store-timing.component';
import { CongratulationpageComponent } from './components/newDesignScreens/congratulationpage/congratulationpage.component';
import { SetupguideComponent } from './components/newDesignScreens/setupguide/setupguide.component';
import { AddsuperpowerstoresComponent } from './components/newDesignScreens/addsuperpowerstores/addsuperpowerstores.component';

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
    path: 'setupbusiness',
    component: SetupbusinessComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'chooseprofile',
    component: ChooseprofileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'choosestore',
    component: ChooseStoreTypeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'storedetails',
    component: StoreDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setupaddress',
    component: SetupAddressComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'storetime',
    component: StoreTimingComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'congratspage',
    component: CongratulationpageComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'setupguide',
    component: SetupguideComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'addsuperpower',
    component: AddsuperpowerstoresComponent,
    canActivate: [AuthGuard],
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
