import { Component, EventEmitter, Output } from '@angular/core';
import { PostsService } from '../../../../core/services/posts.service';

@Component({
  selector: 'app-post-cart',
  templateUrl: './post-cart.component.html',
  styleUrl: './post-cart.component.css'
})
export class PostCartComponent {
  @Output() datapost:any=new EventEmitter<number>()
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
      next:(data:any)=>{this.post=data
        this.datapost.emit(this.post)
      },
      error:(error:any)=>console.log(error),
      complete:()=>console.log('cpmplet')
      
      
    })
   }
}
