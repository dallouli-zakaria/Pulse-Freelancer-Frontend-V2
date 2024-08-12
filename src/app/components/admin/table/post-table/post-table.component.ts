import { Component, OnInit } from '@angular/core';
import { Post } from '../../../../core/models/post';
import { PostsService } from '../../../../core/services/posts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrls: ['./post-table.component.css']
})
export class PostTableComponent implements OnInit {
  post: Post[] = [];
  allPosts: Post[] = [];
  openPosts: Post[] = [];
  waitingPosts: Post[] = [];
  closedPosts: Post[] = [];
  displayedPosts: Post[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  postsPerPage: number = 5;
  dataStatus!: string;
  isLoading = true;

  constructor(private postService: PostsService, private router: Router) {}

  ngOnInit(): void {
    this.index();
    this.getDataStatusFromUrl();
  }

  index() {
    this.postService.index().subscribe({
      next: (data: any) => {
        this.allPosts = data;
        this.isLoading = false;
        this.categorizePosts();
        this.filterAndPaginatePosts();
      },
      error: (error: any) => console.log(error),
      complete: () => console.log('Data retrieval completed')
    });
  }

  getDataStatusFromUrl() {
    const currentUrl = this.router.url;
    if (currentUrl.includes('post-waiting')) {
      this.dataStatus = 'waiting';
    } else if (currentUrl.includes('post-closed')) {
      this.dataStatus = 'closed';
    } else if (currentUrl.includes('post-open')) {
      this.dataStatus = 'open';
    } else {
      this.dataStatus = 'open';
    }
  }

  categorizePosts() {
    this.openPosts = this.allPosts.filter(post => post.status === 'open');
    this.waitingPosts = this.allPosts.filter(post => post.status === 'waiting');
    this.closedPosts = this.allPosts.filter(post => post.status === 'closed');
  }

  filterAndPaginatePosts() {
    let filteredPosts = this.getPostsByStatus();

    filteredPosts = filteredPosts.filter(post => 
      post.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );

    const startIndex = (this.currentPage - 1) * this.postsPerPage;
    this.displayedPosts = filteredPosts.slice(startIndex, startIndex + this.postsPerPage);
  }

  getPostsByStatus(): Post[] {
    switch (this.dataStatus) {
      case 'open':
        return this.openPosts;
      case 'waiting':
        return this.waitingPosts;
      case 'closed':
        return this.closedPosts;
      default:
        return this.allPosts;
    }
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
    const totalPosts = this.getPostsByStatus().length;
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
