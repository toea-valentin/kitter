import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { FollowService } from '../shared/services/follow.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  searchQuery: string;

  allUsers: any[];
  recommendedUsers: any[];
  foundUsers: any;

  usersSubscription: Subscription;

  timer: any;

  constructor(
    private userService: UserService,
    private followService: FollowService
  ) {}

  ngOnInit(): void {
    this.usersSubscription = this.userService
      .getAllUsers()
      .subscribe((users) => {
        this.allUsers = users.docs.map((e) => e.data());
        this.generateRecommendedUsers([...this.allUsers]);
      });
  }

  private generateRecommendedUsers(users): void {
    this.recommendedUsers = [];

    if (users.length < 5) {
      this.recommendedUsers = users;
    } else {
      let counter = 5; // maximum number of recommended users

      while (counter) {
        let index = Math.floor(Math.random() * users.length);
        this.recommendedUsers.push(users[index]);

        users.splice(index, 1);

        counter--;
      }
    }
  }

  public searchOnInput(searchQuery: string): void {
    this.searchQuery = searchQuery;
    if (this.timer) clearTimeout(this.timer);

    if (searchQuery) {
      const result = this.allUsers.filter((user) => {
        return user.name.toLowerCase().includes(searchQuery.toLowerCase());
      });

      this.timer = setTimeout(() => {
        this.foundUsers = result.slice(0, 7);
      }, 1000);
    } else {
      this.timer = setTimeout(() => {
        this.foundUsers = null;
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }
}
