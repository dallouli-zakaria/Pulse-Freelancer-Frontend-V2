import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostsService } from '../../../core/services/posts.service';
import { Post } from '../../../core/models/post';

@Component({
  selector: 'app-view-client-offer',
  templateUrl: './view-client-offer.component.html',
  styleUrl: './view-client-offer.component.css'
})
export class ViewClientOfferComponent implements OnInit{

  postId!: number;

  post!:Post;

  constructor(private route:ActivatedRoute,private postService:PostsService){
    
  }


  ngOnInit(): void {
    // this.route.queryParams.subscribe(params => {
    //   const postId = +params['id'];
    //   this.fetchOfferDetails(postId);
    // });

    //this.postId = +this.route.snapshot.paramMap.get('postId');


    const postIdParam = this.route.snapshot.paramMap.get('postId');
    if (postIdParam !== null) {
      this.postId = +postIdParam;
      // Use the postId to fetch and display the offer details
      this.fetchOfferDetails(this.postId);
    } else {
      // Handle the case where postId is null, maybe redirect or show an error message
      console.log("error");
      
    }
  }


  fetchOfferDetails(postId: number): void {
    this.postService.show(postId).subscribe(
      data => {
        this.post = data;
        console.log(data);
        
      },
      error => {
        console.error('Error fetching offer details', error);
      }
    );
  }



  isLoading = true;
  data: any[] = [];
  fetchData() {
    // Simulate an API call
    setTimeout(() => {
      this.data = [
        { title: 'Item 1', description: 'Description 1' },
        { title: 'Item 2', description: 'Description 2' }
      ];
      this.isLoading = false;
    }, 1000);
  }


}
