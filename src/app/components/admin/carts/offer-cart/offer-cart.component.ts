import { Component } from '@angular/core';
import { OffersService } from '../../../../core/services/offers.service';

@Component({
  selector: 'app-offer-cart',
  templateUrl: './offer-cart.component.html',
  styleUrl: './offer-cart.component.css'
})
export class OfferCartComponent {
offer:any
constructor(private offers:OffersService){
}

ngOnInit(): void {
  //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
  //Add 'implements OnInit' to the class.
  this.count();
}
 count(){
  this.offers.count().subscribe({
  next:(data:any)=>{
    this.offer=data;
    console.log(data);  
  },
  error:(error:any)=>{
console.log(error);

  },
  complet:()=>console.log('end operation')
  })
 }

}
