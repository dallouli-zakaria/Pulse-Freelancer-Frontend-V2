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
  role!:string[];
  isAuthenticated: boolean = false;
  constructor(private authService:AuthService) {}

  ngOnInit(): void {
    // console.log(this.authService.verifyrole());
   
    
    //geting user details with roles 
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
