import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { Freelancer } from '../../../../core/models/Freelancer';
import { Post } from '../../../../core/models/post';
import { AuthService } from '../../../../core/services/auth.service';
import { ClientService } from '../../../../core/services/client.service';
import { FreelancerService } from '../../../../core/services/freelancer.service';
import { OffersService } from '../../../../core/services/offers.service';
import { PostsService } from '../../../../core/services/posts.service';

@Component({
  selector: 'app-freelancer-view-post-details',
  templateUrl: './freelancer-view-post-details.component.html',
  styleUrl: './freelancer-view-post-details.component.css'
})
export class FreelancerViewPostDetailsComponent implements OnInit,OnChanges{
  @Input() postId: number | null = null;
  isLoading: boolean = true;
  freelancerId: number = this.authservice.parseID();
  freelancerdata!: Freelancer;
  postdata?: Post;
  clientid!: number;
  company_name!: string;
  freelancerstatus!: string;
  offerExists: boolean | null = null;

  successMessage: string = '';
  isButtonDisabled: boolean = false;

  constructor(
    private authservice: AuthService,
    public freelancerservice: FreelancerService,
    private postservice: PostsService,
    private clientservice: ClientService,
    private offerservice: OffersService,
    private router: Router
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postId'] && this.postId !== null) {
      this.isLoading = true;
      this.getfreelancer();
      this.getposts();
      this.truefalse(this.postId);
    }
  }

  ngOnInit(): void {}

  getposts() {
    if (this.postId !== null) {
      this.postservice.show(this.postId).subscribe((res) => {
        this.postdata = res;
        this.clientid = res.client_id;
        this.getclient(this.clientid);
        this.truefalse(this.postId);
      });
    }
  }

  getclient(clientId: number) {
    this.clientservice.show(clientId).subscribe((res) => {
      this.company_name = res.company_name;
      this.isLoading = false;
      console.log(res);
    });
  }

  postuler() {
    this.isButtonDisabled = true; // Show "Envoi..." on button
    let data = {
      selected: this.company_name,
      freelancer_id: this.freelancerId,
      post_id: this.postId
    };

    this.offerservice.store(data).subscribe((res) => {
      this.successMessage = 'Vous avez postulé avec succès!';
      this.offerExists = true; // Mark offer as existing
      this.isButtonDisabled = false; // Reset button state if needed
      // this.router.navigate(['../pulse/freelancer-dashboard/freelancer-offers']);
    });
  }

  truefalse(postId: any) {
    this.postservice.checkFreelancerOffer(postId, this.freelancerId).subscribe(response => {
      this.offerExists = response.offer_exists;
    }, error => {
      console.error('Error checking freelancer offer', error);
    });
  }

  getfreelancer() {
    this.freelancerservice.show(this.freelancerId).subscribe((res) => {
      this.freelancerstatus = res.status;
    });
  }
}
