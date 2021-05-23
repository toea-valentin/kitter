import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../shared/interfaces/user';
import { AuthService } from '../shared/services/auth.service';
import { PostService } from '../shared/services/post.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit, OnDestroy {
  @Input() props: any;

  currUser: User;
  likedByLoggedUser: boolean;

  uid: string = '';
  username: string = '';
  picture: string = '';
  message: string = '';
  date: any = '';
  time: string = '';
  id: string = '';
  likes: string[];

  canDelete: boolean;
  deleteAlert: boolean = false;

  deleteDebouncer: any;
  userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    if (this.props) {
      this.id = this.props.id;
      this.uid = this.props.uid;
      this.username = this.props.username;
      this.picture = this.props.picture;
      this.message = this.props.message;

      this.date = this.props.timestamp.toDate().toDateString();
      let dateArr = this.date.split(' ');
      dateArr.splice(0, 1);
      this.date = dateArr.join(' ');
      this.time = this.props.timestamp.toDate().toLocaleTimeString('en-US');

      if (this.props.likes) {
        this.likes = this.props.likes;
      }
    }

    this.userSubscription = this.authService.getUserData().subscribe((data) => {
      this.currUser = data;
      this.canDelete = this.checkCanDelete();
      if (this.currUser) this.likedByLoggedUser = this.checkLikedByLoggedUser();
    });
  }

  checkLikedByLoggedUser(): boolean {
    return this.likes.includes(this.currUser.uid) ? true : false;
  }

  checkCanDelete(): boolean {
    if (this.props && this.currUser && this.props.uid === this.currUser.uid) {
      return true;
    }

    return false;
  }

  deletePost(): void {
    this.deleteAlert = true;
    this.deleteDebouncer = setTimeout(() => {
      this.postService.deletePost(this.id);
    }, 3000);
  }

  cancelDeletePost(): void {
    clearTimeout(this.deleteDebouncer);
    this.deleteAlert = false;
  }

  likePost(): void {
    this.currUser && this.postService.addLikeToPost(this.id, this.currUser.uid);
  }

  unlikePost(): void {
    this.currUser &&
      this.postService.deleteLikeFromPost(this.id, this.currUser.uid);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }
}
