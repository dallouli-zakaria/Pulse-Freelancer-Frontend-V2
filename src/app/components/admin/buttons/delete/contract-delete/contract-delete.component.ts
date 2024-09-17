import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ContractService } from '../../../../../core/services/contract.service';

@Component({
  selector: 'app-contract-delete',
  templateUrl: './contract-delete.component.html',
  styleUrl: './contract-delete.component.css'
})
export class ContractDeleteComponent {
  @Input() idContract!:number;
  @Input() dataContarct:any
 @Output() closeModal = new EventEmitter<void>();
 close(): void {
   this.closeModal.emit();
 }
constructor(private contractService:ContractService){}

 deletedContarct(){
  console.log(this.idContract);
  
  this.contractService.delete(this.idContract).subscribe({
    next:(data)=>{console.log(data);
      this.close();
      this.contractService.index();
    },
    error:(error)=>{console.log(error);
    }
  })
 }
}
