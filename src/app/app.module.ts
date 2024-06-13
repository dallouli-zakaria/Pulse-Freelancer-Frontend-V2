import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminLeftbarComponent } from './components/admin/admin-layout/admin-leftbar/admin-leftbar.component';
import { AdminTopbarComponent } from './components/admin/admin-layout/admin-topbar/admin-topbar.component';
import { AdminTableComponent } from './components/admin/table/admin-table/admin-table.component';
import { FreelancerCartComponent } from './components/admin/carts/freelancer-cart/freelancer-cart.component';
import { ClientCartComponent } from './components/admin/carts/client-cart/client-cart.component';
import { DashboardComponent } from './components/admin/pages/dashboard/dashboard.component';
import { ContractCartComponent } from './components/admin/carts/contract-cart/contract-cart.component';
import { OfferCartComponent } from './components/admin/carts/offer-cart/offer-cart.component';
import { provideHttpClient } from '@angular/common/http';
import { AdminComponent } from './components/admin/pages/admin/admin.component';
import { ClientComponent } from './components/admin/pages/client/client.component';
import { FreelancerComponent } from './components/admin/pages/freelancer/freelancer.component';
import { RoleComponent } from './components/admin/pages/role/role.component';
import { PermissionComponent } from './components/admin/pages/permission/permission.component';
import { ContractComponent } from './components/admin/pages/contract/contract.component';
import { OfferComponent } from './components/admin/pages/offer/offer.component';
import { ClientTableComponent } from './components/admin/table/client-table/client-table.component';
import { FreelancerTableComponent } from './components/admin/table/freelancer-table/freelancer-table.component';
import { ContractTableComponent } from './components/admin/table/contract-table/contract-table.component';
import { OfferTableComponent } from './components/admin/table/offer-table/offer-table.component';
import { RoleTableComponent } from './components/admin/table/role-table/role-table.component';
import { PermissionTableComponent } from './components/admin/table/permission-table/permission-table.component';
import { AdminEditComponent } from './components/admin/buttons/edit/admin-edit/admin-edit.component';
import { ClientEditComponent } from './components/admin/buttons/edit/client-edit/client-edit.component';
import { FreelancerEditComponent } from './components/admin/buttons/edit/freelancer-edit/freelancer-edit.component';
import { AdminDeleteComponent } from './components/admin/buttons/delete/admin-delete/admin-delete.component';
import { ClientDeleteComponent } from './components/admin/buttons/delete/client-delete/client-delete.component';
import { AdminAddComponent } from './components/admin/buttons/add/admin-add/admin-add.component';
import { FreelancerDeleteComponent } from './components/admin/buttons/delete/freelancer-delete/freelancer-delete.component';
import { ClientAddComponent } from './components/admin/buttons/add/client-add/client-add.component';
import { FreelancerAddComponent } from './components/admin/buttons/add/freelancer-add/freelancer-add.component';
import { MailingComponent } from './components/admin/pages/mailing/mailing.component';
import { ContractAddComponent } from './components/admin/buttons/add/contract-add/contract-add.component';
import { ContractDeleteComponent } from './components/admin/buttons/delete/contract-delete/contract-delete.component';
import { ContractEditComponent } from './components/admin/buttons/edit/contract-edit/contract-edit.component';
import { UsersComponent } from './components/admin/pages/users/users.component';
import { UsersTableComponent } from './components/admin/table/users-table/users-table.component';
import { UsersEditComponent } from './components/admin/buttons/edit/users-edit/users-edit.component';
import { UsersDeleteComponent } from './components/admin/buttons/delete/users-delete/users-delete.component';
import { UserDetailsComponent } from './components/admin/buttons/details/user-details/user-details.component';
import { RoleDeleteComponent } from './components/admin/buttons/delete/role-delete/role-delete.component';
import { PermissionDeleteComponent } from './components/admin/buttons/delete/permission-delete/permission-delete.component';
import { RoleEditComponent } from './components/admin/buttons/edit/role-edit/role-edit.component';
import { PermissionEditComponent } from './components/admin/buttons/edit/permission-edit/permission-edit.component';
import { RoleAddComponent } from './components/admin/buttons/add/role-add/role-add.component';
import { PermissionAddComponent } from './components/admin/buttons/add/permission-add/permission-add.component';
import { RoleDetailsComponent } from './components/admin/buttons/details/role-details/role-details.component';
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
          RoleDetailsComponent
  ],
  imports: [
      BrowserModule,
      AppRoutingModule,
      NgbModule
      
  ],
  providers: [provideHttpClient()],
  bootstrap: [AppComponent]
})
export class AppModule { }
