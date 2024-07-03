import { Component } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';

@Component({
  selector: 'app-post-cart',
  templateUrl: './post-cart.component.html',
  styleUrl: './post-cart.component.css'
})
export class PostCartComponent {
  post:any
  constructor(private postservice:PostsService){
  }
  
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.count();
  }
   count(){
    this.postservice.count().subscribe({
    next:(data:any)=>{
      this.post=data;
      console.log(data);  
    },
    error:(error:any)=>{
  console.log(error);
  
    },
    complet:()=>console.log('end operation')
    })
   }
}
