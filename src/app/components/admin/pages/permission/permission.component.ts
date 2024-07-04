import { Component } from '@angular/core';

@Component({
  selector: 'app-permission',
  templateUrl: './permission.component.html',
  styleUrl: './permission.component.css'
})
export class PermissionComponent {

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
