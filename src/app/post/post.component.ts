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

  userSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private postService: PostService
  ) {}

  ngOnInit(): void {
    this.userSubscription = this.authService.getUserData().subscribe((data) => {
      this.currUser = data;
      this.canDelete = this._canDelete();
    });

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
      if(this.props.likes){
        this.likes = this.props.likes;

        if(this.currUser)
        this.likedByLoggedUser = this.likes.includes(this.currUser.uid) ? true: false;
      }
    }
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe();
  }

  _canDelete(): boolean {
    return !this.props || !this.currUser
      ? false
      : this.props.uid === this.currUser.uid
      ? true
      : false;
  }

  deletePost(): void {
    this.deleteAlert = true;
    setTimeout(() => {
      console.log(this.id);
      this.postService.deletePost(this.id);
    }, 3000);
  }

  likePost(): void {
    this.currUser && this.postService.addLikeToPost(this.id, this.currUser.uid);
  }

  unlikePost(): void {
    this.currUser && this.postService.deleteLikeFromPost(this.id, this.currUser.uid);
  }
}
