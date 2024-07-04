import { Component } from '@angular/core';

@Component({
  selector: 'app-mailing',
  templateUrl: './mailing.component.html',
  styleUrl: './mailing.component.css'
})
export class MailingComponent {

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
