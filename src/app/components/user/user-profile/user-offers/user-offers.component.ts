import { Component } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

@Component({
  selector: 'app-user-offers',
  templateUrl: './user-offers.component.html',
  styleUrl: './user-offers.component.css'
})
export class UserOffersComponent {

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
