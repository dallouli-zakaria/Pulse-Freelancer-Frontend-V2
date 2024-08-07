import { Component } from '@angular/core';
import { Contract } from '../../../../core/models/Contract';
import { Observable } from 'rxjs';
import { Client } from './../../../../core/models/Client';
import { ClientService } from '../../../../core/services/client.service';
import { ContractService } from '../../../../core/services/contract.service';

@Component({
  selector: 'app-freelancer-contracts',
  templateUrl: './freelancer-contracts.component.html',
  styleUrl: './freelancer-contracts.component.css'
})
export class FreelancerContractsComponent {
  isModalOpen = false;
  contract: Contract[] = [];
  isLoading = true;
  data: any[] = [];
  subject!: Observable<Contract[]>;
  clientMap: { [key: number]: Client } = {};

  constructor(private contractService: ContractService, private clientService: ClientService) { }

  ngOnInit(): void {
    this.fetchData();
    this.contractService.index()
    this.subject = this.contractService.contractData$;
    this.showContract();


  }

  fetchData() {
    this.contractService.index()
    this.contractService.contractData$.subscribe({
      next: (contracts: any) => {
        this.contract = contracts;
        this.contract.forEach(contract => {
          if (contract.freelancer_id !== undefined) {
            this.loadFreelancer(contract.client_id)
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

  loadFreelancer(clientId:any) {
    console.log(clientId);
    
    if (!this.clientMap[clientId]) {
      this.clientService.show(clientId)
      this.clientService.getData$.subscribe({
        next: (freelancer:any) => {
          this.clientMap[clientId] = freelancer;
        },
        error: (error) => {
          console.error(`Failed to load freelancer with id ${clientId}`, error);
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
    this.contractService.contractData$.subscribe({
      next: (data: any) => { this.contract = data; },
      error: (error:any) => {
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
