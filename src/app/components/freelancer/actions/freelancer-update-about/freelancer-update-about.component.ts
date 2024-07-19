import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Freelancer } from '../../../../core/models/Freelancer';
import { FreelancerService } from '../../../../core/services/freelancer.service';

@Component({
  selector: 'app-freelancer-update-about',
  templateUrl: './freelancer-update-about.component.html',
  styleUrl: './freelancer-update-about.component.css'
})
export class FreelancerUpdateAboutComponent {
  @Input() freelancerID!:number
  @Input() freelancerData?:Freelancer;
  
   freelancer:Freelancer[]=[]
   form!:FormGroup
   errorhandling:any
   private fb:FormBuilder=inject(FormBuilder)
   private frelancerservices:FreelancerService=inject(FreelancerService)


 ngOnInit(): void {
  this.form=this.fb.group({
    summary: [this.freelancerData?.summary, Validators.required],


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
       error:(error)=>{ if ( error.error.errors) {
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
    summary: [this.freelancerData?.summary, Validators.required],

  })
}



  @Output() closeModal = new EventEmitter<void>();

  close(): void {
    this.closeModal.emit();
  }
}
