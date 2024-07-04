import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { RoleService } from '../../../core/services/role.service';



@Component({
  selector: 'app-user-home',
  templateUrl: './user-home.component.html',
  styleUrl: './user-home.component.css'
})
export class UserHomeComponent implements OnInit{
  userId!:number;
  roles!:string[];
  isAuthenticated: boolean = false;
  constructor(private rolesService: RoleService,private authService:AuthService) {}

  ngOnInit(): void {
    //this.authService.parseID();
    this.isAuthenticated = this.authService.isLoggedIn();
    if (this.isAuthenticated) {
    const sub = this.authService.parseID(); 
    this.authService.getuserdetails(sub).subscribe((res) => {
      this.userId = res.id;
      console.log(this.userId); 
      this.getRoles(); 
    });
  }

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
