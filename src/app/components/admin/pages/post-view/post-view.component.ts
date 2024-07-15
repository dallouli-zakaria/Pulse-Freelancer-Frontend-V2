import { Component } from '@angular/core';
import { Post } from '../../../../core/models/post';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../../core/services/posts.service';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styleUrl: './post-view.component.css'
})
export class PostViewComponent {
  postId!: number;
  post!: Post;
  postdetails!: any;
  isLoading: boolean = true;

  constructor(private route: ActivatedRoute, private postService: PostsService) { }

  ngOnInit(): void {
    const postIdParam = this.route.snapshot.paramMap.get('item');
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
