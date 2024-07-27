import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Client } from '../../../../core/models/Client';
import { Post } from '../../../../core/models/post';
import { AuthService } from '../../../../core/services/auth.service';
import { PostsService } from '../../../../core/services/posts.service';
import { OffersService } from '../../../../core/services/offers.service';
import { Offer } from '../../../../core/models/Offer';

@Component({
  selector: 'app-client-post-details',
  templateUrl: './client-post-details.component.html',
  styleUrls: ['./client-post-details.component.css']
})
export class ClientPostDetailsComponent implements OnInit {
  isOfferClosed: boolean = true;
  validatedFreelancers: Set<number> = new Set<number>();
  disqualifiedFreelancer: Set<number> = new Set<number>();
  postId!: number;
  post!: Post;
  postdetails!: any;
  isLoading: boolean = true;
  roles!: string;
  freelancers: any[] = [];
  isAuthenticated: boolean = false;
  client!: Client; 
  offer!: any;
  freelancertrue: any[] = [];
  freelancerfalse: any[] = [];
  freelancerDeclined: any[] = [];
  selectedFreelancerId!: number;
  status!: string;
  progress: number = 25;
  progressText: string = '';
  offerExists: boolean | null = null;
  disabledbutton:boolean=true;
  disabledbutton2:boolean=false;
  steps = [
    { label: 'Ouvert', progress: 25 },
    { label: 'En cours', progress: 50 },
    { label: 'En attente', progress: 75 },
    { label: 'Terminé', progress: 100 }
  ];

  constructor(
    private route: ActivatedRoute, 
    private postService: PostsService,
    private authService: AuthService,
    private offerservice: OffersService,
  ) {}

  ngOnInit(): void {
    const postIdParam = this.route.snapshot.paramMap.get('postId');
    if (postIdParam !== null) {
      this.postId = +postIdParam;
      this.initializeData();
    } else {
      console.log("error");
    }

    this.isAuthenticated = this.authService.isLoggedIn();
    if (this.isAuthenticated) {
      this.authService.getUserRole().subscribe((res) => {
        this.roles = res;
      });
    }
  }

  initializeData(): void {
   
    this.fetchOfferDetails(this.postId);
    this.getFreelancers(this.postId);
    this.getclientdetails(this.postId);
    // this.getofferdetails(this.postId);
    this.getFreelancerFalse(this.postId);
    this.getFreelancerDeclined(this.postId);
    this.getFreelancerTrue(this.postId);
    this.checkifExists(this.postId);
  }

  trackdata(post_details: any): void {
    this.postdetails = post_details;
  }

  fetchOfferDetails(postId: number): void {
    this.postService.show(postId).subscribe(
      data => {
        this.post = data;
        this.isLoading = false;
        this.status = data.status;
        this.updateProgress(this.status);
        console.log(data);
      },
      error => {
        console.error('Error fetching offer details', error);
        this.isLoading = false;
      }
    );
  }

  updateProgress(status: any) {
    switch (status) {
      case 'open':
        this.progress = 25;
        this.progressText = 'ouvert';
        break;
      case 'in progress':
        this.progress = 50;
        this.progressText = 'en cours';
        break;
      case 'waiting':
        this.progress = 75;
        this.progressText = 'en attente';
        break;
      case 'closed':
        this.progress = 100;
        this.progressText = 'terminé';
        break;
      default:
        this.progress = 25;
        this.progressText = 'ouvert';
        break;
    }
  }

  getFreelancers(postId: number): void {
    this.postService.getFreelancersByPostId(postId).subscribe(
      (data) => {
        this.freelancers = data;
        console.log(this.freelancers);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getclientdetails(postId: number): void {
    this.postService.getClientDetailsByPostId(postId).subscribe(
      (data) => {
        this.client = data;
        console.log(this.client); 
      },
      (error) => {
        console.error('Failed to fetch clients:', error);
      }
    );
  }

  // getofferdetails(postId: number): void {
  //   this.offerservice.getOffersByPostId(postId).subscribe(
  //     (data) => {
  //       this.offer = data;
  //       console.log(this.offer); 
  //     },
  //     (error) => {
  //       console.error('Failed to fetch offer details:', error);
  //     }
  //   );
  // }

  show: boolean = false;
  showedit: boolean = false;

  onEdited(freelancerId: number): void {
    this.show = true;
    this.showedit = true; 
    this.selectedFreelancerId = freelancerId;
  }

  onCloseModal(): void {
    this.show = false;
    this.showedit = false;
  }

  validateFreelancer(index: number, offerId: number, singlefreelancerid: number): void {
    this.validatedFreelancers.add(index);
    this.offerservice.getOffersByPostAndFreelancer(offerId, singlefreelancerid).subscribe((res) => {
      const updateValue = { selected: 'true' };
      this.offerservice.update(res.id, updateValue).subscribe(
        (updatedOffer: Offer) => {
          console.log('Offer updated successfully:', updatedOffer);
          this.refreshTableData();
        },
        (error) => {
          console.error('Error updating offer:', error);
        }
      );
    });
  }

  disqualifyFreelancer(index: number, offerId: number, singlefreelancerid: number): void {
    this.disqualifiedFreelancer.add(index);
    this.offerservice.getOffersByPostAndFreelancer(offerId, singlefreelancerid).subscribe((res) => {
      const updateValue = { selected: 'false' };
      this.offerservice.update(res.id, updateValue).subscribe(
        (updatedOffer: Offer) => {
          console.log('Offer updated successfully:', updatedOffer);
          this.refreshTableData();
        },
        (error) => {
          console.error('Error updating offer:', error);
        }
      );
    });
  }


  declineFreelancer(index: number, offerId: number, singlefreelancerid: number): void {
    this.disabledbutton2=true;
    this.disqualifiedFreelancer.add(index);
    this.offerservice.getOffersByPostAndFreelancer(offerId, singlefreelancerid).subscribe((res) => {
      const updateValue = { selected: 'declined' };
      this.offerservice.update(res.id, updateValue).subscribe(
        (updatedOffer: Offer) => {
          console.log('Offer updated successfully:', updatedOffer);
          this.declineOffer()
          this.progress = 50;
          this.progressText = 'en cours';
          this.refreshTableData();

        },
        (error) => {
          console.error('Error updating offer:', error);
        }
      );
    });
  }

  getFreelancerTrue(postid: number): void {
    this.offerservice.getFreelancerDetailsByPostIdTrue(postid).subscribe((res) => {
      this.freelancertrue = res;
      console.log(res);
    });  
  }

  getFreelancerFalse(postid: number): void {
    this.offerservice.getFreelancerDetailsByPostIdFalse(postid).subscribe((res) => {
      this.freelancerfalse = res;
      console.log(res);
    });  
  }

  getFreelancerDeclined(postid: number): void {
    this.offerservice.getFreelancerDetailsByPostIdDeclined(postid).subscribe((res) => {
      this.freelancerDeclined = res;
      console.log(res);
    });  
  }

  refreshTableData(): void {
    this.getFreelancerFalse(this.postId);
    this.getFreelancerTrue(this.postId);
    this.getFreelancerDeclined(this.postId);
  }

  isCloseOfferEnabled(): boolean {
    return this.freelancertrue?.length === this.post?.freelancers_number;
  }

  ValidateOffer(): void {
    const updateValue = { status: 'waiting' };
    this.postService.update(this.postId, updateValue).subscribe((updatedPost: Post) => {
      console.log('Offer updated successfully:', updatedPost);
      this.refreshTableData();
      this.initializeData();
    },
    (error) => {
      console.error('Error updating offer:', error);
    });
  }

  CloseOffer(): void {
    const updateValue = { status: 'closed' };
    this.postService.update(this.postId, updateValue).subscribe((updatedPost: Post) => {
      console.log('Offer updated successfully:', updatedPost);
      this.refreshTableData();
      this.initializeData();
    },
    (error) => {
      console.error('Error updating offer:', error);
    });
  }

  

  declineOffer() {
    const updateValue = { status: 'open' };
    this.postService.update(this.postId, updateValue).subscribe((updatedPost: Post) => {
      console.log('Offer updated successfully:', updatedPost);
      this.refreshTableData();
      this.initializeData();
    },
    (error) => {
      console.error('Error updating offer:', error);
    });
  }

  checkifExists(postid: number): void {
    this.postService.checkIfOfferExists(postid).subscribe(
      response => {
        this.offerExists = response;
        if (this.offerExists && this.status=='open') {
          this.disabledbutton=true;
          this.progress = 50;
          this.progressText = 'en cours';
          
          //this.updatePostStatus();
        }else if(this.status=='open'){
          this.disabledbutton=false;
        }
        console.log('Offer exists:', this.offerExists);
      },
      error => {
        console.error('Error checking offer existence', error);
      }
    );
  }

 
}
