import { Component } from '@angular/core';
import { PostsService } from '../../../core/services/posts.service';
import { AuthService } from '../../../core/services/auth.service';
import { Post } from '../../../core/models/post';
import { ClientService } from '../../../core/services/client.service';

@Component({
  selector: 'app-view-offers',
  templateUrl: './view-offers.component.html',
  styleUrl: './view-offers.component.css'
})
export class ViewOffersComponent {

  posts:Post[]=[];
  freelancerid:number=this.authservice.parseID();
  company_name!: string;
  clientId!:number;
  constructor(private postsService:PostsService,private authservice:AuthService,private clientservice:ClientService){
    this.getposts();
  }




  selectedPostId: number | null = null;

  selectPostId(postId: number) {
    this.selectedPostId = postId;
  }

  getposts(){
    this.postsService.index();
    this.postsService.postData.subscribe((res)=>{
      this.posts=res;
      
      
    })
  }

  getclient(clientId: number) {
    this.clientservice.show(clientId).subscribe((res) => {
      this.company_name = res.company_name;
      console.log(res);
    });
  }

  


}
