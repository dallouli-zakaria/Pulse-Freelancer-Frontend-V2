import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { DashboardComponent } from './components/admin/pages/dashboard/dashboard.component';
import { ClientComponent } from './components/admin/pages/client/client.component';
import { FreelancerComponent } from './components/admin/pages/freelancer/freelancer.component';
import { AdminComponent } from './components/admin/pages/admin/admin.component';
import { RoleComponent } from './components/admin/pages/role/role.component';
import { PermissionComponent } from './components/admin/pages/permission/permission.component';
import { ContractComponent } from './components/admin/pages/contract/contract.component';
import { OfferComponent } from './components/admin/pages/offer/offer.component';
import { MailingComponent } from './components/admin/pages/mailing/mailing.component';
import { UsersComponent } from './components/admin/pages/users/users.component';
import { UserIndexComponent } from './components/user/user-index/user-index.component';
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
import { ViewOffersComponent } from './components/freelancer/view-offers/view-offers.component';
import { ViewClientOfferComponent } from './components/user/view-client-offer/view-client-offer.component';
import { ContactUsComponent } from './components/user/contact-us/contact-us.component';
import { UserOffersComponent } from './components/user/user-profile/user-offers/user-offers.component';
import { UsercontractsComponent } from './components/user/user-profile/usercontracts/usercontracts.component';
import { UserinfosComponent } from './components/user/user-profile/userinfos/userinfos.component';
import { UsersubscriptionsComponent } from './components/user/user-profile/usersubscriptions/usersubscriptions.component';
import { UserViewfreelancersProfileComponent } from './components/user/user-viewfreelancers-profile/user-viewfreelancers-profile.component';
import { FreelancerDashboardComponent } from './components/freelancer/freelancer-profile/freelancer-dashboard/freelancer-dashboard.component';
import { FreelancerOffersComponent } from './components/freelancer/freelancer-profile/freelancer-dashboard/freelancer-offers/freelancer-offers.component';
import { FreelancerContractsComponent } from './components/freelancer/freelancer-profile/freelancer-dashboard/freelancer-contracts/freelancer-contracts.component';
import { PostComponent } from './components/admin/pages/post/post.component';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

const routes: Routes = [

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate:[authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'admin', component: AdminComponent },
      { path: 'mailing', component: MailingComponent },
      { path: 'role', component: RoleComponent },
      { path: 'permission', component: PermissionComponent },
      { path: 'offer', component: OfferComponent },
      { path: 'freelancer', component: FreelancerComponent },
      { path: 'client', component: ClientComponent },
      { path: 'users', component: UsersComponent },
      { path: 'contract', component: ContractComponent },
      { path: 'post',component:PostComponent},
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' } 
    ]
  },
  


  
  {
    path: 'pulse',
    component: UserIndexComponent,
    canActivate:[authGuard],
    children: [
      { path: 'view-freelancers', component: UserViewFreelancersComponent },
      { path: 'add-offer', component: UserAddOfferComponent },
      { path: 'client-dashboard', component: UserDashboardComponent },
      // { path: 'client-profile', component: UserProfileComponent },
      { path: 'client-profile', component: UserProfileComponent,
        children:
        [

          {path:'client-infos',component:UserinfosComponent},
          {path:'client-offers',component:UserOffersComponent},
          {path:'client-contracts',component:UsercontractsComponent},
          {path:'client-subscription',component:UsersubscriptionsComponent},
          { path: '', redirectTo: 'client-infos', pathMatch: 'full' },
          
        ]
       },
      { path: 'client-offer/:postId', component: ViewClientOfferComponent },
      { path: 'offers', component: ViewOffersComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'home', component: UserHomeComponent },
      {path:'view-freelancerprofile',component:UserViewfreelancersProfileComponent},
      {path:'freelancer-dashboard',component:FreelancerDashboardComponent,
        children:
        [

          {path:'freelancer-offers',component:FreelancerOffersComponent},
          {path:'freelancer-contracts',component:FreelancerContractsComponent},
          { path: 'freelancer-profile', component: FreelancerProfileComponent },

          { path: '', redirectTo: 'freelancer-offers', pathMatch: 'full' },
          
        ]
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' } ,
    
    ]
  },

  

  //TO REVISITE
  {
    path: 'home',
    component: UserIndexComponent,
    children: [
      { path: 'pulse', component: UserHomeComponent },
      { path: 'contact', component: ContactUsComponent },
    ]
  },


  { path: 'register', component: AuthentificationComponent },
  { path: 'login', component: LoginComponent },
  //{ path: 'page-notfound', component: Error404Component },
  { path: 'server-error', component: Error500Component },
  { path: '', redirectTo: 'home/pulse', pathMatch: 'full' },
  { path: '**', redirectTo: 'page-notfound', pathMatch: 'full' },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
 
exports: [RouterModule]
})
export class AppRoutingModule { }
