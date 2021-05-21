import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { FollowService } from 'src/app/shared/services/follow.service';

@Component({
  selector: 'app-following-card',
  templateUrl: './following-card.component.html',
  styleUrls: ['./following-card.component.scss'],
})
export class FollowingCardComponent implements OnInit, OnDestroy {
  @Input() props: any;

  loggedUser: any;
  loggedUserProfile: boolean = false;

  uid: string = '';
  username: string = '';
  picture: string = '';

  loggedUserSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private followService: FollowService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedUserSubscription = this.authService
      .getUserData()
      .subscribe((data) => (this.loggedUser = data));

    if (this.props) {
      this.uid = this.props.followingUserId;
      this.username = this.props.followingUserName;
      this.picture = this.props.followingUserPicture;
      this.loggedUserProfile = this.isLoggedUserProfile();
    }

    if(this.router.url === '/my-profile') this.loggedUserProfile = true;
  }

  ngOnDestroy(): void {
    this.loggedUserSubscription.unsubscribe();
  }

  unfollowUser() {
    if (this.loggedUser && this.props)
      this.followService.deleteFollow(this.loggedUser['uid'], this.uid);
  }

  private isLoggedUserProfile() {
    if (this.loggedUser) {
      if (this.router.url === `/profile/${this.loggedUser.uid}`) return true;
    }

    return false;
  }
}
