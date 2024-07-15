import { Component, OnDestroy } from '@angular/core';
import { OffersService } from '../../../../../core/services/offers.service';
import { AuthService } from '../../../../../core/services/auth.service';
import { Offer } from '../../../../../core/models/Offer';
import { PostsService } from '../../../../../core/services/posts.service';
import { Subscription } from 'rxjs';
import { Post } from '../../../../../core/models/post';

@Component({
  selector: 'app-freelancer-offers',
  templateUrl: './freelancer-offers.component.html',
  styleUrls: ['./freelancer-offers.component.css']
})
export class FreelancerOffersComponent implements OnDestroy {
  freelancerid: number = this.authservice.parseID();
  offers: Offer[] = [];
  posts: Post[] = [];
  offerSubscriptions: Subscription[] = []; 
  isLoading: boolean = true;
  constructor(
    private offerservice: OffersService,
    private authservice: AuthService,
    private postservice: PostsService
  ) {
    this.getoffers();
  }

  getoffers() {
    this.isLoading = true;
    this.offerservice.showbyfreelancerid(this.freelancerid).subscribe({
      next: (offers:any) => {
        this.offers = offers;
        for (const offer of this.offers) {
          this.getposts(offer.post_id);
        }
      },
      error: (err) => {
        console.error('Failed to fetch offers:', err);
      }
    });
  }

  getposts(postId: number): Subscription {
    return this.postservice.show(postId).subscribe({
      next: (post: Post) => {
        this.posts.push(post);
        this.isLoading = false;
      },
      error: (err: any) => {
        console.error('Failed to fetch post with ID ' + postId + ':', err);
        this.isLoading = false;
      }
    });
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions to avoid memory leaks
    this.offerSubscriptions.forEach(subscription => subscription.unsubscribe());
  }
}