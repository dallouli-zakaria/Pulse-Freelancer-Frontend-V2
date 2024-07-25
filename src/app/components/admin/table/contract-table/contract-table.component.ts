import { Component } from '@angular/core';
import { Contract } from '../../../../core/models/Contract';
import { ContractService } from '../../../../core/services/contract.service';
import { PaginatedResponse } from '../../../../core/models/PaginatedResponse';

@Component({
  selector: 'app-contract-table',
  templateUrl: './contract-table.component.html',
  styleUrl: './contract-table.component.css'
})
export class ContractTableComponent {
   contract:Contract[]=[];
   filteredCleint: Contract[] = [];
   currentPage = 1;
   totalPages = 5;
   isLoading = true;
   searchTerm: string = '';
   
   selectedIdContract!:number;
    selectedDataContarct:any
  constructor(private contractServices:ContractService){

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
  

  loadFreelancers(page: number): void {
    this.isLoading = true;
    this.contractServices.fetchPaginatedContracts(page).subscribe({
      next: (response: PaginatedResponse<Contract>) => {
        this.contract = response.data;
        this.filteredCleint = this.contract; // Initialize filtered list
        this.totalPages = response.last_page;
        this.currentPage = response.current_page;
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error(error);
        this.isLoading = false;
      },
      complete: () => console.log('End operation get data')
    });
  }
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadFreelancers(page);
    }
  }

}
