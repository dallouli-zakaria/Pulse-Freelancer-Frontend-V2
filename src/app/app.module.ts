import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminLeftbarComponent } from './components/admin/admin-layout/admin-leftbar/admin-leftbar.component';
import { AdminTopbarComponent } from './components/admin/admin-layout/admin-topbar/admin-topbar.component';
import { UserIndexComponent } from './components/user/user-index/user-index.component';
import { UserHeaderComponent } from './components/user/user-layout/user-header/user-header.component';
import { UserFooterComponent } from './components/user/user-layout/user-footer/user-footer.component';
import { UserAboutComponent } from './components/user/user-about/user-about.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthentificationComponent } from './components/auth/authentification/authentification.component';
import { UserViewFreelancersComponent } from './components/user/user-view-freelancers/user-view-freelancers.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { FreelancerProfileComponent } from './components/freelancer/freelancer-profile/freelancer-profile.component';
import { UserAddOfferComponent } from './components/user/user-add-offer/user-add-offer.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { Error404Component } from './components/errors/error404/error404.component';
import { Error500Component } from './components/errors/error500/error500.component';
import { UserContractComponent } from './components/user/user-contract/user-contract.component';
import { ViewOffersComponent } from './components/freelancer/view-offers/view-offers.component';
import { ApplyOfferComponent } from './components/freelancer/apply-offer/apply-offer.component';
import { ViewClientOfferComponent } from './components/user/view-client-offer/view-client-offer.component';
import { UserUpdateProfileComponent } from './components/user/user-update-profile/user-update-profile.component';
import { ContactUsComponent } from './components/user/contact-us/contact-us.component';
import { ViewOffersDetailsComponent } from './components/freelancer/view-offers-details/view-offers-details.component';
import { UserUpdateOfferComponent } from './components/user/user-update-offer/user-update-offer.component';
import { UserTestComponent } from './components/user/user-test/user-test.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AdminLeftbarComponent,
    AdminTopbarComponent,
    UserIndexComponent,
    UserHeaderComponent,
    UserFooterComponent,
    UserAboutComponent,
    UserHomeComponent,
    LoginComponent,
    AuthentificationComponent,
    UserViewFreelancersComponent,
    UserProfileComponent,
    FreelancerProfileComponent,
    UserAddOfferComponent,
    UserDashboardComponent,
  
    Error404Component,
    Error500Component,
    UserContractComponent,
    ViewOffersComponent,
    ApplyOfferComponent,
    ViewClientOfferComponent,
    UserUpdateProfileComponent,
    ContactUsComponent,
    ViewOffersDetailsComponent,
    UserUpdateOfferComponent,
    UserTestComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
