import { PackService } from './../../../core/services/pack.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-connected-landing-page',
  templateUrl: './connected-landing-page.component.html',
  styleUrl: './connected-landing-page.component.css'
})
export class ConnectedLandingPageComponent implements OnInit{
  userId!:number;
  role!:string[];
  isAuthenticated: boolean = false;
  packs!:any;
  constructor(private authService:AuthService,private packService:PackService) {}

  ngOnInit(): void {
    this.index();
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

  index(){
    this.packService.index()
    this.packService.getData.subscribe({
      next:(data:any)=>{this.packs=data;
        
        },
      error: (error)=>console.log(error),
      complete:()=>console.log('end desplay data')
    })
  }

}
