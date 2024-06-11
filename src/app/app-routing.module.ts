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
  {path:'client-dashboard',component:UserDashboardComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
