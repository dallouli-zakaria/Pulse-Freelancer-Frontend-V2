import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contract } from '../../../../../core/models/Contract';
import { ContractService } from '../../../../../core/services/contract.service';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Client } from '../../../../../core/models/Client';
import { ClientService } from '../../../../../core/services/client.service';
import { FreelancerService } from '../../../../../core/services/freelancer.service';
import { Freelancer } from '../../../../../core/models/Freelancer';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-contract-add',
  templateUrl: './contract-add.component.html',
  styleUrl: './contract-add.component.css'
})
export class ContractAddComponent implements OnInit {
 contract:Contract[]=[]
 client:Client[]=[];
 freelancer:Freelancer[]=[];
  clientsubject!:Observable<Client[]>;
  freelnacerSubject!:Observable<Freelancer[]>
  errorhandling:any;
 constructor(private contractService:ContractService,
             private fb:FormBuilder
             ,private clientservices:ClientService
              ,private freelancerService:FreelancerService){}
  @Output() closeModal = new EventEmitter<void>();
  close(): void {
    this.closeModal.emit();
  }
  
  form!:FormGroup;
  errorhandeling:any
 ngOnInit(): void {
  this.freelancerService.index()
    // freelancer
    this.freelancerIndex()
      this.freelnacerSubject=this.freelancerService.getdata
      // client
      this.clientsubject=this.clientservices.getData
      this.clientIndex()
      //form builderContract
     this.form=this.fb.group({
      id: [null, Validators.required],
      title: ['', [Validators.required, Validators.maxLength(255)]],
      period: [''],
      budget: [null, [Validators.min(0)]],
      project_description: ['', Validators.required],
      client_id: [''],
      freelancer_id: ['']
     })
 }

  add(){
    if(this.form.valid){
     this.contractService.store(this.form.value).subscribe({
      next:(data)=>{console.log(data);
        this.contractService.index();
        this.close()
      },
      error:(error)=>{console.log(error);
        if ( error.error.errors) {
          this.errorhandling = Object.values(error.error.errors).flat();
        } else {
          this.errorhandling = [error.message || 'An error occurred'];
        }
      }
     }) 
    }else{
      this.errorhandeling='error validation'
    } 
  }
  clientIndex(){
    this.clientservices.index()
    this.clientservices.getData.subscribe({
    next:(data:any)=>{this.client=data;console.log(data);
    },
    error:(error)=>console.log(error),
    complete:()=>console.log('complet display data client')
    })
  }
  freelancerIndex(){
    this.freelancerService.index()
    this.freelancerService.getdata.subscribe({
      next:(data:any)=>{this.freelancer=data;console.log(data);
      },
      error:(error)=>console.log(error),
      complete:()=>console.log('complet display data freelancer')
      })
  }


}
