import { Component, OnInit, OnDestroy } from '@angular/core';
import { FreelancerService } from '../../../../core/services/freelancer.service';
import { Observable, Subscription } from 'rxjs';
import { Freelancer } from '../../../../core/models/Freelancer';
import { AuthService } from '../../../../core/services/auth.service';
import { WishListService } from '../../../../core/services/wish-list.service';
import Swal from 'sweetalert2';

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
  private searchSubscription: Subscription | null = null;

  constructor(
    private freelancerService: FreelancerService,
    private authservice: AuthService,
    private wishListservice: WishListService
  ) {}

  ngOnInit(): void {
    this.loadFreelancers(this.currentPage);
    this.loadFavoriteFreelancers();
  }

  ngOnDestroy(): void {
    // Clean up the subscription when the component is destroyed
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  loadFreelancers(page: number): void {
    this.isLoading = true;
    this.freelancerService.verifiedfreelancer().subscribe({
      next: (data: Freelancer[]) => {
        this.freelancers = data;
        this.filteredFreelancersVariable = [...this.freelancers]; // Initialize filtered list
        this.isLoading = false;
      },
      error: (error: any) => {
        console.error(error);
        this.isLoading = false;
      },
    });
  }

  loadFavoriteFreelancers(): void {
    this.wishListservice.getFavoriteFreelancers(this.clientId).subscribe({
      next: (data: any[]) => {
        this.favoriteFreelancers = new Set(
          data.map((item) => item.freelancer_id)
        );
      },
      error: (error: any) => {
        console.error(error);
      },
    });
  }

  toggleFavorite(freelancerId: number): void {
    if (this.favoriteFreelancers.has(freelancerId)) {
      this.wishListservice.removeFromWishlist(this.clientId, freelancerId).subscribe({
        next: () => {
          this.favoriteFreelancers.delete(freelancerId);
          this.showAlert('Retiré des favoris');
        },
        error: (error: any) => {
          console.error(error);
        },
      });
    } else {
      this.wishListservice.addToWishlist(this.clientId, freelancerId).subscribe({
        next: () => {
          this.favoriteFreelancers.add(freelancerId);
          this.showAlert('Ajouté au favoris');
        },
        error: (error: any) => {
          console.error(error);
        },
      });
    }
  }

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

  isFavorite(freelancerId: number): boolean {
    return this.favoriteFreelancers.has(freelancerId);
  }

  getFirstName(fullName: string | undefined): string {
    if (!fullName) return '';
    const nameParts = fullName.split(' ');
    return nameParts[0];
  }

  filterFreelancers(): void {
    // Cancel the previous subscription if it exists
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }

    // Basic filter logic based on searchTerm
    this.filteredFreelancersVariable = this.searchTerm
      ? this.freelancers.filter(freelancer =>
          freelancer.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          freelancer.skills.some(skill => skill.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
        )
      : [...this.freelancers]; // Reset to full list if searchTerm is empty
  }

  onSearchTermChange(): void {
    this.filterFreelancers();
  }
  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.loadFreelancers(page);
    }
  }
}
