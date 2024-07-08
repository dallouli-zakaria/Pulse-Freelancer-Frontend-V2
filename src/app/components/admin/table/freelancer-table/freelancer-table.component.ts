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
console.log(this.selectedData?.status);


  }
valueStatuse:any
 status(){
  if(this.selectedData?.status==null){
  this.valueStatuse='Completed'
  }else{
    this.valueStatuse='Not Completed' 
  }

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


  //manage page edite delete and details for assingnig 
  show = false;
  showedit = false;
  showedelete = false;
  
  
  onEdited(id: number, role: any): void {
  this.slecteID= id;
  this.selectedData= role;
  this.show = true;
  this.showedit = true;
  this.showedelete = false;
  }
  
  ondeleted(id: number, role: any): void {
    this.slecteID= id;
    this.selectedData= role;
  this.show = true;
  this.showedelete = true;
  this.showedit = false;
  
  }
            
  onCloseModal(): void {
  this.show = false;
  this.showedit = false;
  this.showedelete = false;
  }
  //end manage pages
  
}
