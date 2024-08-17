import { Component, EventEmitter, Input, input, OnInit, Output, OnChanges, SimpleChanges } from '@angular/core';
import { ContractService } from '../../../../../core/services/contract.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Contract } from '../../../../../core/models/Contract';

@Component({
  selector: 'app-contract-edit',
  templateUrl: './contract-edit.component.html',
  styleUrl: './contract-edit.component.css'
})
export class ContractEditComponent implements OnInit,OnChanges {
   @Input() conatracID!:number
   @Input() conatracData:any
   @Output() closeModal = new EventEmitter<void>();
   form!:FormGroup
   contract:Contract[]=[]
   errorhandling:any;
   constructor(private contractService:ContractService,private fb:FormBuilder){}
   ngOnInit(): void {
    this.form=this.fb.group({
    
      title: [this.conatracData.title, [Validators.required, Validators.maxLength(255)]],
      startDate: [this.conatracData.start_date, Validators.required],
      endDate: [this.conatracData.end_date, Validators.required],
      project_description: [this.conatracData.project_description, Validators.required]
     })
   }
   ngOnChanges(): void {
    this.form=this.fb.group({
    
      title: [this.conatracData.title, [Validators.required, Validators.maxLength(255)]],
      startDate: [this.conatracData.start_date, Validators.required],
      endDate: [this.conatracData.end_date, Validators.required],
      project_description: [this.conatracData.project_description, Validators.required]
     })
   }
  
  close(): void {
    this.closeModal.emit();
  }
  updated(){
    if(this.form.valid){
      this.contractService.update(this.conatracID,this.form.value).subscribe({
        next:(data:any)=>{
          this.contractService.index();
          this.close();
          console.log(data);
          
        },
       error: (error) =>{console.log(error);
        if ( error.error.errors) {
          this.errorhandling = Object.values(error.error.errors).flat();
        } else {
          this.errorhandling = [error.message || 'An error occurred'];
        }
      },
      complete:()=>{console.log('end operation');
      } 
       
      })
    }

  }

}
