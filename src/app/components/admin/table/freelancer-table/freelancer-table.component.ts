import { Component, Input, OnInit, inject, input } from '@angular/core';
import { Freelancer } from '../../../../core/models/Freelancer';
import { FreelancerService } from '../../../../core/services/freelancer.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-freelancer-table',
  templateUrl: './freelancer-table.component.html',
  styleUrl: './freelancer-table.component.css'
})
export class FreelancerTableComponent implements OnInit{
  
slecteID!:number;
selectedData?:Freelancer

trackFreelancer(user:any,id:number){
 this.slecteID=id;
 this.selectedData=user; 
}
  freelancers:Freelancer[]=[]
freelancerList!:Observable<Freelancer[]>;
private freelancerService:FreelancerService= inject(FreelancerService)
  ngOnInit(): void {
this.index();
this.freelancerList=this.freelancerService.getdata

  }




index(){
  this.freelancerService.index();
  this.freelancerService.getdata.subscribe({
    next:(data:any)=>{this.freelancers=data;console.log(data);
    },
    error:(error:any)=>{console.log(error);
    },
    complete:()=>console.log('end operation get data')
    
  })
}


}
