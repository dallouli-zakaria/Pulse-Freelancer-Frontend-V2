import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, inject } from '@angular/core';
import { Freelancer } from '../../../../../core/models/Freelancer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FreelancerService } from '../../../../../core/services/freelancer.service';

@Component({
  selector: 'app-freelancer-edit',
  templateUrl: './freelancer-edit.component.html',
  styleUrl: './freelancer-edit.component.css'
})
export class FreelancerEditComponent implements OnInit,OnChanges {
 
    @Input() freelancerID!:number
    @Input() freelancerData?:Freelancer;
    @Output() closeModal = new EventEmitter<void>();
    close(): void {
      this.closeModal.emit();
    }
     freelancer:Freelancer[]=[]
     form!:FormGroup
     errorhandling!:string
     private fb:FormBuilder=inject(FormBuilder)
     private frelancerservices:FreelancerService=inject(FreelancerService)


   ngOnInit(): void {
    this.form=this.fb.group({
      name: [this.freelancerData?.user?.name, Validators.required],
      email: [this.freelancerData?.user?.email, [Validators.required, Validators.email]],
      password: [this.freelancerData?.user?.password],
      title: [this.freelancerData?.title, Validators.required],
      dateOfBirth: [this.freelancerData?.dateOfBirth, Validators.required],
      city: [this.freelancerData?.city, Validators.required],
      TJM: [this.freelancerData?.TJM, [Validators.required, Validators.min(0)]],
      summary: [this.freelancerData?.summary],
      availability: [this.freelancerData?.availability, Validators.required],
      adress: [this.freelancerData?.adress, Validators.required],
      phone: [this.freelancerData?.phone, Validators.required],
      portfolio_Url: [this.freelancerData?.portfolio_Url],
      status:[this.freelancerData?.status]
    })
  }

  updated(){
    if(this.freelancerID!==null){
      console.log(this.freelancerID);
      
       this.frelancerservices.update(this.freelancerID,this.form.value).subscribe({
      next:(data:any)=>{
        console.log(data);
        this.close();
         this.frelancerservices.fetchPaginatedFreelancers()},
         error:(error:string)=>{
           console.log(error);
           }, 
         
    })}else{
      console.log('null id of freelancer');
      
      }
    } 
  
  ngOnChanges(): void {
    this.form=this.fb.group({
      name: [this.freelancerData?.user?.name, Validators.required],
      email: [this.freelancerData?.user?.email, [Validators.required, Validators.email]],
      password: [this.freelancerData?.user?.password],
      title: [this.freelancerData?.title, Validators.required],
      dateOfBirth: [this.freelancerData?.dateOfBirth, Validators.required],
      city: [this.freelancerData?.city, Validators.required],
      TJM: [this.freelancerData?.TJM, [Validators.required, Validators.min(0)]],
      summary: [this.freelancerData?.summary],
      availability: [this.freelancerData?.availability, Validators.required],
      adress: [this.freelancerData?.adress, Validators.required],
      phone: [this.freelancerData?.phone, Validators.required],
      portfolio_Url: [this.freelancerData?.portfolio_Url],
      status:[this.freelancerData?.status]
    })
  }
}
