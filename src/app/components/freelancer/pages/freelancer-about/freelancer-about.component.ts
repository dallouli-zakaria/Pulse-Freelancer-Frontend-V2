import { Component } from '@angular/core';
import { Freelancer } from '../../../../core/models/Freelancer';
import { AuthService } from '../../../../core/services/auth.service';
import { FreelancerService } from '../../../../core/services/freelancer.service';

@Component({
  selector: 'app-freelancer-about',
  templateUrl: './freelancer-about.component.html',
  styleUrl: './freelancer-about.component.css',
})
export class FreelancerAboutComponent {
  displayEdit = 'none';

  freelancername!: string;
  isLoading = false;
  freelancerId!: number;
  freelancerdata?: Freelancer;

  constructor(
    private freelancerService: FreelancerService,
    private authService: AuthService
  ) {
    this.getFreelancer();
  }

  //get freelancer details
  getFreelancer() {
    this.isLoading = true;
    this.freelancerId = this.authService.parseID();
    this.freelancerService.show(this.freelancerId);
    this.freelancerService.freelancers$.subscribe({
      next: (data: any) => {
        this.freelancerdata = data;
        this.isLoading = false;
        console.log(this.freelancerdata);
      },
      error: (error: any) => console.log(error),
      complete: () => console.log('get freelancer done'),
    });
  }

  ngOnInit(): void {}
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
