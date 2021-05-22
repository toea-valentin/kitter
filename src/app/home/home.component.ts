import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { FollowService } from '../shared/services/follow.service';
import { PostService } from '../shared/services/post.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  loggedUser: any;
  posts: any = null;
  followingIds: any[] = [];

  loggedUserSubscription: Subscription;
  postSubscription: Subscription;
  followSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private followService: FollowService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.loggedUserSubscription = this.authService
      .getUserData()
      .subscribe((data) => {
        this.loggedUser = data;
        this.followingIds.push(data && data.uid); // a user follows themselves by default

        if (data) {
          if (this.followSubscription) this.followSubscription.unsubscribe();
          if (this.postSubscription) this.postSubscription.unsubscribe();

          this.followSubscription = this.followService
            .getUserFollowing(this.loggedUser.uid)
            .subscribe((data) => {
              this.followingIds = [
                ...this.followingIds,
                ...data.map((e) => e.payload.doc.data()['followingUserId']),
              ];
              this.generateFeed();
            });
        }
      });
  }

  ngOnDestroy(): void {
    this.loggedUserSubscription.unsubscribe();
    if (this.followSubscription) this.followSubscription.unsubscribe();
    if (this.postSubscription) this.postSubscription.unsubscribe();
  }

  private generateFeed(): void {
    this.postSubscription = this.postService.getAllPosts().subscribe((data) => {
      this.posts = data
        .map((e) => {
          const obj: Object = e.payload.doc.data();
          return { ...obj, id: e.payload.doc.id };
        })
        .filter((data) => {
          for (let id of this.followingIds) {
            if (data['uid'] === id) {
              return true;
            }
          }

          return false;
        });
    });
  }
}
