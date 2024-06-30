import { Component } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';
import { Post } from '../../../../core/models/post';

@Component({
  selector: 'app-user-offers',
  templateUrl: './user-offers.component.html',
  styleUrl: './user-offers.component.css'
})
export class UserOffersComponent {

  postid:number=1;
  post: Post[] = [];

  constructor(private  postservice:PostsService){
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
      this.postservice.index()
      this.postservice.postData.subscribe({
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
