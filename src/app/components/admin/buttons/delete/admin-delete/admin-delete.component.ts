import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../../../../core/services/user.service';
import { User } from '../../../../../core/models/User';

@Component({
  selector: 'app-admin-delete',
  templateUrl: './admin-delete.component.html',
  styleUrl: './admin-delete.component.css'
})
export class AdminDeleteComponent {
@Input() userId!:number
@Input() userData:any

@Output() closeModal = new EventEmitter<void>();
  errorhandling: any;
close(): void {
  this.closeModal.emit();
}
constructor(private userservice:UserService){}

deleted(){
  if(this.userId==null ){
    console.log(this.userId);
    
    this.userservice.delete(this.userId).subscribe({
      next:(data:any)=>{this.userservice.index();
        this.close();
      },
      error:(error:any)=>{;
        if ( error.error.errors) {
          this.errorhandling = Object.values(error.error.errors).flat();
        } else {
          this.errorhandling = [error.message || 'An error occurred'];
        }
      },
      complete:()=>console.log()
      
      
    })
  }
}


}
