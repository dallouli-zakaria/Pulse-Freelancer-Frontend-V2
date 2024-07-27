import { Component, OnInit } from '@angular/core';
import { FreelancerService } from '../../../../core/services/freelancer.service';
import { Observable, BehaviorSubject } from 'rxjs';
import { Freelancer } from '../../../../core/models/Freelancer';
import { AuthService } from '../../../../core/services/auth.service';
import { WishListService } from '../../../../core/services/wish-list.service';

@Component({
  selector: 'app-client-view-freelancers',
  templateUrl: './client-view-freelancers.component.html',
  styleUrls: ['./client-view-freelancers.component.css']
})
export class ClientViewFreelancersComponent implements OnInit {
  isLoading = true;
  freelancerList!: Observable<Freelancer[]>;
  freelancers: Freelancer[] = [];
  favoriteFreelancers: Set<number> = new Set<number>();
  clientId:number=this.authservice.parseID();
  constructor(private freelancerService: FreelancerService,private authservice:AuthService,private wishListservice:WishListService) {}

  ngOnInit(): void {
    this.index();
  }

  index() {
    this.freelancerService.index();
    this.freelancerService.verifiedfreelancer().subscribe({
      next: (data: any) => {
        this.freelancers = data;
        this.isLoading = false;
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      },
      complete: () => console.log('end operation get data')
    });
    
    // Load favorite freelancers
    this.wishListservice.getFavoriteFreelancers(this.clientId).subscribe({
      next: (data: any) => {
        this.favoriteFreelancers = new Set(data.map((item: any) => item.freelancer_id));
        console.log(this.favoriteFreelancers);
        
      }
    });
  }

  toggleFavorite(freelancerId: number) {
    if (this.favoriteFreelancers.has(freelancerId)) {
      this.wishListservice.removeFromWishlist(this.clientId,freelancerId).subscribe(() => {
        this.favoriteFreelancers.delete(freelancerId);
      });
    } else {
      this.wishListservice.addToWishlist(this.clientId,freelancerId).subscribe(() => {
        this.favoriteFreelancers.add(freelancerId);
      });
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
}
