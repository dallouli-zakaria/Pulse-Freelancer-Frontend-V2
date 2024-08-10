import { Component, inject, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Client } from '../../../../core/models/Client';
import { Post } from '../../../../core/models/post';
import { AuthService } from '../../../../core/services/auth.service';
import { PostsService } from '../../../../core/services/posts.service';
import { OffersService } from '../../../../core/services/offers.service';
import { Offer } from '../../../../core/models/Offer';
import Swal from 'sweetalert2';

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
  router = inject(Router);
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
  isLoadingClose = false;
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

    this.isAuthenticated = this.authService.isLoggedIn();
    if (this.isAuthenticated) {
      this.authService.getUserRole().subscribe((res) => {
        this.roles = res;


        
      });
    }



    const postIdParam = this.route.snapshot.paramMap.get('postId');
    if (postIdParam !== null) {
      this.postId = +postIdParam;
      this.initializeData();
    } else {
      console.log("error");
    }






  }

  
  verifyFreelancerPosts(){   
    // this.isLoadingClose = true;
    let freelancerId=this.authService.parseID();
      this.postService.verifyFreelancerPost(freelancerId,this.postId).subscribe((res)=>{
        if(!res && this.roles == 'Freelancer'){        
          this.router.navigate(['/']);     
        }      
      })
  }


  verifyClientPosts(){   
    // this.isLoadingClose = true;
    let clientId=this.authService.parseID();
      this.postService.verifyClientPost(clientId,this.postId).subscribe((res)=>{
        if(!res && this.roles == 'Client'){        
          this.router.navigate(['/']);     
        }      
      })
  }

  verifyProperty(){
    const postIdParam = this.route.snapshot.paramMap.get('postId');
    if (postIdParam !== null) {
      this.postId = +postIdParam;

    } else {
      console.log("error");
    }


  }




  initializeData(): void {
    this.verifyFreelancerPosts();
    this.verifyClientPosts();
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
     (data:any) => {
        this.post = data;
        this.isLoading = false;
        this.status = data.status;
        this.updateProgress(this.status);
        console.log(data);
      },
      (error: any) => {
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
      (data: any[]) => {
        this.freelancers = data;
        console.log(this.freelancers);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getclientdetails(postId: number): void {
    this.postService.getClientDetailsByPostId(postId).subscribe(
      (data:any) => {
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
    this.offerservice.getOffersByPostAndFreelancer(offerId, singlefreelancerid).subscribe((res:any) => {
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

    Swal.fire({
      icon: "success",
      title: "freelancer validé !",
      showConfirmButton: false,
      timer: 1500
    });
  }

  disqualifyFreelancer(index: number, offerId: number, singlefreelancerid: number): void {
    this.disqualifiedFreelancer.add(index);
    this.offerservice.getOffersByPostAndFreelancer(offerId, singlefreelancerid).subscribe((res:any) => {
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

    
    Swal.fire({
      icon: "error",
      title: "freelancer disqualifié !",
      showConfirmButton: false,
      timer: 1500
    });
  }


  declineFreelancer(index: number, offerId: number, singlefreelancerid: number): void {
    // Create the Swal mixin with custom classes
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    });
  
    // Show the confirmation popup
    swalWithBootstrapButtons.fire({
      title: 'êtes-vous sûr?',
      text: "vous ne pouvez pas confirmer un freelancer après disqualification !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Accepter!',
      cancelButtonText: 'Retour!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // If confirmed, proceed with the offer update
        this.disabledbutton2 = false;
        this.disqualifiedFreelancer.add(index);
        
        this.offerservice.getOffersByPostAndFreelancer(offerId, singlefreelancerid).subscribe((res:any) => {
          const updateValue = { selected: 'declined' };
          this.offerservice.update(res.id, updateValue).subscribe(
            (updatedOffer: Offer) => {
              console.log('Offer updated successfully:', updatedOffer);
              this.declineOffer();
              this.progress = 50;
              this.progressText = 'en cours';
              this.refreshTableData();
              // Show success popup
              swalWithBootstrapButtons.fire({
                title: 'Réfusé!',
                text: 'Le freelancer est refusé. Notre équipe se chargera du processus de recrutement une autre fois. Vous serez notifié par mail :) ! ',
                icon: 'success'
              });
            },
            (error) => {
              console.error('Error updating offer:', error);
              this.disabledbutton2 = false; // Reset the disabled state if there's an error
            }
          );
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        // If cancelled, show the cancelled popup
        swalWithBootstrapButtons.fire({
          title: 'Annulé',
          text: 'le freelancer est en attente de validation de l\'offre ',
          icon: 'error'
        });
      }
    });
  }
  
  getFreelancerTrue(postid: number): void {
    this.offerservice.getFreelancerDetailsByPostIdTrue(postid).subscribe((res: any[]) => {
      this.freelancertrue = res;
      console.log(res);
    });  
  }

  getFreelancerFalse(postid: number): void {
    this.offerservice.getFreelancerDetailsByPostIdFalse(postid).subscribe((res:any) => {
      this.freelancerfalse = res;
      console.log(res);
    });  
  }

  getFreelancerDeclined(postid: number): void {
    this.offerservice.getFreelancerDetailsByPostIdDeclined(postid).subscribe((res: any[]) => {
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
    this.isLoading = true;
    const updateValue = { status: 'waiting' };

    this.postService.update(this.postId, updateValue).subscribe(
      (updatedPost: Post) => {
        console.log('Offer updated successfully:', updatedPost);
        this.refreshTableData();
        this.initializeData();
        this.isLoading = false;
        Swal.fire({
          icon: "success",
          title: "Offre validé",
          showConfirmButton: false,
          timer: 1500
        });
      },
      (error) => {
        console.error('Error updating offer:', error);
        this.isLoading = false;
      }
    );
  }

   CloseOffer(): void {
    this.isLoadingClose = true;
    const updateValue = { status: 'closed' };

    this.postService.update(this.postId, updateValue).subscribe(
      (updatedPost: Post) => {
        console.log('Offer updated successfully:', updatedPost);
        this.refreshTableData();
        this.initializeData();
        Swal.fire({
          title: 'Success!',
          text: 'Votre offre a été clôturée avec succès. Nous passerons à l\'évaluation des contrats et nous reviendrons vers vous par mail dans les plus brefs délais !',
          icon: 'success',
          confirmButtonText: 'OK',
          confirmButtonColor: '#28a745',
          customClass: {
            popup: 'custom-swal-popup'
          }
        });
      },
      (error) => {
        console.error('Error updating offer:', error);
      }
    );
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
      (response:any )=> {
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




  createcontract(){

  }

  showadd=false
  show2=false
  
  onAdd(): void {
    this.show2 = true;
      this.showadd = true;
  }
    onCloseModal2(): void {
      this.show2 = false;
      this.showadd = false;
     
    }
 
}
