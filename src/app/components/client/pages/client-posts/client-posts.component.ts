import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Post } from '../../../../core/models/post';
import { AuthService } from '../../../../core/services/auth.service';
import { PostsService } from '../../../../core/services/posts.service';

@Component({
  selector: 'app-client-posts',
  templateUrl: './client-posts.component.html',
  styleUrl: './client-posts.component.css'
})
export class ClientPostsComponent {
  clientid:number=this.authservice.parseID();
  post: Post[] = [];

  constructor(private  postservice:PostsService,private router:Router,private authservice:AuthService){
    this.fetchData();
    this.getposts();
 
  }


    //skeleton loading
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




    getposts(){
      
      this.postservice.showbclient(this.clientid).subscribe({
      next:(data:any)=>{
        this.post=data; 
        console.log(data);   
      },
      error:(error:any)=>{
        console.log(error);  
      }
      })

    }


}
