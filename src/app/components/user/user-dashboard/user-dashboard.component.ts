import { Client } from '../../../core/models/Client';
import { ClientService } from '../../../core/services/client.service';
import { RoleService } from '../../../core/services/role.service';
import { AuthService } from './../../../core/services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent implements OnInit{
  userId:number=this.authService.parseID();
  role!:string[];
  userdetails!:any;
  isAuthenticated: boolean = false;



  test:any;

  constructor(private rolesService: RoleService,private authService:AuthService,private clientservice:ClientService) {}

  ngOnInit(): void {
    //this.authService.parseID();
    this.isAuthenticated = this.authService.isLoggedIn();
    if (this.isAuthenticated) {

      this.clientservice.show(this.userId).subscribe((res)=>
        {
          this.userdetails=res;
        
          
        }
    )

    }; 
    }


  


 

}
