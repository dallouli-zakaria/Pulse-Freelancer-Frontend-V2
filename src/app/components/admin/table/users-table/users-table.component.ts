import { Component } from '@angular/core';
import { User } from '../../../../core/models/User';
import { UserService } from '../../../../core/services/user.service';
import { Observable } from 'rxjs';
import { ClientService } from '../../../../core/services/client.service';
import { FreelancerService } from '../../../../core/services/freelancer.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent {
  user:User[]=[];
  roleUSer!:string
  constructor(private userService:UserService, private clientServices:ClientService,private freelancersservices:FreelancerService){}
    subject!:Observable<User[]>
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.index()
    this.subject=this.userService.getData
  }
  
  index(){
    this.userService.index();
  this.userService.getData.subscribe({
    next:(data:any)=>{
      console.log(data);
      
      this.user=data
    },
    error:(error)=>console.log(error),
    
    complete:()=>console.log('end Operation')
    
  })
  }
}
