import { Component, Input, OnChanges, OnInit, SimpleChanges, inject } from '@angular/core';
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
  freelancer:Freelancer[]=[]
  form!:FormGroup
  private fb:FormBuilder=inject(FormBuilder)
  private frelancerservices:FreelancerService=inject(FreelancerService)
  ngOnInit(): void {
    this.form=this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: [''],
      title: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      TJM: [0, [Validators.required, Validators.min(0)]],
      summary: [''],
      availability: ['', Validators.required],
      adress: ['', Validators.required],
      phone: ['', Validators.required],
      portfolio_Url: [''],
      CV: ['']
    })
  }

  updated(){
    if(this.freelancerID!==null  && this.form.valid){
      console.log(this.freelancerID);
      
       this.frelancerservices.update(this.freelancerID,this.form.value).subscribe({
      next:(data:any)=>{
        console.log(data);
         this.frelancerservices.index()},
         error:(error:any)=>console.log(error)
         
    })}else{
      console.log('null id of freelancer');
      
      }
    } 
  
  ngOnChanges(): void {
    this.form=this.fb.group({
      name: [this.freelancerData?.user?.name, Validators.required],
      email: [this.freelancerData?.user?.email, [Validators.required, Validators.email]],
      password: [this.freelancerData?.password],
      title: [this.freelancerData?.title, Validators.required],
      dateOfBirth: [this.freelancerData?.dateOfBirth, Validators.required],
      city: [this.freelancerData?.city, Validators.required],
      TJM: [this.freelancerData?.TJM, [Validators.required, Validators.min(0)]],
      summary: [this.freelancerData?.summary],
      availability: [this.freelancerData?.availability, Validators.required],
      adress: [this.freelancerData?.adress, Validators.required],
      phone: [this.freelancerData?.phone, Validators.required],
      portfolio_Url: [this.freelancerData?.portfolio_Url],
      CV: [this.freelancerData?.CV]
    })
  }
}
