import { Component } from '@angular/core';
import { Contract } from '../../../../core/models/Contract';
import { ContractService } from '../../../../core/services/contract.service';

@Component({
  selector: 'app-contract-table',
  templateUrl: './contract-table.component.html',
  styleUrl: './contract-table.component.css'
})
export class ContractTableComponent {
   contract:Contract[]=[];

   selectedIdContract!:number;
    selectedDataContarct:any
  constructor(private contractServices:ContractService){
    this.index();
  }

  //manage page edite delete and details for assingnig 
  show = false;
  showedit = false;
  showedelete = false;
  
  
  onEdited(id:number,object:any): void {
    this.selectedIdContract=id;
    this.selectedDataContarct=object;
  this.show = true;
  this.showedit = true;
  this.showedelete = false;
  }
  
  ondeleted(id:number,object:any): void {
 this.selectedIdContract=id;
 this.selectedDataContarct=object;
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
  

  index(){
    this.contractServices.index()
    this.contractServices.contractData.subscribe({
      next:(data:any)=>{this.contract=data;
        
        },
      error: (error)=>console.log(error),
      complete:()=>console.log('end desplay data')
    })
  }

}
