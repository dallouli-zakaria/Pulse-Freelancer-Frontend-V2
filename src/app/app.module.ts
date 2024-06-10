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
          OfferComponent
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
