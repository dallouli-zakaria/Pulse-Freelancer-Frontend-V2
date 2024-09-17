import { ClientcontractService } from './../../../../core/services/clientcontract.service';
import { Component, OnInit } from '@angular/core';
import { ContractService } from '../../../../core/services/contract.service';
import { FreelancerService } from '../../../../core/services/freelancer.service';
import { Contract } from '../../../../core/models/Contract';
import { Freelancer } from '../../../../core/models/Freelancer';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-client-contracts',
  templateUrl: './client-contracts.component.html',
  styleUrls: ['./client-contracts.component.css']
})
export class ClientContractsComponent implements OnInit {
  isModalOpen = false;
  contract: any[] = [];
  paginatedContracts: any[] = [];
  freelancerMap: { [key: number]: Freelancer } = {};
  isLoading = true;
  searchTerm = '';
  currentPage = 1;
  totalPages = 1;
  contractsPerPage = 5;
  client_id!:number;

  constructor(private contractService: ContractService, private freelancerService: FreelancerService,private authsevice:AuthService,private clientcontractservice: ClientcontractService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.client_id = this.authsevice.parseID();

    this.clientcontractservice.index().subscribe(
      (contracts:any) => {
        console.log(contracts);
        
        this.contract = contracts;
        this.totalPages = Math.ceil(this.contract.length / this.contractsPerPage);
        this.applyPagination();
        this.contract.forEach(contract => {
          if (contract.freelancer_id !== undefined) {
            this.loadFreelancer(contract.freelancer_id);
          }
        });
        this.isLoading = false;
      },
      (error: any) => {
        console.error(error);
        this.isLoading = false;
      }
    );
}


  loadFreelancer(freelancerId: any) {
    if (!this.freelancerMap[freelancerId]) {
      this.freelancerService.show(freelancerId)
      this.freelancerService.freelancers$.subscribe({
        next: (freelancer: any) => {
          this.freelancerMap[freelancerId] = freelancer;
          this.isLoading = false;
        },
        error: (error) => {
          console.error(`Failed to load freelancer with id ${freelancerId}`, error);
        }
      });
    }
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  onSearch() {
    this.currentPage = 1;
    this.applyPagination();
  }

  applyPagination() {
    const filteredContracts = this.contract.filter(contract =>
      contract.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.totalPages = Math.ceil(filteredContracts.length / this.contractsPerPage);
    const start = (this.currentPage - 1) * this.contractsPerPage;
    const end = start + this.contractsPerPage;
    this.paginatedContracts = filteredContracts.slice(start, end);
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.applyPagination();
    }
  }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }
}
