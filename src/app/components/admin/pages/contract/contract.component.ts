import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent {
  showContractAdd = false;
  showContractAddF = false;

  ContractAdd(): void {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: "btn btn-outline-primary mr-2",
        cancelButton: "btn btn-primary ml-2",
        actions: 'my-actions',
      },
      buttonsStyling: false
    });

    swalWithBootstrapButtons.fire({
      title: "Création du contrat",
      text: "Choisissez votre utilisateur",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Freelancer",
      cancelButtonText: "Client",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.showContractAddF = true;
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.showContractAdd = true;
      }
    });
  }

  onCloseModal2(): void {
    this.showContractAdd = false;
    this.showContractAddF = false;
  }
}