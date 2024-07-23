import { Component, OnInit } from '@angular/core';
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
  styleUrl: './client-post-details.component.css'
})
export class ClientPostDetailsComponent implements OnInit{
  isOfferClosed: boolean = false;
  validatedFreelancers: Set<number> = new Set<number>();
  disqualifiedFreelancer: Set<number> = new Set<number>();
  postId!: number;
  post!: Post;
  postdetails!: any;
  isLoading: boolean = true;
  role!:string;
  roles!:string;
  freelancers: any[] = [];
  isAuthenticated: boolean = false;
  counter:number=1;
  clients!:Client;
  status:boolean=true;
  offer!:any;
  offerstatus:boolean=false;
  freelancertrue!:any;
  freelancerfalse!:any;
  //singlefreelancerid!:number;
  selectedFreelancerId!:number;
  
  constructor(private route: ActivatedRoute, private postService: PostsService,private authService:AuthService,private offerservice:OffersService) { }


  ngOnInit(): void {
    const postIdParam = this.route.snapshot.paramMap.get('postId');
    if (postIdParam !== null) {
      this.postId = +postIdParam;
      this.fetchOfferDetails(this.postId);
      this.getFreelancers(this.postId);
      this.getclientdetails(this.postId);
      this.getofferdetails(this.postId);
      this.getFreelancerFalse(this.postId);
      this.getFreelancerTrue(this.postId);
    } else {
      console.log("error");
    }

    this.isAuthenticated = this.authService.isLoggedIn();
    if (this.isAuthenticated) {
      this.authService.getUserRole().subscribe((res)=>{
        this.roles=res;
      })
  }

  

  
  }

  trackdata(post_details: any) {
    this.postdetails = post_details;
  }

  fetchOfferDetails(postId: number): void {
    this.postService.show(postId).subscribe(
      data => {
        this.post = data;
        this.isLoading = false;
        
        console.log(data);
      },
      error => {
        console.error('Error fetching offer details', error);
        this.isLoading = false;
      }
    );
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


  getclientdetails(postId:number){
    this.postService.getClientDetailsByPostId(postId).subscribe(
      (data) => {
        this.clients = data;
        console.log(this.clients); 
      },
      (error) => {
        console.error('Failed to fetch clients:', error);
      }
    );
  };

  getofferdetails(postId:number){
    this.offerservice.show(postId).subscribe(
      (data) => {
        this.offer = data;
        console.log(this.offer); 
      },
      (error) => {
        console.error('Failed to fetch clients:', error);
      }
    );
  }


  getSingleOffer(){
    
  } 


  
  

  // selecteID!: number;
  // user!:any
  show: boolean=false;

  showedit: boolean=false;
  onEdited(freelancerId: number): void {
    this.show = true;
    this.showedit = true; 
    this.selectedFreelancerId = freelancerId;
    }
    onCloseModal(): void {
      this.show = false;
      this.showedit = false;
      }




      validateFreelancer(index: number,offerId:number,singlefreelancerid:number): void {
        this.validatedFreelancers.add(index);
        
        this.offerservice.getOffersByPostAndFreelancer(offerId,singlefreelancerid).subscribe((res)=>{
          // Prepare the update data
          const updateValue = { selected: 'true' };

          // Call the update method
          this.offerservice.update(res.id, updateValue).subscribe(
            (updatedOffer: Offer) => {
              console.log('Offer updated successfully:', updatedOffer);
            },
            (error) => {
              console.error('Error updating offer:', error);
            }
          );
  
      });
    }

    disqualifyFreelancer(index: number,offerId:number,singlefreelancerid:number): void {
      this.disqualifiedFreelancer.add(index);
      
      this.offerservice.getOffersByPostAndFreelancer(offerId,singlefreelancerid).subscribe((res)=>{
        // Prepare the update data
        const updateValue = { selected: 'false' };

        // Call the update method
        this.offerservice.update(res.id, updateValue).subscribe(
          (updatedOffer: Offer) => {
            console.log('Offer updated successfully:', updatedOffer);
          },
          (error) => {
            console.error('Error updating offer:', error);
          }
        );

    });
  }
    

      closeOffer(): void {
        this.isOfferClosed = true;
        
      }


      getFreelancerTrue(postid:number){
        this.offerservice.getFreelancerDetailsByPostIdTrue(postid).subscribe((res)=>{
          this.freelancertrue=res;
          console.log(res);
          
        })  
      }


      getFreelancerFalse(postid:number){
        this.offerservice.getFreelancerDetailsByPostIdFalse(postid).subscribe((res)=>{
          this.freelancerfalse=res;
          console.log(res);
          
        })  
      }
}
