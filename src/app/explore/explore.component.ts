import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { PostService } from '../shared/services/post.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-explore',
  templateUrl: './explore.component.html',
  styleUrls: ['./explore.component.scss'],
})
export class ExploreComponent implements OnInit, OnDestroy {
  posts = [];
  postSubscription: Subscription;

  constructor(
    private postService: PostService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.postSubscription = this.postService.getAllPosts().subscribe((data) => {
      this.posts = data.map((e) => {
        let obj: Object = e.payload.doc.data();
        return { ...obj, id: e.payload.doc.id };
      });
    });
  }

  ngOnDestroy(): void {
    this.postSubscription.unsubscribe();
  }
}
