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
import { IndexComponent } from './components/commun/index/index.component';
import { ClientPostDetailsComponent } from './components/client/pages/client-post-details/client-post-details.component';
import { ClientViewFreelancerDetailsComponent } from './components/client/pages/client-view-freelancer-details/client-view-freelancer-details.component';
import { ContactUsComponent } from './components/commun/contact-us/contact-us.component';
import { FreelancerContractsComponent } from './components/freelancer/pages/freelancer-contracts/freelancer-contracts.component';
import { FreelancerIndexComponent } from './components/freelancer/pages/freelancer-index/freelancer-index.component';
import { FreelancerOffersComponent } from './components/freelancer/pages/freelancer-offers/freelancer-offers.component';
import { FreelancerProfileComponent } from './components/freelancer/pages/freelancer-profile/freelancer-profile.component';
import { FreelancerViewPostsComponent } from './components/freelancer/pages/freelancer-view-posts/freelancer-view-posts.component';
import { PackComponent } from './components/admin/pages/pack/pack.component';
import { ConnectedLandingPageComponent } from './components/commun/connected-landing-page/connected-landing-page.component';
import { EmailVerifyComponent } from './components/commun/auth/email-verify/email-verify.component';
import { WishlistComponent } from './components/client/pages/wishlist/wishlist.component';
import { PostRegiterComponent } from './components/commun/auth/post-regiter/post-regiter.component';
import { ClientPayementComponent } from './components/client/pages/client-payement/client-payement.component';
import { ResetPasswordComponentComponent } from './components/commun/auth/reset-password-component/reset-password-component.component';
import { ForgetPAsswordComponent } from './components/commun/auth/forget-password/forget-password.component';


const routes: Routes = [

  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate:[authGuard],data: { roles: ['superadmin_role'] },
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
      { path: 'post-open',component:PostComponent},
      { path: 'post-waiting',component:PostComponent},
      { path: 'post-closed',component:PostComponent},
      { path: 'client-offer/:postId', component: ClientPostDetailsComponent },
      { path: 'viewPost/:itemId',component:PostViewComponent},
      { path: 'pack', component:PackComponent},
      { path: '**', redirectTo: 'dashboard', pathMatch: 'full' } 
    ]
  },
  {
    path: 'reset-password',
    component: ResetPasswordComponentComponent
  },

  {
    path: 'forget-password',
    component:ForgetPAsswordComponent
  },
  
  {
    path: 'pulse',
    component: IndexComponent,
    
    children: [
      { path: 'view-freelancers', component: ClientViewFreelancersComponent,canActivate:[authGuard],data: { roles: ['Client'] } },
      { path: 'add-offer', component: AddPostComponent,canActivate:[authGuard],data: { roles: ['Client'] } },
      { path: 'client-dashboard', component: ClientIndexComponent,canActivate:[authGuard],data: { roles: ['Client'] } },
      { path: 'payement', component: ClientPayementComponent,canActivate:[authGuard],data: { roles: ['Client'] } },
      // { path: 'client-profile', component: UserProfileComponent },
      { path: 'client-profile', component: ClientProfileComponent,
        children:
        [

          {path:'client-infos',component:ClientInfosComponent,canActivate:[authGuard],data: { roles: ['Client'] }},
          {path:'client-wishlist',component:WishlistComponent,canActivate:[authGuard],data: { roles: ['Client'] }},
          {path:'client-offers-open',component:ClientPostsComponent,canActivate:[authGuard],data: { roles: ['Client'] }},
          {path:'client-offers-waiting',component:ClientPostsComponent,canActivate:[authGuard],data: { roles: ['Client'] }},
          {path:'client-offers-closed',component:ClientPostsComponent,canActivate:[authGuard],data: { roles: ['Client'] }},

          {path:'client-contracts',component:ClientContractsComponent,canActivate:[authGuard],data: { roles: ['Client'] }},
          {path:'client-subscription',component:ClientSubscriptionsComponent,canActivate:[authGuard],data: { roles: ['Client'] }},
          { path: '', redirectTo: 'client-infos', pathMatch: 'full' },
          
        ]
       },
      { path: 'client-offer/:postId', component: ClientPostDetailsComponent,canActivate:[authGuard],data: { roles: ['Client','Freelancer'] } },
      { path: 'offers', component: FreelancerViewPostsComponent,canActivate:[authGuard],data: { roles: ['Freelancer'] } },
      { path: 'contact', component: ContactUsComponent,canActivate:[authGuard] },
      {path:'view-freelancerprofile/:freelancerId',component:ClientViewFreelancerDetailsComponent,canActivate:[authGuard],data: { roles: ['Client'] }},
      {path:'freelancer-dashboard',component:FreelancerProfileComponent,
        children:
        [

          //{path:'freelancer-offers',component:FreelancerOffersComponent,canActivate:[authGuard],data: { roles: ['Freelancer'] } },
          {path:'freelancer-offers-open',component:FreelancerOffersComponent,canActivate:[authGuard],data: { roles: ['Freelancer'] }},
          {path:'freelancer-offers-waiting',component:FreelancerOffersComponent,canActivate:[authGuard],data: { roles: ['Freelancer'] }},
          {path:'freelancer-offers-closed',component:FreelancerOffersComponent,canActivate:[authGuard],data: { roles: ['Freelancer'] }},
          {path:'freelancer-contracts',component:FreelancerContractsComponent,canActivate:[authGuard],data: { roles: ['Freelancer'] } },
          { path: 'freelancer-profile', component: FreelancerIndexComponent ,canActivate:[authGuard],data: { roles: ['Freelancer'] } },
          { path: '', redirectTo: 'freelancer-profile', pathMatch: 'full' }
          
        ]
      },
      { path: '**', redirectTo: '/', pathMatch: 'full' } ,
    
    ]
  },

  

  //TO REVISITE
  {
    path: 'home',
    component: IndexComponent,
    children: [
      { path: '', redirectTo: 'pulse', pathMatch: 'full' },
      { path: 'pulse', component: ConnectedLandingPageComponent },
      { path: 'contact', component: ContactUsComponent },
    ]
  },

  { path: 'register', component: PostRegiterComponent },
  { path: 'register/client', component: AuthentificationComponent },
  { path: 'register/freelancer', component: AuthentificationComponent },
  { path: 'email',component:EmailVerifyComponent},
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
