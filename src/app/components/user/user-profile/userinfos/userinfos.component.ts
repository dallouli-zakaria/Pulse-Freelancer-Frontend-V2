import { Component } from '@angular/core';

@Component({
  selector: 'app-userinfos',
  templateUrl: './userinfos.component.html',
  styleUrl: './userinfos.component.css'
})
export class UserinfosComponent {
  isModalOpen = false;
  isModalOpen2 = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }
  openModal2() {
    this.isModalOpen2 = true;
  }
  closeModal2() {
    this.isModalOpen2 = false;
  }

}
