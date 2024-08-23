import { Component, OnInit, inject } from '@angular/core';
import { ClientService } from '../../../../core/services/client.service';
import { Client } from '../../../../core/models/Client';
import { Observable, Subscription } from 'rxjs';
import { PaginatedResponse } from '../../../../core/models/PaginatedResponse';

@Component({
  selector: 'app-client-table',
  templateUrl: './client-table.component.html',
  styleUrl: './client-table.component.css'
})
export class ClientTableComponent implements OnInit {

  clients: Client[] = [];
  filteredCleint: Client[] = [];
  currentPage = 1;
  totalPages = 5;
  isLoading = true;
  searchTerm: string = '';
  private searchSubscription: Subscription | null = null;

 

  private clientSe : ClientService = inject(ClientService);
  
 
 listClient!:Observable<Client[]>

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class. 

   this.loadClient(this.currentPage);
   
  }
    selecteID!:number;
    selecteName!:Client
    selecteProfession:any

    trackClient(user:any,id:number){ 
       this.selecteName=user
       this.selecteID=id
    }

    loadClient(page: number): void {
      this.isLoading = true;
      this.clientSe.fetchPaginatedClient(page)
      this.clientSe.getData$.subscribe({
        next: (response:any) => {
          this.clients = response.data;
          this.filteredCleint = this.clients; // Initialize filtered list
          this.totalPages = response.last_page;
          this.currentPage = response.current_page;
          this.isLoading = false;
        },
        error: (error: any) => {
          console.error(error);
          this.isLoading = false;
        },
        complete: () => console.log('End operation get data')
      });
    }
    onPageChange(page: number): void {
      if (page >= 1 && page <= this.totalPages) {
        this.loadClient(page);
      }
    }
    

    filterClient(): void {
      // Annuler l'abonnement précédent, s'il existe
      if (this.searchSubscription) {
        this.searchSubscription.unsubscribe();
      }
  
      if (!this.searchTerm || this.searchTerm.trim() === '') {
        // Si le champ de recherche est vide, afficher tous les clients avec un léger délai
        setTimeout(() => {
          this.filteredCleint = this.clients;
        }, 100); // 100ms de délai pour s'assurer que l'UI a le temps de se mettre à jour
        return;
      }
  
      // Sinon, effectuer la recherche avec le terme fourni
      this.searchSubscription = this.clientSe.searchClient(this.searchTerm).subscribe({
        next: (client: Client[]) => {
          this.filteredCleint = client;
          console.log(this.filteredCleint);
        },
        error: (error: any) => {
          console.error(error);
        }
      });
    }

    
  //manage page edite delete and details for assingnig 
show = false;
showedit = false;
showedelete = false;


onEdited(id: number, role: any): void {
this.selecteID = id;
this.selecteName= role;
this.show = true;
this.showedit = true;
this.showedelete = false;
}

ondeleted(id: number, role: any): void {
  this.selecteID = id;
  this.selecteName= role;
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

onSearchTermChange(): void {
  this.filterClient();
}
}
