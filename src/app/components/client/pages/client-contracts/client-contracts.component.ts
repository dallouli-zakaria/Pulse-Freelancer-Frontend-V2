import { Component } from '@angular/core';
import { ContractService } from '../../../../core/services/contract.service';
import { Contract } from '../../../../core/models/Contract';
import { Observable } from 'rxjs';
import { FreelancerService } from '../../../../core/services/freelancer.service';
import { Freelancer } from '../../../../core/models/Freelancer';

@Component({
  selector: 'app-client-contracts',
  templateUrl: './client-contracts.component.html',
  styleUrl: './client-contracts.component.css'
})
export class ClientContractsComponent {
  isModalOpen = false;
  contract: Contract[] = [];
  isLoading = true;
  data: any[] = [];
  subject!: Observable<Contract[]>;
  freelancerMap: { [key: number]: Freelancer } = {};

  constructor(private contractService: ContractService, private freelancerService: FreelancerService) { }

  ngOnInit(): void {
    this.fetchData();
    this.contractService.index()
    this.subject = this.contractService.contractData;
    this.showContract();

  }

  fetchData() {
    this.contractService.contractData.subscribe({
      next: (contracts: any) => {
        this.contract = contracts;
        this.contract.forEach(contract => {
          if (contract.freelancer_id !== undefined) {
            this.loadFreelancer(contract.freelancer_id)
          }
        });
        this.isLoading = false;
      },
      error: (error:any) => {
        console.error(error);
        this.isLoading = false;
      }
    });
  }

  loadFreelancer(freelancerId: any) {
    if (!this.freelancerMap[freelancerId]) {
      this.freelancerService.show(freelancerId).subscribe({
        next: (freelancer: Freelancer) => {
          this.freelancerMap[freelancerId] = freelancer;
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
  errorhandling:any
  showContract() {
    this.contractService.contractData.subscribe({
      next: (data: any) => { this.contract = data; },
      error: (error) => {
        console.error(error);
        if (error.error.errors) {
          this.errorhandling = Object.values(error.error.errors).flat();
        } else {
          this.errorhandling = [error.message || 'An error occurred'];
        }
      },
      complete: () => { console.log('end operation'); }
    });
  }
}
