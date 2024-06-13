import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminLeftbarComponent } from './components/admin/admin-layout/admin-leftbar/admin-leftbar.component';
import { AdminTopbarComponent } from './components/admin/admin-layout/admin-topbar/admin-topbar.component';

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
