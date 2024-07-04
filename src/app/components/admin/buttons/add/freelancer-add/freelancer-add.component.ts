import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FreelancerService } from '../../../../../core/services/freelancer.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Freelancer } from '../../../../../core/models/Freelancer';

@Component({
  selector: 'app-freelancer-add',
  templateUrl: './freelancer-add.component.html',
  styleUrl: './freelancer-add.component.css'
})
export class FreelancerAddComponent implements OnInit {
 freelancer:Freelancer[]=[]
  form!:FormGroup
  constructor(private freelancerService:FreelancerService,private fb:FormBuilder){}
  @Output() closeModal = new EventEmitter<void>();
close(): void {
  this.closeModal.emit();
}
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


add(){
  this.freelancerService.store(this.form.value).subscribe({
    next:(data:any)=>{console.log(data);
      this.freelancerService.index()
    },
    error:(error)=>{console.log(error);
    },
    complete:()=>console.log('add opperation ended')
    
  })
}
}
