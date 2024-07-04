import { Component } from '@angular/core';
import { Post } from '../../../../core/models/post';
import { PostsService } from '../../../../core/services/posts.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrl: './post-table.component.css'
})
export class PostTableComponent {
 
  post:Post[]=[]
  constructor(private postService:PostsService){}
  postobservable!:Observable<Post[]>
  selectedId!:number
  selectedObject:any
  ngOnInit(): void {
    this.index()
   this.postobservable=this.postService.postData
    
  }

  trackPost(id:number,data:any){
   this.selectedId=id;
   this.selectedObject=data
  }
  index(){
    this.postService.index();
    this.postService.postData.subscribe({
      next:(data)=>{this.post=data},
      error:(error)=>console.log(error),
      complete:()=>console.log('end operation post Data')    
    })
  }


  //manage page edite delete and details for assingnig 
show = false;
showedit = false;
showedelete = false;


onEdited(id: number, role: any): void {
this.selectedId = id;
this.selectedObject= role;
this.show = true;
this.showedit = true;
this.showedelete = false;
}

ondeleted(id: number, role: any): void {
this.selectedId = id;
this.selectedObject = role;
this.show = true;
this.showedelete = true;
this.showedit = false;

}
          
onCloseModal(): void {
this.show = false;
this.showedit = false;
this.showedelete = false;
}
//end manage pages

  }
  
