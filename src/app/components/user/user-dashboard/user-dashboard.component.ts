import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../../core/services/roles.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit{
  userId!:number;
  roles!:string[];

  constructor(private rolesService: RolesService,private authService:AuthService) {}

  ngOnInit(): void {
    //this.authService.parseID();
    const sub = this.authService.parseID(); 
    this.authService.getuserdetails(sub).subscribe((res) => {
      this.userId = res.id;
      console.log(this.userId); 
      this.getRoles(); 
    });

  }

  //get connected user roles from decoded token
  getRoles(): void {
    
    if (this.userId) {
      this.rolesService.getUserRoles(this.userId).subscribe(
        (res) => {
          this.roles = res;
          console.log(this.roles);
        },
        (error) => {
          console.error('Error fetching roles', error);
        }
      );
    } else {
      console.warn('User ID is undefined.');
    }
  }

}
