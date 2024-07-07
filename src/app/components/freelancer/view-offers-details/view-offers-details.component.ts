import { PostsService } from './../../../core/services/posts.service';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../../core/services/auth.service';
import { FreelancerService } from '../../../core/services/freelancer.service';
import { Freelancer } from '../../../core/models/Freelancer';
import { Post } from '../../../core/models/post';
import { ClientService } from '../../../core/services/client.service';

@Component({
  selector: 'app-view-offers-details',
  templateUrl: './view-offers-details.component.html',
  styleUrls: ['./view-offers-details.component.css']
})
export class ViewOffersDetailsComponent implements OnInit, OnChanges {
  @Input() postId: number | null = null;

  freelancerId: number = this.authservice.parseID();
  freelancerdata!: Freelancer;
  postdata?: Post;
  clientid!: number;
  company_name!: string;

  constructor(
    private authservice: AuthService,
    public freelancerservice: FreelancerService,
    private postservice: PostsService,
    private clientservice: ClientService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['postId'] && this.postId !== null) {
      this.getposts();
    }
  }

  ngOnInit(): void {}

  getposts() {
    if (this.postId !== null) {
      this.postservice.show(this.postId).subscribe((res) => {
        this.postdata = res;
        this.clientid = res.client_id;
        this.getclient(this.clientid);
      });
    }
  }

  getclient(clientId: number) {
    this.clientservice.show(clientId).subscribe((res) => {
      this.company_name = res.company_name;
      console.log(res);
    });
  }
}
