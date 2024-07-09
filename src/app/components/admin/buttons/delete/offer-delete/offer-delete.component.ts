import { Component, EventEmitter, Input, Output } from '@angular/core';
import { OffersService } from '../../../../../core/services/offers.service';

@Component({
  selector: 'app-offer-delete',
  templateUrl: './offer-delete.component.html',
  styleUrl: './offer-delete.component.css'
})
export class OfferDeleteComponent {
  @Input() offerID!:number
  @Input() offerData:any
  errorhandling: any;
constructor(private offerService:OffersService){}

@Output() closeModal = new EventEmitter<void>();
close(): void {
  this.closeModal.emit();
}
ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  
}

deleted(){
  console.log(this.offerID);
  if(this.offerID !==null){
    this.offerService.delete(this.offerID).subscribe({
    next:(data)=>{console.log(data);
    
    },
     error:(error:any)=>{console.log(error); if ( error.error.errors) {
      this.errorhandling = Object.values(error.error.errors).flat();
    } else {
      this.errorhandling = [error.message || 'An error occurred'];
    }
     }
     
  })}

}}