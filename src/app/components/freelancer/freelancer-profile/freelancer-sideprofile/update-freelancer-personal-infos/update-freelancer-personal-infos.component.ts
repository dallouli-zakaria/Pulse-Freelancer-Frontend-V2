import { Component, inject, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Freelancer } from '../../../../../core/models/Freelancer';
import { FreelancerService } from '../../../../../core/services/freelancer.service';

@Component({
  selector: 'app-update-freelancer-personal-infos',
  templateUrl: './update-freelancer-personal-infos.component.html',
  styleUrl: './update-freelancer-personal-infos.component.css'
})
export class UpdateFreelancerPersonalInfosComponent implements OnInit,OnChanges {
 @Input() freelancerObject:any
 @Input()  freelancerID!:number
 freelancer:Freelancer[]=[]
 form!:FormGroup
 erorr:boolean=true
 private fb:FormBuilder=inject(FormBuilder)
 private frelancerservices:FreelancerService=inject(FreelancerService)


ngOnInit(): void {
this.form=this.fb.group({
  name: [this.freelancerObject?.user.name, Validators.required],
  email: [this.freelancerObject?.user.email, [Validators.required, Validators.email]],
  password: [this.freelancerObject?.user.password],
  title: [this.freelancerObject?.title, Validators.required],
  dateOfBirth: [this.freelancerObject?.dateOfBirth, Validators.required],
  city: [this.freelancerObject?.city, Validators.required],
  TJM: [this.freelancerObject?.TJM, [Validators.required, Validators.min(0)]],
  summary: [this.freelancerObject?.summary],
  availability: [this.freelancerObject?.availability, Validators.required],
  adress: [this.freelancerObject?.address, Validators.required],
  phone: [this.freelancerObject?.phone, Validators.required],
  portfolio_Url: [this.freelancerObject?.portfolio_Url],

})
}

updated(){
  console.log(this.freelancerID,'------------------');
if(this.freelancerID!==null){
  console.log(this.freelancerID,'------------------');
  
   this.frelancerservices.update(this.freelancerID,this.form.value).subscribe({
  next:(data:any)=>{
    console.log(data);
   
     this.frelancerservices.index()},
     error:(error:any)=>{
       this.erorr=false
      console.log(error)}, 
     
})}else{
  console.log('null id of freelancer');
  
  }
} 

ngOnChanges(): void {
this.form=this.fb.group({
  name: [this.freelancerObject?.user?.name, Validators.required],
  email: [this.freelancerObject?.user?.email, [Validators.required, Validators.email]],
  password: [this.freelancerObject?.user.password],
  title: [this.freelancerObject?.title, Validators.required],
  dateOfBirth: [this.freelancerObject?.dateOfBirth, Validators.required],
  city: [this.freelancerObject?.city, Validators.required],
  TJM: [this.freelancerObject?.TJM, [Validators.required, Validators.min(0)]],
  summary: [this.freelancerObject?.summary],
  availability: [this.freelancerObject?.availability, Validators.required],
  adress: [this.freelancerObject?.address, Validators.required],
  phone: [this.freelancerObject?.phone, Validators.required],
  portfolio_Url: [this.freelancerObject?.portfolio_Url],

})
}
}
