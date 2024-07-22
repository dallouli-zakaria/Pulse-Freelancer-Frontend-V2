import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Experience } from '../../../../core/models/experience';
import { AuthService } from '../../../../core/services/auth.service';
import { ExperienceService } from '../../../../core/services/experience.service';
import { FreelancerAddExperienceComponent } from '../../actions/freelancer-add-experience/freelancer-add-experience.component';
import { FreelancerUpdateExperienceComponent } from '../../actions/freelancer-update-experience/freelancer-update-experience.component';

@Component({
  selector: 'app-freelancer-experience',
  templateUrl: './freelancer-experience.component.html',
  styleUrls: ['./freelancer-experience.component.css']
})
export class FreelancerExperienceComponent implements OnInit {
  displayAdd = "none";
  displayEdit = "none";
  displayDelete = "none";
  isLoading = false;
  experienceData: Experience[]=[];
  experienceToDeleteId!: number;
  isSubmitting = false;
  freelancerId: number = this.authService.parseID();
  listExperience!: Observable<Experience[]>;
  @ViewChild(FreelancerAddExperienceComponent) addExperienceComponent!: FreelancerAddExperienceComponent;
  @ViewChild(FreelancerUpdateExperienceComponent) updateExperienceComponent!: FreelancerUpdateExperienceComponent;

  constructor(private experienceService: ExperienceService, private authService: AuthService) { }

  ngOnInit(): void {
    this.getData();
    this.listExperience = this.experienceService.experienceData;
  }

  openModalAdd() {
    this.displayAdd = "block";
  }

  onCloseHandledAdd() {
    this.getData();
    this.displayAdd = "none";
  }

  openModalEdit(experience: Experience) {
    this.displayEdit = "block";
    this.updateExperienceComponent.setExperienceToUpdate(experience);
  }

  onCloseHandledEdit() {
    this.displayEdit = "none";
  }

  getData() {
    this.isLoading = true;
    this.experienceService.showByFreelancer(this.freelancerId).subscribe({
      next: (res) => {
        this.experienceData = res;
        console.log(res);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error fetching experiences:', error);
        this.isLoading = false;
      }
    });
  }

  getYear(dateString: string): string {
    const date = new Date(dateString);
    return date.getFullYear().toString();
  }

  onExperienceUpdated() {
    this.getData();
    this.onCloseHandledEdit();
  }

  onExperienceAdded() {
    this.getData();
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
    this.isSubmitting = true;
    if (this.experienceToDeleteId) {
      this.experienceService.delete(this.experienceToDeleteId).subscribe({
        next: (data:any) => {
          console.log(data);
          
          this.getData();
          this.onCloseHandledDelete();
          this.experienceService.index();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error deleting experience:', error);
          this.onCloseHandledDelete();
          this.isSubmitting = false;
        }
      });
    }
  }
}
