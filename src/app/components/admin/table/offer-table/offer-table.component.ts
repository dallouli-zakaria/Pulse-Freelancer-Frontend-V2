import { Component, inject } from '@angular/core';
import { Offer } from '../../../../core/models/Offer';
import { Observable } from 'rxjs';
import { OffersService } from '../../../../core/services/offers.service';

@Component({
  selector: 'app-offer-table',
  templateUrl: './offer-table.component.html',
  styleUrl: './offer-table.component.css'
})
export class OfferTableComponent {
 
  slecteID!:number;
  selectedData?:Offer
  
  trackFreelancer(user:any,id:number){
   this.slecteID=id;
   this.selectedData=user; 
  }
  offers:Offer[]=[]

  private offerService:OffersService= inject(OffersService)
    ngOnInit(): void {
  
  this.index()
  
    }

  
   
  
  index(){
    this.offerService.index()
    this.offerService.offer$.subscribe({
      next:(data:any)=>{this.offers=data;console.log(data);
      },
      error:(error:any)=>{console.log(error);
      },
      complete:()=>console.log('end operation get data')
      
    });}
  //manage page edite delete and details for assingnig 
  show = false;
  showedit = false;
  showedelete = false;
  
  
  onEdited(): void {
 
  this.show = true;
  this.showedit = true;
  this.showedelete = false;
  }
  
  ondeleted(): void {
 
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
