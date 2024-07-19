import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-client-view-freelancer-details',
  templateUrl: './client-view-freelancer-details.component.html',
  styleUrl: './client-view-freelancer-details.component.css'
})
export class ClientViewFreelancerDetailsComponent implements OnInit{
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
