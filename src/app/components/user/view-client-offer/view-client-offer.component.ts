import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../core/services/posts.service';
import { Post } from '../../../core/models/post';

@Component({
  selector: 'app-view-client-offer',
  templateUrl: './view-client-offer.component.html',
  styleUrl: './view-client-offer.component.css'
})
export class ViewClientOfferComponent implements OnInit {
  postId!: number;
  post!: Post;
  postdetails!: any;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private postService: PostsService) { }

  ngOnInit(): void {
    const postIdParam = this.route.snapshot.paramMap.get('postId');
    if (postIdParam !== null) {
      this.postId = +postIdParam;
      this.fetchOfferDetails(this.postId);
    } else {
      console.log("error");
    }
  }

  trackdata(post_details: any) {
    this.postdetails = post_details;
  }

  fetchOfferDetails(postId: number): void {
    this.postService.show(postId).subscribe(
      data => {
        this.post = data;
        this.isLoading = false;
        console.log(data);
      },
      error => {
        console.error('Error fetching offer details', error);
        this.isLoading = false;
      }
    );
  }
}
