import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../../../core/models/post';
import { AuthService } from '../../../../core/services/auth.service';
import { PostsService } from '../../../../core/services/posts.service';

@Component({
  selector: 'app-client-posts',
  templateUrl: './client-posts.component.html',
  styleUrls: ['./client-posts.component.css']
})
export class ClientPostsComponent implements OnInit {
  clientid: number = this.authservice.parseID();
  post: Post[] = [];
  isLoading = true;
  dataStatus!: string;

  constructor(private postservice: PostsService, private router: Router, private authservice: AuthService) {}

  ngOnInit(): void {
    this.getposts();
    this.getdata();
  }

  getposts() {
    this.postservice.showbclient(this.clientid).subscribe({
      next: (data: any) => {
        this.post = data;
        this.isLoading = false;
        console.log(data);
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }

  getdata() {
    const currentUrl = this.router.url;
    console.log('Current URL:', currentUrl);
    if (currentUrl === '/pulse/client-profile/client-offers-waiting') {
      this.dataStatus = 'waiting';
    } else if(currentUrl === '/pulse/client-profile/client-offers-closed'){
      this.dataStatus = 'closed';
    } else if(currentUrl === '/pulse/client-profile/client-offers-open'){
      this.dataStatus = 'open';
    }
  }
}
