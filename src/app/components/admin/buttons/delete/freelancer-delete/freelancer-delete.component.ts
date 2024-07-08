import { Component, EventEmitter, Input, Output, input } from '@angular/core';
import { FreelancerService } from '../../../../../core/services/freelancer.service';

@Component({
  selector: 'app-freelancer-delete',
  templateUrl: './freelancer-delete.component.html',
  styleUrl: './freelancer-delete.component.css'
})
export class FreelancerDeleteComponent {
  @Input() freelancerID!:number
  @Input() freelancerData:any
  errorhandling: any;
constructor(private freelnacerServices:FreelancerService){}

@Output() closeModal = new EventEmitter<void>();
close(): void {
  this.closeModal.emit();
}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  
}

deleted(){
  console.log(this.freelancerID);
  if(this.freelancerID !==null){
    this.freelnacerServices.delete(this.freelancerID).subscribe({
    next:()=>{
     this.freelnacerServices.index()},
     error:(error)=>{console.log(error); if ( error.error.errors) {
      this.errorhandling = Object.values(error.error.errors).flat();
    } else {
      this.errorhandling = [error.message || 'An error occurred'];
    }
     }
     
  })}
  }


}
