import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../core/services/auth.service';
import { ClientService } from '../../../../core/services/client.service';
import { RoleService } from '../../../../core/services/role.service';

@Component({
  selector: 'app-client-index',
  templateUrl: './client-index.component.html',
  styleUrl: './client-index.component.css'
})
export class ClientIndexComponent implements OnInit{
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
