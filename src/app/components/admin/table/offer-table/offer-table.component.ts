import { Component } from '@angular/core';

@Component({
  selector: 'app-offer-table',
  templateUrl: './offer-table.component.html',
  styleUrl: './offer-table.component.css'
})
export class OfferTableComponent {

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
