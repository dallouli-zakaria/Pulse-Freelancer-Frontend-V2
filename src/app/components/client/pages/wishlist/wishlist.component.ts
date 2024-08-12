import { Component, OnInit } from '@angular/core';
import { Freelancer } from '../../../../core/models/Freelancer';
import { AuthService } from '../../../../core/services/auth.service';
import { FreelancerService } from '../../../../core/services/freelancer.service';
import { WishListService } from '../../../../core/services/wish-list.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  isLoading = true;
  freelancers: Freelancer[] = [];
  filteredFreelancers: Freelancer[] = [];
  paginatedFreelancers: Freelancer[] = [];
  favoriteFreelancers: Set<number> = new Set<number>();
  clientId: number = this.authService.parseID();
  searchTerm: string = '';
  currentPage: number = 1;
  itemsPerPage: number = 5;
  totalPages: number = 0;

  constructor(
    private freelancerService: FreelancerService,
    private authService: AuthService,
    private wishListService: WishListService
  ) {}

  ngOnInit(): void {
    this.index();
  }

  index() {
    this.wishListService.getFavoriteFreelancersdetails(this.clientId).subscribe({
      next: (data: any) => {
        this.freelancers = data;
        this.filteredFreelancers = data;
        this.updatePagination();
        this.isLoading = false;
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => console.log('end operation get data')
    });

    this.wishListService.getFavoriteFreelancers(this.clientId).subscribe({
      next: (data: any) => {
        this.favoriteFreelancers = new Set(data.map((item: any) => item.freelancer_id));
        console.log(this.favoriteFreelancers);
      }
    });
  }

  toggleFavorite(freelancerId: number) {
    if (this.favoriteFreelancers.has(freelancerId)) {
      this.wishListService.removeFromWishlist(this.clientId, freelancerId).subscribe(() => {
        this.favoriteFreelancers.delete(freelancerId);
        this.index(); // Refresh data to reflect changes
        Swal.fire({
          position: 'top-end',
          iconHtml: '<i class="fas fa-heart"></i>', // Use Font Awesome heart icon
          title: 'Retiré des favoris',
          customClass: {
            popup: 'smaller-popup',
            icon: 'heart-icon'
          },
          showConfirmButton: false,
          timer: 1500,
          backdrop: false, // Disable background overlay
          width: '400px', // Adjust the width to make it smaller
          padding: '1em', // Adjust padding to make it smaller
        })
      });
    // } else {
    //   this.wishListService.addToWishlist(this.clientId, freelancerId).subscribe(() => {
    //     this.favoriteFreelancers.add(freelancerId);
    //     this.index(); // Refresh data to reflect changes
    //   });
    }


   
  }

  isFavorite(freelancerId: number): boolean {
    return this.favoriteFreelancers.has(freelancerId);
  }

  getFirstName(fullName: string | undefined): string {
    if (!fullName) {
      return '';
    }
    const nameParts = fullName.split(' ');
    return nameParts.length > 1 ? nameParts[1] : fullName;
  }

  onSearch() {
    if (this.searchTerm) {
      this.filteredFreelancers = this.freelancers.filter(freelancer =>
        freelancer.user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        freelancer.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        freelancer.city.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        freelancer.skills.some(skill => skill.title.toLowerCase().includes(this.searchTerm.toLowerCase()))
      );
    } else {
      this.filteredFreelancers = this.freelancers;
    }
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredFreelancers.length / this.itemsPerPage);
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = Math.min(startIndex + this.itemsPerPage, this.filteredFreelancers.length);
    this.paginatedFreelancers = this.filteredFreelancers.slice(startIndex, endIndex);
    this.totalPages = Math.ceil(this.filteredFreelancers.length / this.itemsPerPage);
  }

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

  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }
}
