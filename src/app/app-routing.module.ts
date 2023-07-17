import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { AuthGuard } from './guards/auth.guard';
import { StoreCreateComponent } from './components/store-create/store-create.component';
import { NewLocationComponent } from './components/store-create/new-location/new-location.component';
import { NewStoreComponent } from './components/store-create/new-store/new-store.component';
import { NewCampaignComponent } from './components/store-create/new-campaign/new-campaign.component';
import { FundWalletComponent } from './components/store-create/fund-wallet/fund-wallet.component';
import { AddProductComponent } from './components/store-create/add-product/add-product.component';
import { TestComponent } from './placeholders/test/test.component';
import { LoyaltystepawayComponent } from './components/newDesignScreens/loyaltystepaway/loyaltystepaway.component';
import { LoyaltycongratComponent } from './components/newDesignScreens/loyaltycongrat/loyaltycongrat.component';
import { StudentoffersComponent } from './components/newDesignScreens/studentoffers/studentoffers.component';
import { DocumentsfieldsComponent } from './components/newDesignScreens/documentsfields/documentsfields.component';
import { StudentofferSectionComponent } from './components/newDesignScreens/studentoffer-section/studentoffer-section.component';
import { DailydropsComponent } from './components/newDesignScreens/dailydrops/dailydrops.component';
import { DailydropsSectionComponent } from './components/newDesignScreens/dailydrops-section/dailydrops-section.component';
import { PaymentSummmaryComponent } from './components/newDesignScreens/payment-summmary/payment-summmary.component';
import { SidenavtabsComponent } from './components/newDesignScreens/sidenavtabs/sidenavtabs.component';
import { NewDashboardComponent } from './components/newDesignScreens/new-dashboard/new-dashboard.component';
import { NewCustomerComponent } from './components/newDesignScreens/new-customer/new-customer.component';
import { TabsComponent } from './components/tabs/tabs.component';
import { DashboardComponent } from './components/tabs/dashboard/dashboard.component';
import { MerchanthowitworksComponent } from './components/tabs/dashboard/merchanthowitworks/merchanthowitworks.component';
import { KnowmoremerchantComponent } from './components/tabs/dashboard/merchanthowitworks/knowmoremerchant/knowmoremerchant.component';
import { CustomerComponent } from './components/tabs/customer/customer.component';
import { CampaignComponent } from './components/tabs/campaign/campaign.component';
import { WalletComponent } from './components/tabs/wallet/wallet.component';
import { InsightComponent } from './components/tabs/insight/insight.component';
import { ProfileComponent } from './components/tabs/profile/profile.component';
import { ListOrderComponent } from './components/tabs/list-order/list-order.component';
import { ListProductComponent } from './components/tabs/list-product/list-product.component';
import { StoresettingComponent } from './components/tabs/storesetting/storesetting.component';

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
        path: 'questions',
        component: StoresettingComponent,
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

  // {
  //   path: '',
  //   component: TabsComponent,
  //   canActivate: [AuthGuard],
  //   children: [
  //     { path: '', redirectTo: '/dash', pathMatch: 'full' },
  //     { path: 'dash', component: DashboardComponent, canActivate: [AuthGuard] },
  //     {
  //       path: 'dashHIW',
  //       component: MerchanthowitworksComponent,
  //       canActivate: [AuthGuard],
  //     },
  //     { path: 'knowmore/:id', component: KnowmoremerchantComponent },
  //     {
  //       path: 'customer',
  //       component: CustomerComponent,
  //       canActivate: [AuthGuard],
  //     },
  //     {
  //       path: 'campaign',
  //       component: CampaignComponent,
  //       canActivate: [AuthGuard],
  //     },
  //     { path: 'wallet', component: WalletComponent, canActivate: [AuthGuard] },
  //     {
  //       path: 'wallet/:campID',
  //       component: WalletComponent,
  //       canActivate: [AuthGuard],
  //     },
  //     {
  //       path: 'insight',
  //       component: InsightComponent,
  //       canActivate: [AuthGuard],
  //     },
  //     {
  //       path: 'profile',
  //       component: ProfileComponent,
  //       canActivate: [AuthGuard],
  //     },
  //     {
  //       path: 'my-order-list',
  //       component: ListOrderComponent,
  //       canActivate: [AuthGuard],
  //     },
  //     {
  //       path: 'my-inventory',
  //       component: ListProductComponent,
  //       canActivate: [AuthGuard],
  //     },
  //     { path: 'dash', redirectTo: '', pathMatch: 'full' },
  //   ],
  // },

  {
    path: '',
    component: SidenavtabsComponent,
    children: [
      { path: '', redirectTo: '/dash', pathMatch: 'full' },
      { path: 'dash', component: NewDashboardComponent },
      {
        path: 'New_wallet',
        loadChildren: () =>
          import(
            './components/newDesignScreens/new-wallet/newwalletmodules/newwalletmodules.module'
          ).then((m) => m.NewwalletmodulesModule),
      },
      {
        path: 'New_recomm',
        loadChildren: () =>
          import(
            './components/newDesignScreens/new-recommendation/newrecommendationmodule/newrecommendationmodule.module'
          ).then((m) => m.NewrecommendationmoduleModule),
      },
      {
        path: 'New_orders',
        loadChildren: () =>
          import(
            './components/newDesignScreens/orders/orders/orders-routing.module'
          ).then((m) => m.OrdersRoutingModule),
      },

      {
        path: 'New_setting',
        loadChildren: () =>
          import(
            './components/newDesignScreens/storesetting/setting-module/setting-module.module'
          ).then((m) => m.SettingModuleModule),
      },

      {
        path: 'New_cust',
        component: NewCustomerComponent,
      },
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
    loadChildren: () =>
      import(
        './components/newDesignScreens/setupbusiness/setupbusiness-module/setupbusiness-module.module'
      ).then((m) => m.SetupbusinessModuleModule),
  },

  {
    path: 'chooseprofile',
    loadChildren: () =>
      import(
        './components/newDesignScreens/chooseprofile/chooseprofile-module/chooseprofile-module.module'
      ).then((m) => m.ChooseprofileModuleModule),
  },

  {
    path: 'choosestoretype',
    loadChildren: () =>
      import(
        './components/newDesignScreens/choose-store-type/choose-store-type-module/choose-store-type-module.module'
      ).then((m) => {
        return m.ChooseStoreTypeModuleModule;
      }),
  },

  {
    path: 'CPC',
    loadChildren: () =>
      import(
        './components/newDesignScreens/cpc/cpc-module/cpc-module.module'
      ).then((m) => m.CPCModuleModule),
  },

  {
    path: 'CPC_Conversion',
    loadChildren: () =>
      import(
        './components/newDesignScreens/cpc-conversion/cpc-conversion-module/cpc-conversion-module.module'
      ).then((m) => m.CpcConversionModuleModule),
  },
  {
    path: 'Setupaddress',
    loadChildren: () =>
      import(
        './components/newDesignScreens/setup-address/setup-address-module/setup-address-module.module'
      ).then((m) => m.SetupAddressModuleModule),
  },

  {
    path: 'storedetails',
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
    path: 'loyaltyform',
    loadChildren: () =>
      import(
        './components/newDesignScreens/loyaltyform/loyal-form-modules/loyal-form-modules.module'
      ).then((m) => m.LoyalFormModulesModule),
  },

  { path: 'loyaltysteps', component: LoyaltystepawayComponent },

  {
    path: 'recommendationMsg_CPC',
    loadChildren: () =>
      import(
        './components/newDesignScreens/recommendation-cpc/recommendation-cpc-module/recommendation-cpc-module.module'
      ).then((m) => m.RecommendationCPCModuleModule),
  },
  {
    path: 'recommendationMsgPreview_CPC',
    loadChildren: () =>
      import(
        './components/newDesignScreens/cpc-message-preview/cpcmessagepreview-model/cpcmessagepreview-model.module'
      ).then((m) => m.CpcmessagepreviewModelModule),
  },
  {
    path: 'addProducts',
    loadChildren: () =>
      import(
        './components/newDesignScreens/add-products-section/products-module/products-module.module'
      ).then((m) => m.ProductsModuleModule),
  },

  { path: 'loyaltycongrats', component: LoyaltycongratComponent },

  { path: 'studentoffers', component: StudentoffersComponent },
  { path: 'studentofferssection', component: StudentofferSectionComponent },

  { path: 'documents', component: DocumentsfieldsComponent },

  { path: 'dailydrops', component: DailydropsComponent },
  { path: 'dailydropssection', component: DailydropsSectionComponent },

  { path: 'paymentsummary', component: PaymentSummmaryComponent },

  { path: 'welcome', component: WelcomeComponent },
  { path: '404', component: WelcomeComponent },
  { path: '**', redirectTo: '/404' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
