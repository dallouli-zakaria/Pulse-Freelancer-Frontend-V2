import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../../../../core/models/post';
import { AuthService } from '../../../../core/services/auth.service';
import { ClientService } from '../../../../core/services/client.service';
import { PostsService } from '../../../../core/services/posts.service';
import { SkillService } from '../../../../core/services/skill.service';
import { Skill } from '../../../../core/models/skill';
import { Subject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-freelancer-view-posts',
  templateUrl: './freelancer-view-posts.component.html',
  styleUrls: ['./freelancer-view-posts.component.css']
})
export class FreelancerViewPostsComponent implements OnInit, OnDestroy {
  isLoading: boolean = true;
  posts: Post[] = [];
  filteredPosts: Post[] = [];
  paginatedPosts:Post[]=[];
  freelancerid: number = this.authservice.parseID();
  skills: Skill[] = [];
  searchTerm: string = '';
  selectedSkill: string = '';
  selectedPostId: number | null = null;
  private searchSubscription: Subscription | null = null;
  itemsPerPage = 10;
  // Pagination
  currentPage: number = 1;
  pageSize: number = 10;
  totalPages: number = 1;

  private searchSubject = new Subject<string>();

  constructor(
    private postsService: PostsService,
    private authservice: AuthService,
    private clientservice: ClientService,
    private skillservice: SkillService
  ) {}

  ngOnInit() {
    this.getposts();
    this.loadSkills();
    this.setupSearch();
  }

  ngOnDestroy() {
    // Unsubscribe from search subscription to prevent memory leaks
    if (this.searchSubscription) {
      this.searchSubscription.unsubscribe();
    }
  }

  setupSearch() {
    this.searchSubject.pipe(
      debounceTime(300),
      distinctUntilChanged()
    ).subscribe((searchTerm) => {
      this.searchTerm = searchTerm;
      this.filterPosts();
    });
  }
  getposts() {
    this.postsService.showOpenPosts().subscribe((res: any) => {
      this.posts = res;
      this.filterPosts();
      this.isLoading = false;
    });
  }

  loadSkills(): void {
    this.skillservice.index();
    this.skillservice.skillData.subscribe((res) => {
      this.skills = res.sort((a, b) => a.title.localeCompare(b.title));
    });
  }

  onSearchTermChange(searchValue: string) {
    this.searchSubject.next(searchValue);
  }

  onSkillChange(skill: string): void {
    this.selectedSkill = skill;
    this.filterPosts();
  }
  filterPosts(): void {

    const searchWords = this.searchTerm.toLowerCase().split(' ');
    this.filteredPosts = this.posts.filter(post => {
        const matchesSearchTerm = searchWords.every(word => post.title.toLowerCase().includes(word));
        const matchesSkill = this.selectedSkill ? post.skills.some(skill => skill.title === this.selectedSkill) : true;
    
        return matchesSearchTerm && matchesSkill;
    });
    
    console.log('Filtered Posts:', this.filteredPosts);

    this.totalPages = Math.ceil(this.filteredPosts.length / this.itemsPerPage);
    this.currentPage = 1;
    this.updatePaginatedPosts();
}


    // Update the paginated freelancers based on the current page
    updatePaginatedPosts(): void {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      this.paginatedPosts = this.filteredPosts.slice(startIndex, startIndex + this.itemsPerPage);
    }

  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onPageChange(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePaginatedPosts();  // Ensure this is called after changing the page
    }
  }

  selectPostId(postId: number) {
    this.selectedPostId = postId;
  }

    // Get the end index for the current page
    getEndIndex(): number {
      return Math.min(this.currentPage * this.itemsPerPage, this.filteredPosts.length);
    }

  
}