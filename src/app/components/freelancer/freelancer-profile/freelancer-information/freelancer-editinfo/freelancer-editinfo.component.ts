import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Freelancer } from '../../../../../core/models/Freelancer';
import { FreelancerService } from '../../../../../core/services/freelancer.service';

@Component({
  selector: 'app-freelancer-editinfo',
  templateUrl: './freelancer-editinfo.component.html',
  styleUrl: './freelancer-editinfo.component.css'
})
export class FreelancerEditinfoComponent {

  @Input() freelancerID!:number
  @Input() freelancerData?:Freelancer;
  
   freelancer:Freelancer[]=[]
   form!:FormGroup
   errorhandling:any
   private fb:FormBuilder=inject(FormBuilder)
   private frelancerservices:FreelancerService=inject(FreelancerService)


 ngOnInit(): void {
  this.form=this.fb.group({
    name: [this.freelancerData?.user.name, Validators.required],
    email: [this.freelancerData?.user?.email, [Validators.required, Validators.email]],
    password: [this.freelancerData?.user.password],
    title: [this.freelancerData?.title, Validators.required],
    dateOfBirth: [this.freelancerData?.dateOfBirth, Validators.required],
    city: [this.freelancerData?.city, Validators.required],
    TJM: [this.freelancerData?.TJM, [Validators.required, Validators.min(0)]],

    availability: [this.freelancerData?.availability, Validators.required],
    adress: [this.freelancerData?.address, Validators.required],
    phone: [this.freelancerData?.phone, Validators.required],
    portfolio_Url: [this.freelancerData?.portfolio_Url],
    // status:['completed']

  })
}

updated(){
  if(this.freelancerID!==null){
    console.log(this.freelancerID);
    
     this.frelancerservices.update(this.freelancerID,this.form.value).subscribe({
    next:(data:any)=>{
      console.log(data);
      this.close();
       this.frelancerservices.index()},
       error:(error)=>{console.log(error);
       
         if ( error.error.errors) {
        this.errorhandling = Object.values(error.error.errors).flat();
      } else {
        this.errorhandling = [error.message || 'An error occurred'];
      }
       
         }, 
       
  })}else{
    console.log('null id of freelancer');
    
    }
  } 

ngOnChanges(): void {
  this.form=this.fb.group({
    name: [this.freelancerData?.user?.name, Validators.required],
    email: [this.freelancerData?.user?.email, [Validators.required, Validators.email]],
    password: [this.freelancerData?.user.password],
    title: [this.freelancerData?.title, Validators.required],
    dateOfBirth: [this.freelancerData?.dateOfBirth, Validators.required],
    city: [this.freelancerData?.city, Validators.required],
    TJM: [this.freelancerData?.TJM, [Validators.required, Validators.min(0)]],
    availability: [this.freelancerData?.availability, Validators.required],
    adress: [this.freelancerData?.address, Validators.required],
    phone: [this.freelancerData?.phone, Validators.required],
    portfolio_Url: [this.freelancerData?.portfolio_Url],
  })
}



  @Output() closeModal = new EventEmitter<void>();

  close(): void {
    this.closeModal.emit();
  }
}
