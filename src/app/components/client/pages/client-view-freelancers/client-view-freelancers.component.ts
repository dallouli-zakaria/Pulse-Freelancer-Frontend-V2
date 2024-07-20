import { Component, OnInit } from '@angular/core';
import { FreelancerService } from '../../../../core/services/freelancer.service';
import { Observable } from 'rxjs';
import { Freelancer } from '../../../../core/models/Freelancer';

@Component({
  selector: 'app-client-view-freelancers',
  templateUrl: './client-view-freelancers.component.html',
  styleUrl: './client-view-freelancers.component.css'
})
export class ClientViewFreelancersComponent implements OnInit{

  freelancerList!:Observable<Freelancer[]>;
  freelancers:Freelancer[]=[]

  constructor(private freelancerService:FreelancerService){}
  ngOnInit(): void {
    this.index();
this.freelancerList=this.freelancerService.getdata
  }



  index(){
  
    this.freelancerService.index();
  
    this.freelancerService.verifiedfreelancer().subscribe({
      next:(data:any)=>{
        this.freelancers=data;
        console.log(data);
      },
      error:(error:any)=>{console.log(error);
      },
      complete:()=>console.log('end operation get data')
      
    })
  }
  



}
