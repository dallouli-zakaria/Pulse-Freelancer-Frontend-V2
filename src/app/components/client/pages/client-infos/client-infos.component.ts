import { Component } from '@angular/core';
import { Client } from '../../../../core/models/Client';
import { AuthService } from '../../../../core/services/auth.service';
import { ClientService } from '../../../../core/services/client.service';
import { LoadingService } from '../../../../core/services/loading.service';

@Component({
  selector: 'app-client-infos',
  templateUrl: './client-infos.component.html',
  styleUrl: './client-infos.component.css',
})
export class ClientInfosComponent {
  // Client data
  client?: Client;
  clientId!: number;

  // UI control
  isLoading = true;
  isModalOpen = false;
  isModalOpen2 = false;

  // Selected client details for modals
  clientdetails!: Client;

  constructor(
    private clientservice: ClientService,
    private authservice: AuthService,
    private loadingservice: LoadingService
  ) {}

  openModal(client: any) {
    this.clientdetails = client;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  openModal2(client: any) {
    this.clientdetails = client;
    this.isModalOpen2 = true;
  }
  closeModal2() {
    this.isModalOpen2 = false;
  }

  ngOnInit(): void {
    this.getclient();
  }


  // Fetch client data
  
  getclient() {
    this.loadingservice.hide();
    this.clientId = this.authservice.parseID();
    this.clientservice.show(this.clientId);
    this.clientservice.getData$.subscribe({
      next: (data: any) => {
        this.client = data;
        this.isLoading = false;
      },
      error: (error: any) => console.log(error),
      complete: () => console.log('get client done'),
    });
  }
}
