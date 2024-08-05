import { Component } from '@angular/core';
import { Post } from '../../../../core/models/post';
import { PostsService } from '../../../../core/services/posts.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-table',
  templateUrl: './post-table.component.html',
  styleUrl: './post-table.component.css'
})
export class PostTableComponent {
 
  post:Post[]=[]
  constructor(private postService:PostsService,private router: Router){}
  postobservable!:Observable<Post[]>
  selectedId!:number
  selectedObject:any;
  dataStatus!: string;
  isLoading = true;
  ngOnInit(): void {
    this.index();
    this.getdata();
  
  }

  trackPost(id:number,data:any){
   this.selectedId=id;
   this.selectedObject=data
  }
  index(){
    this.postService.index().subscribe({
      next:(data:any)=>{
        this.post=data;
        this.isLoading = false;
      
      },
      error:(error:any)=>console.log(error),
      complete:()=>console.log('end operation post Data')    
    })
  }


  getdata() {
    const currentUrl = this.router.url;
    console.log('Current URL:', currentUrl);
    if (currentUrl === '/admin/post-waiting') {
      this.dataStatus = 'waiting';
    } else if(currentUrl === '/admin/post-closed'){
      this.dataStatus = 'closed';
    } else if(currentUrl === '/admin/post-open'){
      this.dataStatus = 'open';
    }
  }









































 

  // sendid(id:any){
  // const postId=id

  // }
  
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
  
