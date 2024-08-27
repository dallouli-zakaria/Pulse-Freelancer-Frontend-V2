import { Component, OnDestroy } from '@angular/core';
import { Post } from '../../../../core/models/post';
import { AuthService } from '../../../../core/services/auth.service';
import { ClientService } from '../../../../core/services/client.service';
import { PostsService } from '../../../../core/services/posts.service';
import { Subscription, Subject } from 'rxjs';
import { Offer } from '../../../../core/models/Offer';
import { OffersService } from '../../../../core/services/offers.service';
import { SkillService } from '../../../../core/services/skill.service';
import { Skill } from '../../../../core/models/skill';

@Component({
  selector: 'app-freelancer-view-posts',
  templateUrl: './freelancer-view-posts.component.html',
  styleUrl: './freelancer-view-posts.component.css',
})
export class FreelancerViewPostsComponent {
  isLoading: boolean = true;
  posts: Post[] = [];
  freelancerid: number = this.authservice.parseID();
  company_name!: string;
  clientId!: number;
  skills:Skill[]=[];

  constructor(
    private postsService: PostsService,
    private authservice: AuthService,
    private clientservice: ClientService,
    private skillservice:SkillService
  ) {
    this.getposts();
    this.loadSkills();
  }

  selectedPostId: number | null = null;

  selectPostId(postId: number) {
    this.selectedPostId = postId;
  }


  //get all open offers
  getposts() {
    this.postsService.showOpenPosts().subscribe((res: any) => {
      this.posts = res;
      this.isLoading = false;
    });
  }


  //get clients related to each posts
  getclient(clientId: number) {
    this.clientservice.show(clientId);
    this.clientservice.getData$.subscribe((res: any) => {
      this.company_name = res.company_name;
      console.log(res);
    });
  }

  //load all skills
  loadSkills(): void {
    this.skillservice.index();
    this.skillservice.skillData.subscribe((res) => {
      this.skills = res.sort((a, b) => a.title.localeCompare(b.title));
    });
  }
}
