import { Component, OnInit, OnDestroy } from '@angular/core';
import { FreelancerService } from '../../../../core/services/freelancer.service';
import { Observable, Subscription } from 'rxjs';
import { Freelancer } from '../../../../core/models/Freelancer';
import { AuthService } from '../../../../core/services/auth.service';
import { WishListService } from '../../../../core/services/wish-list.service';
import Swal from 'sweetalert2';
import { SkillService } from '../../../../core/services/skill.service';
import { Skill } from '../../../../core/models/skill';

@Component({
  selector: 'app-client-view-freelancers',
  templateUrl: './client-view-freelancers.component.html',
  styleUrls: ['./client-view-freelancers.component.css'],
})
export class ClientViewFreelancersComponent implements OnInit, OnDestroy {
  
  isLoading = true;
  freelancers: Freelancer[] = [];
  filteredFreelancersVariable: Freelancer[] = [];
  paginatedFreelancers: Freelancer[] = [];
  favoriteFreelancers: Set<number> = new Set<number>();
  clientId: number = this.authservice.parseID();
  searchTerm: string = '';
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 10;
  skills: Skill[] = [];
  selectedSkill: string = '';
  maxTJM: number = 5000;
  private searchSubscription: Subscription | null = null;

  constructor(
    private freelancerService: FreelancerService,
    private authservice: AuthService,
    private wishListservice: WishListService,
    private skillservice: SkillService
  ) {}

  ngOnInit(): void {
    this.loadFreelancers();
    this.loadFavoriteFreelancers();
    this.loadSkills();
  }

  ngOnDestroy(): void {
    // Unsubscribe from search subscription to prevent memory leaks
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  // Load all verified freelancers
  loadFreelancers(): void {
    this.freelancerService.verifiedfreelancer().subscribe({
      next: (data: Freelancer[]) => {
        this.freelancers = data;
        this.filteredFreelancersVariable = [...this.freelancers];
        this.isLoading = false;
        this.initMaxTJM();
        this.filterFreelancers();
      },
      error: () => {
        this.isLoading = false;
      },
    });
  }

  // Initialize the maximum TJM based on freelancer data
  initMaxTJM(): void {
    const tjmValues = this.freelancers.map(f => parseFloat(f.TJM) || 0);
    const maxTJMInData = Math.max(...tjmValues);
    this.maxTJM = maxTJMInData || 5000;
  }

  // Load favorite freelancers for the current client
  loadFavoriteFreelancers(): void {
    this.wishListservice.getFavoriteFreelancers(this.clientId).subscribe({
      next: (data: any[]) => {
        this.favoriteFreelancers = new Set(
          data.map((item) => item.freelancer_id)
        );
      },
      error: () => {
        // Handle error if necessary
      },
    });
  }

  // Toggle favorite status for a freelancer
  toggleFavorite(freelancerId: number): void {
    if (this.favoriteFreelancers.has(freelancerId)) {
      this.wishListservice.removeFromWishlist(this.clientId, freelancerId).subscribe({
        next: () => {
          this.favoriteFreelancers.delete(freelancerId);
          this.showAlert('Removed from favorites');
        },
        error: () => {
          // Handle error if necessary
        },
      });
    } else {
      this.wishListservice.addToWishlist(this.clientId, freelancerId).subscribe({
        next: () => {
          this.favoriteFreelancers.add(freelancerId);
          this.showAlert('Added to favorites');
        },
        error: () => {
          // Handle error if necessary
        },
      });
    }
  }

  // Show alert for favorite actions
  showAlert(message: string): void {
    Swal.fire({
      position: 'top-end',
      iconHtml: '<i class="fas fa-heart"></i>',
      title: message,
      customClass: {
        popup: 'smaller-popup',
        icon: 'heart-icon',
      },
      showConfirmButton: false,
      timer: 1500,
      backdrop: false,
      width: '400px',
      padding: '1em',
    });
  }

  // Check if a freelancer is in favorites
  isFavorite(freelancerId: number): boolean {
    return this.favoriteFreelancers.has(freelancerId);
  }

  // Get the first name from a full name
  getFirstName(fullName: string | undefined): string {
    if (!fullName) return '';
    const nameParts = fullName.split(' ');
    return nameParts[0];
  }

  // Filter freelancers based on search criteria
  filterFreelancers(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }

    this.filteredFreelancersVariable = this.freelancers.filter(freelancer => {
      const matchesSearchTerm = freelancer.title.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesMaxTJM = parseFloat(freelancer.TJM) <= this.maxTJM;
      const matchesSkill = this.selectedSkill ? freelancer.skills.some(skill => skill.title === this.selectedSkill) : true;

      return matchesSearchTerm && matchesMaxTJM && matchesSkill;
    });

    this.totalPages = Math.ceil(this.filteredFreelancersVariable.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedFreelancers();
  }

  // Update the paginated freelancers based on the current page
  updatePaginatedFreelancers(): void {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedFreelancers = this.filteredFreelancersVariable.slice(startIndex, endIndex);
  }

  // Handler for search term changes
  onSearchTermChange(): void {
    this.filterFreelancers();
  }

  // Handler for TJM changes
  onTJMChange(): void {
    this.filterFreelancers();
  }

  // Handler for skill selection changes
  onSkillChange(skill: string): void {
    this.selectedSkill = skill;
    this.filterFreelancers();
  }

  // Handler for page changes
  onPageChange(page: number): void {
    this.currentPage = page;
    this.updatePaginatedFreelancers();
  }

  // Load all skills
  loadSkills(): void {
    this.skillservice.getSkills().subscribe({
      next: (skills: Skill[]) => {
        this.skills = skills.sort((a, b) => a.title.localeCompare(b.title));
      },
      error: () => {
        // Handle error if necessary
      },
    });
  }

  // Generate an array of page numbers for pagination
  getPageNumbers(): number[] {
    const totalPages = this.totalPages;
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    let start = Math.max(this.currentPage - 2, 1);
    let end = Math.min(start + 4, totalPages);
    
    if (end - start < 4) {
      start = Math.max(end - 4, 1);
    }
    
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }

  // Get the end index for the current page
  getEndIndex(): number {
    return Math.min(this.currentPage * this.itemsPerPage, this.filteredFreelancersVariable.length);
  }
}