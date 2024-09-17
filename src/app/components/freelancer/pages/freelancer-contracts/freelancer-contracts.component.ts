import { FreelancercontractService } from './../../../../core/services/freelancercontract.service';
import { Component } from '@angular/core';
import { Contract } from '../../../../core/models/Contract';
import { Observable } from 'rxjs';
import { Client } from './../../../../core/models/Client';
import { ClientService } from '../../../../core/services/client.service';
import { ContractService } from '../../../../core/services/contract.service';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-freelancer-contracts',
  templateUrl: './freelancer-contracts.component.html',
  styleUrl: './freelancer-contracts.component.css',
})
export class FreelancerContractsComponent {
  isModalOpen = false;
  contract: any[] = [];
  paginatedContracts: any[] = [];
  isLoading = true;
  data: any[] = [];
  subject!: Observable<Contract[]>;
  freelancer_id!: number;
  searchTerm = '';
  currentPage = 1;
  totalPages = 1;
  contractsPerPage = 5;
  constructor(
    private contractService: ContractService,
    private clientService: ClientService,
    private authservice: AuthService,
    private freelancercontract:FreelancercontractService
  ) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData() {
    this.freelancer_id = this.authservice.parseID();
    this.freelancercontract.index().subscribe(
      (contracts: any) => {
        this.contract = contracts;
        this.totalPages = Math.ceil(
          this.contract.length / this.contractsPerPage
        );
        this.applyPagination();
        this.isLoading = false;
      },
      (error: any) => {
        console.error(error);
        this.isLoading = false;
      }
    );
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
    this.totalPages = Math.ceil(
      filteredContracts.length / this.contractsPerPage
    );
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
