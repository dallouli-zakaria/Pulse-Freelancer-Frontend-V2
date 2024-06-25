import { Component, OnInit, inject } from '@angular/core';
import { Freelancer } from '../../../../core/models/Freelancer';
import { FreelancerService } from '../../../../core/services/freelancer.service';

@Component({
  selector: 'app-freelancer-table',
  templateUrl: './freelancer-table.component.html',
  styleUrl: './freelancer-table.component.css'
})
export class FreelancerTableComponent implements OnInit{
  freelancer:Freelancer[]=[]

private freelancerService:FreelancerService= inject(FreelancerService)
  ngOnInit(): void {
    throw new Error('Method not implemented.');


  }

index(){
  this.freelancerService.index();
  this.freelancerService.getdata.subscribe({
    next:(data:any)=>{this.freelancer=data;console.log(data);
    },
    error:(error:any)=>{console.log(error);
    },
    complete:()=>console.log('end operation get data')
    
  })
}


}
