import { Component } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrl: './role.component.css'
})
export class RoleComponent {

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
