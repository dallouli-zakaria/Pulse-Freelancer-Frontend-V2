import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-user-viewfreelancers-profile',
  templateUrl: './user-viewfreelancers-profile.component.html',
  styleUrl: './user-viewfreelancers-profile.component.css'
})
export class UserViewfreelancersProfileComponent implements OnInit{

  
  role!:string;
  roles!:string;
  isAuthenticated: boolean = false;
  constructor(private authService:AuthService) { }


  ngOnInit(): void {
    this.isAuthenticated = this.authService.isLoggedIn();
    //this.rolservice.getRoles('superadmin_role').subscribe((res)=>console.log(res));
    if (this.isAuthenticated) {
    let sub = this.authService.parseID();
    this.authService.getuserdetails(sub).subscribe((res) => {
      this.roles=res.roles;
      if(res.roles=='client_role'){
      this.role = 'Client';
    }
    else if(res.roles=='freelancer_role'){
      this.role = 'Freelancer';
    }
    });
  }
  }



  


}
