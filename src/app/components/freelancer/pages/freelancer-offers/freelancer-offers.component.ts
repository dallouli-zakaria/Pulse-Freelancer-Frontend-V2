import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Offer } from '../../../../core/models/Offer';
import { Post } from '../../../../core/models/post';
import { AuthService } from '../../../../core/services/auth.service';
import { OffersService } from '../../../../core/services/offers.service';
import { PostsService } from '../../../../core/services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-freelancer-offers',
  templateUrl: './freelancer-offers.component.html',
  styleUrl: './freelancer-offers.component.css'
})
export class FreelancerOffersComponent implements OnInit{
  freelancerId: number = this.authservice.parseID();
  allPosts: Post[] = [];
  openPosts: Post[] = [];
  waitingPosts: Post[] = [];
  closedPosts: Post[] = [];
  displayedPosts: Post[] = [];
  isLoading = true;
  dataStatus!: string;
  searchTerm: string = '';
  currentPage: number = 1;
  postsPerPage: number = 5;

  constructor(private postservice: PostsService, private router: Router, private authservice: AuthService) {}


  ngOnInit(): void {
    this.getposts();
    this.getdata();
  }

  getposts() {
    this.postservice.showbfreelancer(this.freelancerId).subscribe({
      next: (data: any) => {
        this.allPosts = data;
        this.categorizePosts();
        this.filterAndPaginatePosts();
        this.isLoading = false;
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  getdata() {
    const currentUrl = this.router.url;
    if (currentUrl === '/pulse/freelancer-dashboard/freelancer-offers-waiting') {
      this.dataStatus = 'waiting';
    } else if(currentUrl === '/pulse/freelancer-dashboard/freelancer-offers-closed'){
      this.dataStatus = 'closed';
    } else if(currentUrl === '/pulse/freelancer-dashboard/freelancer-offers-open'){
      this.dataStatus = 'open';
    }
  }

  categorizePosts() {
    this.openPosts = this.allPosts.filter(post => post.status === 'open');
    this.waitingPosts = this.allPosts.filter(post => post.status === 'waiting');
    this.closedPosts = this.allPosts.filter(post => post.status === 'closed');
  }

  filterAndPaginatePosts() {
    let filteredPosts: Post[];
    switch (this.dataStatus) {
      case 'open':
        filteredPosts = this.openPosts;
        break;
      case 'waiting':
        filteredPosts = this.waitingPosts;
        break;
      case 'closed':
        filteredPosts = this.closedPosts;
        break;
      default:
        filteredPosts = this.allPosts;
    }

    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    this.displayedPosts = filteredPosts.slice(startIndex, startIndex + this.postsPerPage);
  }

  onSearch() {
    this.currentPage = 1;
    this.filterAndPaginatePosts();
  }

  onPageChange(page: number) {
    this.currentPage = page;
    this.filterAndPaginatePosts();
  }

  get totalPages(): number {
    let totalPosts: number;
    switch (this.dataStatus) {
      case 'open':
        totalPosts = this.openPosts.length;
        break;
      case 'waiting':
        totalPosts = this.waitingPosts.length;
        break;
      case 'closed':
        totalPosts = this.closedPosts.length;
        break;
      default:
        totalPosts = this.allPosts.length;
    }
    return Math.ceil(totalPosts / this.postsPerPage);
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
}
