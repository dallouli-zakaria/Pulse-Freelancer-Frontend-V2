import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminLeftbarComponent } from './components/admin/admin-layout/admin-leftbar/admin-leftbar.component';
import { AdminTopbarComponent } from './components/admin/admin-layout/admin-topbar/admin-topbar.component';
import { HTTP_INTERCEPTORS, provideHttpClient } from '@angular/common/http';
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
import { ClientCartComponent } from './components/admin/cards/client-cart/client-cart.component';
import { ContractCartComponent } from './components/admin/cards/contract-cart/contract-cart.component';
import { FreelancerCartComponent } from './components/admin/cards/freelancer-cart/freelancer-cart.component';
import { OfferCartComponent } from './components/admin/cards/offer-cart/offer-cart.component';
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
import { LoginComponent } from './components/commun/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TimeAgoPipe } from './core/pipes/time-ago.pipe';
import { AuthService } from './core/services/auth.service';
import { PostCartComponent } from './components/admin/cards/post-cart/post-cart.component';
import { PostTableComponent } from './components/admin/table/post-table/post-table.component';
import { PostComponent } from './components/admin/pages/post/post.component';
import { PostAddComponent } from './components/admin/buttons/add/post-add/post-add.component';
import { PostEditComponent } from './components/admin/buttons/edit/post-edit/post-edit.component';
import { PostDeleteComponent } from './components/admin/buttons/delete/post-delete/post-delete.component';
import { RoleUserComponent } from './components/admin/table/users-table/role-user/role-user.component';
import { RolechipsAutocompleteComponent } from './components/admin/buttons/edit/role-edit/rolechips-autocomplete/rolechips-autocomplete.component';
import { OfferAddComponent } from './components/admin/buttons/add/offer-add/offer-add.component';
import { OfferDeleteComponent } from './components/admin/buttons/delete/offer-delete/offer-delete.component';
import { OfferEditComponent } from './components/admin/buttons/edit/offer-edit/offer-edit.component';
import { AssignRoleToPermessionComponent } from './components/admin/buttons/assignement/assign-role-to-permession/assign-role-to-permession.component';
import { AssignRoleToUserComponent } from './components/admin/buttons/assignement/assign-role-to-user/assign-role-to-user.component';
import { AssignPermessionToRoleComponent } from './components/admin/buttons/assignement/assign-permession-to-role/assign-permession-to-role.component';
import { AssignPermessionToUserComponent } from './components/admin/buttons/assignement/assign-permession-to-user/assign-permession-to-user.component';
import { PostViewComponent } from './components/admin/pages/post-view/post-view.component';
import { ConnectedLandingPageComponent } from './components/commun/connected-landing-page/connected-landing-page.component';
import { IndexComponent } from './components/commun/index/index.component';
import { LandingPageComponent } from './components/commun/landing-page/landing-page.component';
import { SkeletonLoadingComponent } from './components/commun/skeleton-loading/skeleton-loading.component';
import { AuthentificationComponent } from './components/commun/auth/authentification/authentification.component';
import { AddPostComponent } from './components/client/pages/add-post/add-post.component';
import { ClientContractsComponent } from './components/client/pages/client-contracts/client-contracts.component';
import { ClientIndexComponent } from './components/client/pages/client-index/client-index.component';
import { ClientInfosComponent } from './components/client/pages/client-infos/client-infos.component';
import { ClientPostsComponent } from './components/client/pages/client-posts/client-posts.component';
import { ClientProfileComponent } from './components/client/pages/client-profile/client-profile.component';
import { ClientSideprofileComponent } from './components/client/pages/client-sideprofile/client-sideprofile.component';
import { ClientPostDetailsComponent } from './components/client/pages/client-post-details/client-post-details.component';
import { ClientSubscriptionsComponent } from './components/client/pages/client-subscriptions/client-subscriptions.component';
import { ClientViewFreelancerDetailsComponent } from './components/client/pages/client-view-freelancer-details/client-view-freelancer-details.component';
import { ClientViewFreelancersComponent } from './components/client/pages/client-view-freelancers/client-view-freelancers.component';
import { ClientContractDownloadComponent } from './components/client/actions/client-contract-download/client-contract-download.component';
import { ClientUpdateCompanyInfosComponent } from './components/client/actions/client-update-company-infos/client-update-company-infos.component';
import { ClientUpdatePersonalInfosComponent } from './components/client/actions/client-update-personal-infos/client-update-personal-infos.component';
import { ClientUpdatePostComponent } from './components/client/actions/client-update-post/client-update-post.component';
import { HeaderComponent } from './components/commun/client-freelancer-layouts/header/header.component';
import { FooterComponent } from './components/commun/client-freelancer-layouts/footer/footer.component';
import { SkillchipsComponent } from './components/commun/skillchips/skillchips.component';
import { CommonModule } from '@angular/common';
import { FreelancerAddExperienceComponent } from './components/freelancer/actions/freelancer-add-experience/freelancer-add-experience.component';
import { FreelancerUpdateAboutComponent } from './components/freelancer/actions/freelancer-update-about/freelancer-update-about.component';
import { FreelancerUpdateExperienceComponent } from './components/freelancer/actions/freelancer-update-experience/freelancer-update-experience.component';
import { FreelancerUpdatePersonalInfosComponent } from './components/freelancer/actions/freelancer-update-personal-infos/freelancer-update-personal-infos.component';
import { FreelancerViewPostDetailsComponent } from './components/freelancer/actions/freelancer-view-post-details/freelancer-view-post-details.component';
import { FreelancerAboutComponent } from './components/freelancer/pages/freelancer-about/freelancer-about.component';
import { FreelancerExperienceComponent } from './components/freelancer/pages/freelancer-experience/freelancer-experience.component';
import { FreelancerIndexComponent } from './components/freelancer/pages/freelancer-index/freelancer-index.component';
import { FreelancerOffersComponent } from './components/freelancer/pages/freelancer-offers/freelancer-offers.component';
import { FreelancerPersonalInfosComponent } from './components/freelancer/pages/freelancer-personal-infos/freelancer-personal-infos.component';
import { FreelancerProfileComponent } from './components/freelancer/pages/freelancer-profile/freelancer-profile.component';
import { FreelancerProjectsHistoryComponent } from './components/freelancer/pages/freelancer-projects-history/freelancer-projects-history.component';
import { FreelancerSideprofileComponent } from './components/freelancer/pages/freelancer-sideprofile/freelancer-sideprofile.component';
import { FreelancerSkillsComponent } from './components/freelancer/pages/freelancer-skills/freelancer-skills.component';
import { FreelancerViewPostsComponent } from './components/freelancer/pages/freelancer-view-posts/freelancer-view-posts.component';
import { PackComponent } from './components/admin/pages/pack/pack.component';
import { PackTableComponent } from './components/admin/table/pack-table/pack-table.component';
import { PackAddComponent } from './components/admin/buttons/add/pack-add/pack-add.component';
import { PackDeleteComponent } from './components/admin/buttons/delete/pack-delete/pack-delete.component';
import { PackEditComponent } from './components/admin/buttons/edit/pack-edit/pack-edit.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CircularProgressbarComponent } from './components/commun/client-freelancer-layouts/circular-progressbar/circular-progressbar.component';
import { WishlistComponent } from './components/client/pages/wishlist/wishlist.component';
import { LoadingPageComponent } from './components/commun/loading/loading-page/loading-page.component';
import { PostRegiterComponent } from './components/commun/auth/post-regiter/post-regiter.component';
import { tokenInterceptor } from './core/interceptors/token.interceptor';
import { FreelancerContractsComponent } from './components/freelancer/pages/freelancer-contracts/freelancer-contracts.component';
import { ClientPayementComponent } from './components/client/pages/client-payement/client-payement.component';
import { ResetPasswordComponentComponent } from './components/commun/auth/reset-password-component/reset-password-component.component';
import { ForgetPAsswordComponent } from './components/commun/auth/forget-password/forget-password.component';
import { EmailVerifyComponent } from './components/commun/auth/email-verify/email-verify.component';
import { ClientPayementVerificationComponent } from './components/client/pages/client-payement-verification/client-payement-verification.component';
;

@NgModule({
  declarations: [
    AddPostComponent,
    AdminAddComponent,
    AdminComponent,
    AdminDashboardComponent,
    AdminDeleteComponent,
    AdminEditComponent,
    AdminLeftbarComponent,
    AdminTableComponent,
    AdminTopbarComponent,
    AppComponent,
    AssignPermessionToRoleComponent,
    AssignPermessionToUserComponent,
    AssignRoleToPermessionComponent,
    AssignRoleToUserComponent,
    AuthentificationComponent,
    ClientAddComponent,
    ClientCartComponent,
    ClientComponent,
    ClientContractDownloadComponent,
    ClientContractsComponent,
    ClientDeleteComponent,
    ClientEditComponent,
    ClientIndexComponent,
    ClientInfosComponent,
    ClientPostDetailsComponent,
    ClientPostsComponent,
    ClientProfileComponent,
    ClientSideprofileComponent,
    ClientSubscriptionsComponent,
    ClientTableComponent,
    ClientUpdateCompanyInfosComponent,
    ClientUpdatePersonalInfosComponent,
    ClientUpdatePostComponent,
    ClientViewFreelancerDetailsComponent,
    ClientViewFreelancersComponent,
    ConnectedLandingPageComponent,
    ContractAddComponent,
    ContractCartComponent,
    ContractComponent,
    ContractDeleteComponent,
    ContractEditComponent,
    ContractTableComponent,
    DashboardComponent,
    FooterComponent,
    FreelancerAboutComponent,
    FreelancerAddComponent,
    FreelancerAddExperienceComponent,
    FreelancerCartComponent,
    FreelancerComponent,
    FreelancerDeleteComponent,
    FreelancerEditComponent,
    FreelancerExperienceComponent,
    FreelancerIndexComponent,
    FreelancerOffersComponent,
    FreelancerPersonalInfosComponent,
    FreelancerProfileComponent,
    FreelancerProjectsHistoryComponent,
    FreelancerSideprofileComponent,
    FreelancerSkillsComponent,
    FreelancerTableComponent,
    FreelancerUpdateAboutComponent,
    FreelancerUpdateExperienceComponent,
    FreelancerUpdatePersonalInfosComponent,
    FreelancerViewPostDetailsComponent,
    FreelancerViewPostsComponent,
    FreelancerContractsComponent,
    HeaderComponent,
    IndexComponent,
    LandingPageComponent,
    LoginComponent,
    MailingComponent,
    OfferAddComponent,
    OfferCartComponent,
    OfferComponent,
    OfferDeleteComponent,
    OfferEditComponent,
    OfferTableComponent,
    PermissionAddComponent,
    PermissionComponent,
    PermissionDeleteComponent,
    PermissionEditComponent,
    PermissionTableComponent,
    PostAddComponent,
    PostCartComponent,
    PostComponent,
    PostDeleteComponent,
    PostEditComponent,
    PostTableComponent,
    PostViewComponent,
    RoleAddComponent,
    RoleComponent,
    RoleDeleteComponent,
    RoleDetailsComponent,
    RoleEditComponent,
    RoleTableComponent,
    RoleUserComponent,
    RolechipsAutocompleteComponent,
    SkeletonLoadingComponent,
    SkillchipsComponent,
    TimeAgoPipe,
    UserDetailsComponent,
    UsersComponent,
    UsersDeleteComponent,
    UsersEditComponent,
    UsersTableComponent,
    ClientUpdatePersonalInfosComponent,
    PackComponent,
    PackTableComponent,
    PackAddComponent,
    PackDeleteComponent,
    PackEditComponent,
    EmailVerifyComponent,
    CircularProgressbarComponent,
    WishlistComponent,
    LoadingPageComponent,
    PostRegiterComponent,
    ResetPasswordComponentComponent,
    ForgetPAsswordComponent,
    ClientPayementComponent,
    ClientPayementVerificationComponent
    
  ],
  imports: [
     FormsModule,
    BrowserModule,
      AppRoutingModule,
      NgbModule,
      ReactiveFormsModule,
      CommonModule,NgxPaginationModule,FormsModule 
  ],
  providers: [provideHttpClient(),AuthService,  { provide: HTTP_INTERCEPTORS, useFactory: () => tokenInterceptor, multi: true },],
  bootstrap: [AppComponent]
})
export class AppModule { }
