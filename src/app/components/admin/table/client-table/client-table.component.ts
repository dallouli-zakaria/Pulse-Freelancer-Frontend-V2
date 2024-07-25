import { Component, OnInit, inject } from '@angular/core';
import { ClientService } from '../../../../core/services/client.service';
import { Client } from '../../../../core/models/Client';
import { Observable } from 'rxjs';
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
      this.clientSe.fetchPaginatedClient(page).subscribe({
        next: (response: PaginatedResponse<Client>) => {
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


}
