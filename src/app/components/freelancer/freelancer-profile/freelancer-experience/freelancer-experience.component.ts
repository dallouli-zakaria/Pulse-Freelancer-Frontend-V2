import { Permission } from './../../../../core/models/Permission';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ExperienceService } from '../../../../core/services/experience.service';
import { AuthService } from '../../../../core/services/auth.service';
import { Experience } from '../../../../core/models/experience';
import { Observable } from 'rxjs';
import { FreelancerAddExperienceComponent } from './freelancer-add-experience/freelancer-add-experience.component';
import { FreelancerUpdateExperienceComponent } from './freelancer-update-experience/freelancer-update-experience.component';

@Component({
  selector: 'app-freelancer-experience',
  templateUrl: './freelancer-experience.component.html',
  styleUrl: './freelancer-experience.component.css'
})
export class FreelancerExperienceComponent implements OnInit{
  displayAdd = "none";
  displayEdit = "none";
  displayDelete="none"
  experienceData?:Experience[]
  experienceToDeleteId!: number;
  isSubmitting = false; 
  freelancerId:number=this.authserice.parseID();
  listExperience!:Observable<Experience[]>
  @ViewChild(FreelancerAddExperienceComponent) addExperienceComponent!: FreelancerAddExperienceComponent;
  @ViewChild(FreelancerUpdateExperienceComponent) updateExperienceComponent!: FreelancerUpdateExperienceComponent;

  constructor(private experienceservice:ExperienceService,private authserice :AuthService){}
  ngOnInit(): void {
    this.getdata();
    this.listExperience=this.experienceservice.experienceData;
  }

  openModalAdd() {
      this.displayAdd = "block";
      
    }
  onCloseHandledAdd() {
    this.getdata();
    this.displayAdd = "none";
  }

  openModalEdit(experience:Experience) {
      this.displayEdit = "block";
      this.updateExperienceComponent.setExperienceToUpdate(experience);
    }
  onCloseHandledEdit() {
    this.displayEdit = "none";
  }
  getdata(){
    this.experienceservice.showByFreelancer(this.freelancerId).subscribe({next:(res)=>{
      this.experienceData=res;
      console.log(res)},
      error: (error) => console.error('Error fetching experiences:', error)
      
    })
  }

  getYear(dateString: string): string {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  }

  onExperienceUpdated() {
    this.getdata();
    this.onCloseHandledEdit();
  }

  onExperienceAdded() {
    this.getdata();
    this.onCloseHandledAdd();
  }


  openDeleteModal(id: number) {
    this.experienceToDeleteId = id;
    this.displayDelete = "block";
  }

  onCloseHandledDelete() {
    this.displayDelete = "none";
  }

  confirmDeleteExperience() {
    if (this.experienceToDeleteId) {
      this.experienceservice.delete(this.experienceToDeleteId).subscribe({
        next: () => {
          this.getdata(); 
          this.onCloseHandledDelete();
        },
        error: (error) => {
          console.error('Error deleting experience:', error);
          this.onCloseHandledDelete();
        }
      });
    }
  }

  

}
