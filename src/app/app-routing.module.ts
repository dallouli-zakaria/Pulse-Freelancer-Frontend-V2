import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard.component';
import { AdminTopbarComponent } from './components/admin/admin-layout/admin-topbar/admin-topbar.component';
import { AdminTableComponent } from './components/admin/table/admin-table/admin-table.component';
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

const routes: Routes = [
  {path:'top',component:AdminTopbarComponent},
  {path:'table',component:AdminTableComponent},
  {path:'dashboard',component:DashboardComponent},
  {path:'client',component:ClientComponent},
  {path:'freelancer',component:FreelancerComponent},
  {path:'admin',component:AdminComponent},
  {path:'role',component:RoleComponent},
  {path:'permission',component:PermissionComponent},
  {path:'contract',component:ContractComponent},
  {path:'offer',component:OfferComponent},
  {path:'mailing',component:MailingComponent},
  {path:'users',component:UsersComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
 
exports: [RouterModule]
})
export class AppRoutingModule { }
