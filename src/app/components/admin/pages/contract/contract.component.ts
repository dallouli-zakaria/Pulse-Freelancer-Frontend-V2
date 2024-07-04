import { Component } from '@angular/core';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrl: './contract.component.css'
})
export class ContractComponent {

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
