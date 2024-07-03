import { NgModule } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminLeftbarComponent } from './components/admin/admin-layout/admin-leftbar/admin-leftbar.component';
import { AdminTopbarComponent } from './components/admin/admin-layout/admin-topbar/admin-topbar.component';
import { provideHttpClient } from '@angular/common/http';
import { AdminAddComponent } from './components/admin/buttons/add/admin-add/admin-add.component';
import { ClientAddComponent } from './components/admin/buttons/add/client-add/client-add.component';
import { ContractAddComponent } from './components/admin/buttons/add/contract-add/contract-add.component';
import { FreelancerAddComponent } from './components/admin/buttons/add/freelancer-add/freelancer-add.component';
import { PermissionAddComponent } from './components/admin/buttons/add/permission-add/permission-add.component';
import { RoleAddComponent } from './components/admin/buttons/add/role-add/role-add.component';
import { AdminDeleteComponent } from './components/admin/buttons/delete/admin-delete/admin-delete.component';
import { ClientDeleteComponent } from './components/admin/buttons/delete/client-delete/client-delete.component';
import { ContractDeleteComponent } from './components/admin/buttons/delete/contract-delete/contract-delete.component';
import { FreelancerDeleteComponent } from './components/admin/buttons/delete/freelancer-delete/freelancer-delete.component';
import { PermissionDeleteComponent } from './components/admin/buttons/delete/permission-delete/permission-delete.component';
import { RoleDeleteComponent } from './components/admin/buttons/delete/role-delete/role-delete.component';
import { UsersDeleteComponent } from './components/admin/buttons/delete/users-delete/users-delete.component';
import { RoleDetailsComponent } from './components/admin/buttons/details/role-details/role-details.component';
import { UserDetailsComponent } from './components/admin/buttons/details/user-details/user-details.component';
import { AdminEditComponent } from './components/admin/buttons/edit/admin-edit/admin-edit.component';
import { ClientEditComponent } from './components/admin/buttons/edit/client-edit/client-edit.component';
import { ContractEditComponent } from './components/admin/buttons/edit/contract-edit/contract-edit.component';
import { FreelancerEditComponent } from './components/admin/buttons/edit/freelancer-edit/freelancer-edit.component';
import { PermissionEditComponent } from './components/admin/buttons/edit/permission-edit/permission-edit.component';
import { RoleEditComponent } from './components/admin/buttons/edit/role-edit/role-edit.component';
import { UsersEditComponent } from './components/admin/buttons/edit/users-edit/users-edit.component';
import { ClientCartComponent } from './components/admin/carts/client-cart/client-cart.component';
import { ContractCartComponent } from './components/admin/carts/contract-cart/contract-cart.component';
import { FreelancerCartComponent } from './components/admin/carts/freelancer-cart/freelancer-cart.component';
import { OfferCartComponent } from './components/admin/carts/offer-cart/offer-cart.component';
import { AdminComponent } from './components/admin/pages/admin/admin.component';
import { ClientComponent } from './components/admin/pages/client/client.component';
import { ContractComponent } from './components/admin/pages/contract/contract.component';
import { DashboardComponent } from './components/admin/pages/dashboard/dashboard.component';
import { FreelancerComponent } from './components/admin/pages/freelancer/freelancer.component';
import { MailingComponent } from './components/admin/pages/mailing/mailing.component';
import { OfferComponent } from './components/admin/pages/offer/offer.component';
import { PermissionComponent } from './components/admin/pages/permission/permission.component';
import { RoleComponent } from './components/admin/pages/role/role.component';
import { UsersComponent } from './components/admin/pages/users/users.component';
import { AdminTableComponent } from './components/admin/table/admin-table/admin-table.component';
import { ClientTableComponent } from './components/admin/table/client-table/client-table.component';
import { ContractTableComponent } from './components/admin/table/contract-table/contract-table.component';
import { FreelancerTableComponent } from './components/admin/table/freelancer-table/freelancer-table.component';
import { OfferTableComponent } from './components/admin/table/offer-table/offer-table.component';
import { PermissionTableComponent } from './components/admin/table/permission-table/permission-table.component';
import { RoleTableComponent } from './components/admin/table/role-table/role-table.component';
import { UsersTableComponent } from './components/admin/table/users-table/users-table.component';
import { ViewOffersDetailsComponent } from './components/freelancer/view-offers-details/view-offers-details.component';
import { AuthentificationComponent } from './components/auth/authentification/authentification.component';
import { LoginComponent } from './components/auth/login/login.component';
import { Error404Component } from './components/errors/error404/error404.component';
import { Error500Component } from './components/errors/error500/error500.component';
import { ApplyOfferComponent } from './components/freelancer/apply-offer/apply-offer.component';
import { FreelancerProfileComponent } from './components/freelancer/freelancer-profile/freelancer-profile.component';
import { ViewOffersComponent } from './components/freelancer/view-offers/view-offers.component';
import { ContactUsComponent } from './components/user/contact-us/contact-us.component';
import { UserAddOfferComponent } from './components/user/user-add-offer/user-add-offer.component';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { UserHomeComponent } from './components/user/user-home/user-home.component';
import { UserIndexComponent } from './components/user/user-index/user-index.component';
import { UserFooterComponent } from './components/user/user-layout/user-footer/user-footer.component';
import { UserHeaderComponent } from './components/user/user-layout/user-header/user-header.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UserUpdateOfferComponent } from './components/user/user-update-offer/user-update-offer.component';
import { UserUpdateProfileComponent } from './components/user/user-update-profile/user-update-profile.component';
import { UserViewFreelancersComponent } from './components/user/user-view-freelancers/user-view-freelancers.component';
import { ViewClientOfferComponent } from './components/user/view-client-offer/view-client-offer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserContractDownloadComponent } from './components/user/user-contract-download/user-contract-download.component';
import { UserSideprofileComponent } from './components/user/user-profile/user-sideprofile/user-sideprofile.component';
import { UserOffersComponent } from './components/user/user-profile/user-offers/user-offers.component';
import { UsercontractsComponent } from './components/user/user-profile/usercontracts/usercontracts.component';
import { UserinfosComponent } from './components/user/user-profile/userinfos/userinfos.component';
import { UsersubscriptionsComponent } from './components/user/user-profile/usersubscriptions/usersubscriptions.component';
import { UserUpdatecompanyComponent } from './components/user/user-updatecompany/user-updatecompany.component';
import { UserViewfreelancersProfileComponent } from './components/user/user-viewfreelancers-profile/user-viewfreelancers-profile.component';
import { FreelancerSideprofileComponent } from './components/freelancer/freelancer-profile/freelancer-sideprofile/freelancer-sideprofile.component';
import { FreelancerExperienceComponent } from './components/freelancer/freelancer-profile/freelancer-experience/freelancer-experience.component';
import { FreelancerProjectsComponent } from './components/freelancer/freelancer-profile/freelancer-projects/freelancer-projects.component';
import { FreelancerSkillsComponent } from './components/freelancer/freelancer-profile/freelancer-skills/freelancer-skills.component';
import { FreelancerAboutComponent } from './components/freelancer/freelancer-profile/freelancer-about/freelancer-about.component';
import { FreelancerDashboardComponent } from './components/freelancer/freelancer-profile/freelancer-dashboard/freelancer-dashboard.component';
import { FreelancerOffersComponent } from './components/freelancer/freelancer-profile/freelancer-dashboard/freelancer-offers/freelancer-offers.component';
import { FreelancerContractsComponent } from './components/freelancer/freelancer-profile/freelancer-dashboard/freelancer-contracts/freelancer-contracts.component';
import { FreelancerUpdateAboutComponent } from './components/freelancer/freelancer-profile/freelancer-about/freelancer-update-about/freelancer-update-about.component';
import { FreelancerAddExperienceComponent } from './components/freelancer/freelancer-profile/freelancer-experience/freelancer-add-experience/freelancer-add-experience.component';
import { FreelancerUpdateExperienceComponent } from './components/freelancer/freelancer-profile/freelancer-experience/freelancer-update-experience/freelancer-update-experience.component';
import { UpdateFreelancerPersonalInfosComponent } from './components/freelancer/freelancer-profile/freelancer-sideprofile/update-freelancer-personal-infos/update-freelancer-personal-infos.component';
import { FreelancerAddSkillsComponent } from './components/freelancer/freelancer-profile/freelancer-skills/freelancer-add-skills/freelancer-add-skills.component';
import { FreelancerUpdateSkillsComponent } from './components/freelancer/freelancer-profile/freelancer-skills/freelancer-update-skills/freelancer-update-skills.component';
import { SkeletonComponent } from './components/user/skeleton/skeleton.component';
import { TimeAgoPipe } from './core/pipes/time-ago.pipe';
import { AuthService } from './core/services/auth.service';
import { PostCartComponent } from './components/admin/carts/post-cart/post-cart.component';
import { PostTableComponent } from './components/admin/table/post-table/post-table.component';
import { PostComponent } from './components/admin/pages/post/post.component';
import { PostAddComponent } from './components/admin/buttons/add/post-add/post-add.component';
import { PostEditComponent } from './components/admin/buttons/edit/post-edit/post-edit.component';
import { PostDeleteComponent } from './components/admin/buttons/delete/post-delete/post-delete.component';








@NgModule({
  declarations: [
    AppComponent,
    AdminDashboardComponent,
    AdminLeftbarComponent,
    AdminTopbarComponent,
    AdminTableComponent,
    FreelancerCartComponent,
    ClientCartComponent,
    DashboardComponent,
  
    ContractCartComponent,
          OfferCartComponent,
          AdminComponent,
          ClientComponent,
          FreelancerComponent,
          RoleComponent,
          PermissionComponent,
          ContractComponent,
          OfferComponent,
          ClientTableComponent,
          FreelancerTableComponent,
          ContractTableComponent,
          OfferTableComponent,
          RoleTableComponent,
          PermissionTableComponent,
          AdminEditComponent,
          ClientEditComponent,
          FreelancerEditComponent,
          AdminDeleteComponent,
          ClientDeleteComponent,
          AdminAddComponent,
          FreelancerDeleteComponent,
          ClientAddComponent,
          FreelancerAddComponent,
          MailingComponent,
          ContractAddComponent,
          ContractDeleteComponent,
          ContractEditComponent,
          UsersComponent,
          UsersTableComponent,
          UsersEditComponent,
          UsersDeleteComponent,
          UserDetailsComponent,
          RoleDeleteComponent,
          PermissionDeleteComponent,
          RoleEditComponent,
          PermissionEditComponent,
          RoleAddComponent,
          PermissionAddComponent,
          RoleDetailsComponent,
          ViewOffersDetailsComponent,
          AppComponent,
          AdminDashboardComponent,
          AdminLeftbarComponent,
          AdminTopbarComponent,
          UserIndexComponent,
          UserHeaderComponent,
          UserFooterComponent,
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
          
          ViewOffersComponent,
          ApplyOfferComponent,
          ViewClientOfferComponent,
          UserUpdateProfileComponent,
          ContactUsComponent,
          ViewOffersDetailsComponent,
          UserUpdateOfferComponent,
          
          UserContractDownloadComponent,
          
          UserSideprofileComponent,
          UserOffersComponent,
          UsercontractsComponent,
          UserinfosComponent,
          UsersubscriptionsComponent,
          UserUpdatecompanyComponent,
          UserViewfreelancersProfileComponent,
          FreelancerSideprofileComponent,
          FreelancerExperienceComponent,
          FreelancerProjectsComponent,
          FreelancerSkillsComponent,
          FreelancerAboutComponent,
          FreelancerDashboardComponent,
          FreelancerOffersComponent,
          FreelancerContractsComponent,

          FreelancerUpdateAboutComponent,
          FreelancerAddExperienceComponent,
          FreelancerUpdateExperienceComponent,

          UpdateFreelancerPersonalInfosComponent,
          FreelancerAddSkillsComponent,
          FreelancerUpdateSkillsComponent,
          SkeletonComponent,
          TimeAgoPipe,
           PostComponent,
          PostCartComponent,
                    PostTableComponent,
                    PostAddComponent,
                    PostEditComponent,
                    PostDeleteComponent,
          
        
  ],
  imports: [
  
    BrowserModule,
      AppRoutingModule,
      NgbModule,
      ReactiveFormsModule,
  ],
  providers: [provideHttpClient(),AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
