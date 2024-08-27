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
  favoriteFreelancers: Set<number> = new Set<number>();
  clientId: number = this.authservice.parseID();
  searchTerm: string = '';
  currentPage = 1;
  totalPages = 1;
  skills: Skill[] = [];
  maxTJM: number = 5000; // Default max TJM
  private searchSubscription: Subscription | null = null;

  constructor(
    private freelancerService: FreelancerService,
    private authservice: AuthService,
    private wishListservice: WishListService,
    private skillservice: SkillService
  ) {}

  ngOnInit(): void {
    this.loadFreelancers(this.currentPage);
    this.loadFavoriteFreelancers();
    this.loadSkills();
  }

  ngOnDestroy(): void {
    // Clean up the subscription when the component is destroyed
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  // Load freelancers for the specified page
  loadFreelancers(page: number): void {
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
    
  }

  // Load favorite freelancers for the client
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

  // Toggle the favorite status of a freelancer
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

  // Display an alert message
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

  // Check if a freelancer is in the favorites list
  isFavorite(freelancerId: number): boolean {
    return this.favoriteFreelancers.has(freelancerId);
  }

  // Extract the first name from a full name
  getFirstName(fullName: string | undefined): string {
    if (!fullName) return '';
    const nameParts = fullName.split(' ');
    return nameParts[0];
  }

  // Filter freelancers based on search term and max TJM
  filterFreelancers(): void {
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }

    this.filteredFreelancersVariable = this.freelancers.filter(freelancer => {
      const matchesSearchTerm = !this.searchTerm || 
        freelancer.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        freelancer.skills.some(skill => skill.title.toLowerCase().includes(this.searchTerm.toLowerCase()));

      const freelancerTJM = parseFloat(freelancer.TJM);
      const matchesTJM = !isNaN(freelancerTJM) && freelancerTJM <= this.maxTJM;

      return matchesSearchTerm && matchesTJM;
    });
  }

  // Handle change in max TJM value
  onTJMChange(): void {
    this.filterFreelancers();
  }

  // Handle change in search term
  onSearchTermChange(): void {
    this.filterFreelancers();
  }

  // Handle page changes
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadFreelancers(page);
    }
  }

  // Load all skills
  loadSkills(): void {
    this.skillservice.index();
    this.skillservice.skillData.subscribe((res) => {
      this.skills = res.sort((a, b) => a.title.localeCompare(b.title));
    });
  }
}
