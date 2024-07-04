import { Component, EventEmitter, Input, Output } from '@angular/core';
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

@Output() closeModal = new EventEmitter<void>();
close(): void {
  this.closeModal.emit();
}
deleted(){
  this.postServices.delete(this.postId).subscribe(
    {
      next:(data)=>{console.log(data);
        this.postServices.index();
        this.close();
      },
      error:(error:any)=>console.log(error),
      complete:()=>console.log("end operation delete")
      
    }
  )
}


}
