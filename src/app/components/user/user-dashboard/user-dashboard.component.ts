import { RoleService } from '../../../core/services/role.service';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit{
  userId!:number;
  role!:string[];
  isAuthenticated: boolean = false;

  constructor(private rolesService: RoleService,private authService:AuthService) {}

  ngOnInit(): void {
    //this.authService.parseID();
    this.isAuthenticated = this.authService.isLoggedIn();
    if (this.isAuthenticated) {
    const sub = this.authService.parseID(); 
    this.authService.getuserdetails(sub).subscribe((res) => {
      this.userId = res.user.id;
      this.role=res.roles;

      console.log(this.userId,this.role); 

    }); 
    }


  }

 

}
