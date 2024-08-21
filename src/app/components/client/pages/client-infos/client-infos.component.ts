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

  // Selected client details for modals
  clientdetails!: Client;

  constructor(
    private clientservice: ClientService,
    private authservice: AuthService,
    private loadingservice: LoadingService
  ) {}


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

  //Edit client details modal
  showedit:boolean=false;

  openModal(client: any) {
    this.clientdetails = client;
    this.showedit = true;
  }

  closeModal() {
    this.showedit = false;
  }

  //Edit Company details modal
  showedit2:boolean=false;

  openModal2(client: any) {
    this.clientdetails = client;
    this.showedit2 = true;
  }

  closeModal2() {
    // this.isModalOpen = false;
    this.showedit2 = false;
  }
  
}
