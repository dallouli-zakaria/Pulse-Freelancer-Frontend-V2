import { Component, EventEmitter, Input, input, Output } from '@angular/core';
import { UserService } from '../../../../../core/services/user.service';

@Component({
  selector: 'app-users-delete',
  templateUrl: './users-delete.component.html',
  styleUrl: './users-delete.component.css'
})
export class UsersDeleteComponent {

  @Input() userID!:number;
  @Input() userdata:any;
  errorhandling:any;
constructor(private userServices:UserService){}
  @Output() closeModal = new EventEmitter<void>();
  close(): void {
    this.closeModal.emit();
  }


deleted(){
  console.log(this.userID,'-----------');
  this.userServices.delete(this.userID).subscribe({
    next:()=>{this.close()},
    error:(error)=>{console.log(error);
      if ( error.error.errors) {
        this.errorhandling = Object.values(error.error.errors).flat();
      } else {
        this.errorhandling = [error.message || 'An error occurred'];
      }

    }
  })
  
}


}
