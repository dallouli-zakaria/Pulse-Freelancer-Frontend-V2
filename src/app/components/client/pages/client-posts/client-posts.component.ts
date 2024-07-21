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
  isLoading = true;

  constructor(private  postservice:PostsService,private router:Router,private authservice:AuthService){

    this.getposts();
 
  }


   
    

  

  




    getposts(){
      
      this.postservice.showbclient(this.clientid).subscribe({
      next:(data:any)=>{
        this.post=data; 
        this.isLoading = false;
        console.log(data);   
      },
      error:(error:any)=>{
        console.log(error);  
      }
      })

    }


}
