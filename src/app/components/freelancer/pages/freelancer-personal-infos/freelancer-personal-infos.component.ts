import { Component, OnInit } from '@angular/core';
import { Freelancer } from '../../../../core/models/Freelancer';
import { AuthService } from '../../../../core/services/auth.service';
import { FreelancerService } from '../../../../core/services/freelancer.service';

@Component({
  selector: 'app-freelancer-personal-infos',
  templateUrl: './freelancer-personal-infos.component.html',
  styleUrl: './freelancer-personal-infos.component.css',
})
export class FreelancerPersonalInfosComponent implements OnInit {
  freelancername!: string;
  isLoading = false;
  freelancerId!: number;
  freelancerdata?: Freelancer;
  displayEdit = 'none';
  errorhandling: any;

  constructor(
    private freelancerService: FreelancerService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.getFreelancer();
  }

  //show freelancer details
  getFreelancer() {
    this.isLoading = true;
    this.freelancerId = this.authService.parseID();
    this.freelancerService.show(this.freelancerId);
    this.freelancerService.freelancers$.subscribe({
      next: (data: any) => {
        this.freelancerdata = data;
        console.log(this.freelancerdata);

        this.isLoading = false;
      },
      error: (error: any) => {
        if (error.error.errors) {
          this.errorhandling = Object.values(error.error.errors).flat();
          console.log(this.errorhandling);
        } else {
          this.errorhandling = [error.message || 'An error occurred'];
          console.log(this.errorhandling);
        }
      },

      complete: () => console.log('get freelancer done'),
    });
  }

  selectedData: any;
  selectedID!: any;
  openModalEdit(freelancer: any, id: any) {
    this.selectedData = freelancer;
    this.selectedID = id;
    this.displayEdit = 'block';
  }


  show: boolean = false;
  selecteName: any;
  showedit: boolean = false;
  onEdited(id: any, object: any): void {
    this.selectedID = id;
    this.selectedData = object;
    this.show = true;
    this.showedit = true;
  }
  onCloseModal(): void {
    this.show = false;
    this.showedit = false;
  }
}
