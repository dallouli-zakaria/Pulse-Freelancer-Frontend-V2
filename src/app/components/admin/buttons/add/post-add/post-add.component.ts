import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../../../../core/services/posts.service';

@Component({
  selector: 'app-post-add',
  templateUrl: './post-add.component.html',
  styleUrl: './post-add.component.css'
})
export class PostAddComponent {
form!:FormGroup
constructor(private postService:PostsService,private fb:FormBuilder){}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.form=this.fb.group({
    title: ['', Validators.required],
    location: ['', Validators.required],
    type: ['', Validators.required],
    description: ['', Validators.required],
    period: ['', Validators.required],
    Periodvalue: ['', [Validators.required]],
    budget: ['', Validators.required],
    Budgetvalue: ['', [Validators.required]],
    client_id: ['', [Validators.required]]
  })
}



add(){
 if(this.form.valid){
  const clientId = this.form.get('client_id')?.value;
  this.postService.addpost(this.form.value,clientId).subscribe({
    next:(data:any)=>{console.log(data);
     this.postService.index()},
    error:(error:any)=>console.log(error),
    complete:()=>console.log('end operation add')
    
    
  })
 }

}
}
