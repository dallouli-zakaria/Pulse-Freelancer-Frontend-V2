import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostsService } from '../../../../../core/services/posts.service';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrl: './post-edit.component.css'
})
export class PostEditComponent {
  @Input() postId!:number
  @Input() posetObject:any
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
      Periodvalue: ['', [Validators.required, Validators.min(1)]],
      budget: ['', Validators.required],
      Budgetvalue: ['', [Validators.required, Validators.min(0)]],
      client_id: ['', [Validators.required, Validators.min(1)]],
      created_at: ['', Validators.required]
    })
  }
  
  
  
  edit(){
   if(this.form.valid){
    this.postService.update(this.form.value,this.postId).subscribe({
      next:(data)=>{console.log(data);
       this.postService.index()},
      error:(error)=>console.log(error),
      complete:()=>console.log('end operation add')
      
      
    })
   }
  
  }
}
