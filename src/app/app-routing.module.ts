import { NgModule } from '@angular/core';
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
import { LoginComponent } from './components/commun/auth/login/login.component';
import { Error404Component } from './components/commun/errors/error404/error404.component';
import { Error500Component } from './components/commun/errors/error500/error500.component';
import { PostComponent } from './components/admin/pages/post/post.component';
import { authGuard } from './core/guards/auth.guard';
import { PostViewComponent } from './components/admin/pages/post-view/post-view.component';
import { AuthentificationComponent } from './components/commun/auth/authentification/authentification.component';
import { AddPostComponent } from './components/client/pages/add-post/add-post.component';
import { ClientContractsComponent } from './components/client/pages/client-contracts/client-contracts.component';
import { ClientIndexComponent } from './components/client/pages/client-index/client-index.component';
import { ClientInfosComponent } from './components/client/pages/client-infos/client-infos.component';
import { ClientPostsComponent } from './components/client/pages/client-posts/client-posts.component';
import { ClientProfileComponent } from './components/client/pages/client-profile/client-profile.component';
import { ClientSubscriptionsComponent } from './components/client/pages/client-subscriptions/client-subscriptions.component';
import { ClientViewFreelancersComponent } from './components/client/pages/client-view-freelancers/client-view-freelancers.component';
import { ConnectedLandingPageComponent } from './components/commun/connected-landing-page/connected-landing-page.component';
import { IndexComponent } from './components/commun/index/index.component';
import { ClientPostDetailsComponent } from './components/client/pages/client-post-details/client-post-details.component';
import { ClientViewFreelancerDetailsComponent } from './components/client/pages/client-view-freelancer-details/client-view-freelancer-details.component';
import { FreelancerViewPostDetailsComponent } from './components/freelancers/actions/freelancer-view-post-details/freelancer-view-post-details.component';
import { ContactUsComponent } from './components/commun/contact-us/contact-us.component';
import { FreelancerProfileComponent } from './components/freelancers/pages/freelancer-profile/freelancer-profile.component';
import { FreelancerViewPostsComponent } from './components/freelancers/pages/freelancer-view-posts/freelancer-view-posts.component';
import { FreelancerContractsComponent } from './components/freelancers/pages/freelancer-contracts/freelancer-contracts.component';
import { FreelancerIndexComponent } from './components/freelancers/pages/freelancer-index/freelancer-index.component';
import { FreelancerOffersComponent } from './components/freelancers/pages/freelancer-offers/freelancer-offers.component';

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
      { path: 'client-offer/:postId', component: ClientPostDetailsComponent },
      { path: 'viewPost/:itemId',component:PostViewComponent},
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' } 
    ]
  },
  


  
  {
    path: 'pulse',
    component: IndexComponent,
    canActivate:[authGuard],
    children: [
      { path: 'view-freelancers', component: ClientViewFreelancersComponent },
      { path: 'add-offer', component: AddPostComponent },
      { path: 'client-dashboard', component: ClientIndexComponent },
      // { path: 'client-profile', component: UserProfileComponent },
      { path: 'client-profile', component: ClientProfileComponent,
        children:
        [

          {path:'client-infos',component:ClientInfosComponent},
          {path:'client-offers',component:ClientPostsComponent},
          {path:'client-contracts',component:ClientContractsComponent},
          {path:'client-subscription',component:ClientSubscriptionsComponent},
          { path: '', redirectTo: 'client-infos', pathMatch: 'full' },
          
        ]
       },
      { path: 'client-offer/:postId', component: ClientPostDetailsComponent },
      { path: 'offers', component: FreelancerViewPostsComponent },
      { path: 'contact', component: ContactUsComponent },
      { path: 'home', component: ConnectedLandingPageComponent },
      {path:'view-freelancerprofile',component:ClientViewFreelancerDetailsComponent},
      {path:'freelancer-dashboard',component:FreelancerProfileComponent,
        children:
        [

          {path:'freelancer-offers',component:FreelancerOffersComponent},
          {path:'freelancer-contracts',component:FreelancerContractsComponent},
          { path: 'freelancer-profile', component: FreelancerIndexComponent },

          { path: '', redirectTo: 'freelancer-offers', pathMatch: 'full' },
          
        ]
      },
      { path: '**', redirectTo: 'home', pathMatch: 'full' } ,
    
    ]
  },

  

  //TO REVISITE
  {
    path: 'home',
    component: IndexComponent,
    children: [
      { path: 'pulse', component: ConnectedLandingPageComponent },
      { path: 'contact', component: ContactUsComponent },
    ]
  },


  { path: 'register', component: AuthentificationComponent },
  { path: 'login', component: LoginComponent },
  { path: 'page-notfound', component: Error404Component },
  { path: 'server-error', component: Error500Component },
  { path: '', redirectTo: 'home/pulse', pathMatch: 'full' },
  { path: '**', redirectTo: 'page-notfound', pathMatch: 'full' },

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
 
exports: [RouterModule]
})
export class AppRoutingModule { }
