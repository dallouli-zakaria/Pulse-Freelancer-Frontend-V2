import { Component, Input, OnInit, inject, input } from '@angular/core';
import { Freelancer } from '../../../../core/models/Freelancer';
import { FreelancerService } from '../../../../core/services/freelancer.service';
import { Observable } from 'rxjs';
import { PaginatedResponse } from '../../../../core/models/PaginatedResponse';

@Component({
  selector: 'app-freelancer-table',
  templateUrl: './freelancer-table.component.html',
  styleUrl: './freelancer-table.component.css'
})
export class FreelancerTableComponent implements OnInit{
  slecteID!: number;
  selectedData?: Freelancer;
  freelancers: Freelancer[] = [];
  filteredFreelancers: Freelancer[] = [];
  currentPage = 1;
  totalPages = 5;
  isLoading = true;
  searchTerm: string = '';

  private freelancerService: FreelancerService = inject(FreelancerService);

  ngOnInit(): void {
    this.loadFreelancers(this.currentPage);
  }

  loadFreelancers(page: number): void {
    this.isLoading = true;
    this.freelancerService.fetchPaginatedFreelancers(page).subscribe({
      next: (response: PaginatedResponse<Freelancer>) => {
        this.freelancers = response.data;
        this.filteredFreelancers = this.freelancers; // Initialize filtered list
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

  filterFreelancers(): void {
    if (this.searchTerm) {
      this.filteredFreelancers = this.freelancers.filter(freelancer => 
        freelancer.user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        freelancer.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        freelancer.user.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredFreelancers = this.freelancers;
    }
  }

  trackFreelancer(user: any, id: number): void {
    this.slecteID = id;
    this.selectedData = user;
  }

  valueStatuse: any;
  status(): void {
    if (this.selectedData?.status == null) {
      this.valueStatuse = 'Completed';
    } else {
      this.valueStatuse = 'Not Completed';
    }
  }

  // Manage page edit, delete, and details for assigning
  show = false;
  showedit = false;
  showedelete = false;

  onEdited(id: number, role: any): void {
    this.slecteID = id;
    this.selectedData = role;
    this.show = true;
    this.showedit = true;
    this.showedelete = false;
  }

  ondeleted(id: number, role: any): void {
    this.slecteID = id;
    this.selectedData = role;
    this.show = true;
    this.showedelete = true;
    this.showedit = false;
  }

  onCloseModal(): void {
    this.show = false;
    this.showedit = false;
    this.showedelete = false;
  }
  // End manage pages

  getStatus(): string {
    if (this.isAllFieldsFilled() && this.selectedData?.status === 'verified') {
      return 'Complet';
    } else if (this.isAllFieldsFilled() && this.selectedData?.status === 'not verified') {
      return 'pas encore vérifié';
    } else {
      return 'Veuilez remplir toutes vos informations ';
    }
  }

  private isAllFieldsFilled(): boolean {
    // Check all required fields are not null or undefined
    return (
      this.selectedData?.title?.trim() !== '' &&
      this.selectedData?.dateOfBirth?.trim() !== '' &&
      this.selectedData?.city?.trim() !== '' &&
      this.selectedData?.TJM?.trim() !== '' &&
      this.selectedData?.summary?.trim() !== '' &&
      this.selectedData?.availability?.trim() !== '' &&
      this.selectedData?.adress?.trim() !== '' &&
      this.selectedData?.phone?.trim() !== '' &&
      this.selectedData?.portfolio_Url?.trim() !== ''
    );
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadFreelancers(page);
    }
  }
}
