import { Component, Input } from '@angular/core';
import { PostsService } from '../../../../../core/services/posts.service';

@Component({
  selector: 'app-post-delete',
  templateUrl: './post-delete.component.html',
  styleUrl: './post-delete.component.css'
})
export class PostDeleteComponent {
  @Input() postId!:number
  @Input() posetObject:any
  constructor(private postServices:PostsService){
}

deleted(){
  this.postServices.delete(this.postId).subscribe(
    {
      next:(data)=>{console.log(data);
        this.postServices.index();
      },
      error:(error:any)=>console.log(error),
      complete:()=>console.log("end operation delete")
      
    }
  )
}


}
