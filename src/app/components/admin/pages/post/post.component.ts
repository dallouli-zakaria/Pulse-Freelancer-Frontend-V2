import { Component } from '@angular/core';
import { PostTableComponent } from '../../table/post-table/post-table.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrl: './post.component.css'
})
export class PostComponent {
  
showadd=false
show=false

onAdd(): void {
  this.show = true;
    this.showadd = true;
}
  onCloseModal(): void {
    this.show = false;
    this.showadd = false;
   
  }
}
