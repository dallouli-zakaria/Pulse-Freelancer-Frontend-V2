import { Component, OnInit } from '@angular/core';
import { User } from '../../../../core/models/User';
import { UserService } from '../../../../core/services/user.service';
import { Observable } from 'rxjs';

import { id } from 'date-fns/locale';
import { PaginatedResponse } from '../../../../core/models/PaginatedResponse';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrl: './users-table.component.css'
})
export class UsersTableComponent implements OnInit{
  users:User[]=[];
 
  constructor(private userService:UserService){}
    subject!:Observable<User[]>
   selectUser:any
   selectedId!:number
   filteredUser: User[] = [];
   currentPage = 1;
   totalPages = 5;
   isLoading = true;
   searchTerm: string = '';
   
  ngOnInit(): void {
    this.loadFreelancers(this.currentPage);
  
    
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

    this.subject=this.userService.getData 
  
  }
  
  loadFreelancers(page: number): void {
    this.isLoading = true;
    this.userService.fetchPaginatedUser(page).subscribe({
      next: (response: PaginatedResponse<User>) => {
        this.users = response.data;
        this.filteredUser = this.users; // Initialize filtered list
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
      this.loadFreelancers(page);
    }
  }


  
//manage page edite delete and details for assingnig 
show = false;
showedit = false;
showedelete = false;
showdetails= false

onEdited(id:number ,user: any): void {
  this.selectUser=user;
  this.selectedId=id
this.show = true;
this.showedit = true;
this.showedelete = false;
}

ondeleted(id:number, user: any): void {
  this.selectUser=user
  this.selectedId=id
this.show = true;
this.showedelete = true;
this.showedit = false;
this.showdetails = false;
}
ondetails( user: any): void {
  this.selectUser=user;
  
this.show = true;
this.showedelete = false;
this.showedit = false;
this.showdetails= true;
}
          
onCloseModal(): void {
this.show = false;
this.showedit = false;
this.showedelete = false;
this.showdetails= false;
}
//end manage pages
}
