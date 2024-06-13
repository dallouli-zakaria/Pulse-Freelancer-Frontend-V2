import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminTopbarComponent } from './components/admin/admin-layout/admin-topbar/admin-topbar.component';
import { UserIndexComponent } from './components/user/user-index/user-index.component';
import { UserAboutComponent } from './components/user/user-about/user-about.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { AuthentificationComponent } from './components/auth/authentification/authentification.component';
import { UserViewFreelancersComponent } from './components/user/user-view-freelancers/user-view-freelancers.component';
import { FreelancerProfileComponent } from './components/freelancer/freelancer-profile/freelancer-profile.component';
import { UserAddOfferComponent } from './components/user/user-add-offer/user-add-offer.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { Error404Component } from './components/errors/error404/error404.component';
import { Error500Component } from './components/errors/error500/error500.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserContractComponent } from './components/user/user-contract/user-contract.component';
import { ViewOffersComponent } from './components/freelancer/view-offers/view-offers.component';
import { ViewClientOfferComponent } from './components/user/view-client-offer/view-client-offer.component';
import { ContactUsComponent } from './components/user/contact-us/contact-us.component';
import { ViewOffersDetailsComponent } from './components/freelancer/view-offers-details/view-offers-details.component';
import { UserTestComponent } from './components/user/user-test/user-test.component';

const routes: Routes = [
  {path:'admin',component:AdminDashboardComponent},
  {path:'top',component:AdminTopbarComponent},
  {path:'home',component:UserHomeComponent},
  {path:'about',component:UserAboutComponent},
  {path:'register',component:AuthentificationComponent},
  {path:'login',component:LoginComponent},
  {path:'view-freelancers',component:UserViewFreelancersComponent},
  {path:'freelancer-profile',component:FreelancerProfileComponent},
  {path:'add-offer',component:UserAddOfferComponent},
  {path:'client-dashboard',component:UserDashboardComponent},
  {path:'page-notfound',component:Error404Component},
  {path:'server-error',component:Error500Component},
  {path:'client-profile',component:UserProfileComponent},
  {path:'client-contracts',component:UserContractComponent},
  {path:'offers',component:ViewOffersComponent},
  {path:'client-offer',component:ViewClientOfferComponent},
  {path:'contact',component:ContactUsComponent},
  {path:'offer-details',component:ViewOffersDetailsComponent},
  {path:'test',component:UserTestComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
