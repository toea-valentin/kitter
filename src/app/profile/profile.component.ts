import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';
import { User } from '../shared/interfaces/user';
import { PostService } from '../shared/services/post.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { FollowService } from '../shared/services/follow.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  @Input() onMyProfile: boolean;
  loggedUser: any = null;
  loggedUserProfile: boolean;

  user: any = null;
  following: any = [];
  followers: any = [];
  userId: string;
  posts = [];
  followed = false;

  closeResult = '';
  userObservable: any;
  userFollowingObservable: any;
  userFollowersObservable: any;
  postsObservable: any;

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private postService: PostService,
    private followService: FollowService,
    private modalService: NgbModal,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initLoggedUserData();

    //for any profile
    //if on my-profile it is not triggered
    !this.onMyProfile &&
      this.route.params.subscribe((params) => {
        this.cleanObservables();
        this.user = null;
        this.posts = null;
        this.following = null;
        this.userId = params['id'];
        this.initUserData(params['id']);
      });
  }

  private initLoggedUserData() {
    this.authService.getUserData().subscribe((data) => {
      this.loggedUser = data;
      //if on my-profile init user with the logged user data
      this.onMyProfile && this.initUserData(data.uid);
    });
  }

  private initUserData(id: string) {
    this.userObservable = this.userService.getUserData(id).subscribe((data) => {
      if (data.docs[0]) {
        this.user = data.docs[0].data();
        this.user = { ...this.user, exists: true };
        this.isLoggedUserProfile();
        this.getPosts();
        this.getUserFollowing();
        this.getUserFollowers();
        this.isFollowedByLoggedUser();
      } else {
        this.user = {
          exists: false,
        };
      }
    });
  }

  private getPosts() {
    this.postsObservable = this.postService
      .getPostsFromUser(this.user.uid)
      .subscribe(
        (data) =>
          (this.posts = data.map((e) => {
            let obj: Object = e.payload.doc.data();
            return { ...obj, id: e.payload.doc.id };
          }))
      );
  }

  private isLoggedUserProfile(): void {
    if (this.loggedUser && this.loggedUser.uid === this.userId) {
      this.loggedUserProfile = true;
    } else this.loggedUserProfile = false;

    if (this.onMyProfile) this.loggedUserProfile = true;
  }

  followUser() {
    if (this.loggedUser && this.user) {
      this.followService.addFollow(
        this.loggedUser['uid'],
        this.loggedUser['name'],
        this.loggedUser['picture'],
        this.user
      );
    }
  }

  unfollowUser() {
    if (this.loggedUser && this.user) {
      this.followService.deleteFollow(this.loggedUser['uid'], this.user.uid);
    }
  }

  private isFollowedByLoggedUser() {
    this.loggedUser &&
      this.followService
        .isUserFollowedByLoggedUser(this.loggedUser['uid'], this.user.uid)
        .subscribe((data) => {
          if (data.length > 0 && data[0].payload.doc.data())
            this.followed = true;
          else this.followed = false;
        });
  }

  private getUserFollowing() {
    if (this.user) {
      this.userFollowingObservable = this.followService
        .getUserFollowing(this.user.uid)
        .subscribe((data) => {
          this.following = data.map((e) => e.payload.doc.data());
        });
    }
  }

  private getUserFollowers() {
    if (this.user) {
      this.userFollowersObservable = this.followService
        .getUserFollowers(this.user.uid)
        .subscribe((data) => {
          this.followers = data.map((e) => e.payload.doc.data());
        });
    }
  }

  logOut() {
    this.authService.logOut();
  }

  open(content) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  private cleanObservables() {
    this.userObservable && this.userObservable.unsubscribe();
    this.postsObservable && this.postsObservable.unsubscribe();
    this.userFollowingObservable && this.userFollowingObservable.unsubscribe();
    this.userFollowersObservable && this.userFollowersObservable.unsubscribe();
  }

  ngOnDestroy() {
    this.cleanObservables();
  }
}
