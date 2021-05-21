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

  usersSubscription: Subscription;

  constructor(
    private userService: UserService,
    private followService: FollowService
  ) {}

  ngOnInit(): void {
    this.usersSubscription = this.userService
      .getAllUsers()
      .subscribe((data) => {
        this.allUsers = data.docs.map((e) => e.data());
        this.generateRecommendedUsers();
      });
  }

  private generateRecommendedUsers(): void {
    this.recommendedUsers = [];

    if (this.allUsers.length < 5) {
      this.recommendedUsers = this.allUsers;
    } else {
      let elemNum = 5;

      while (elemNum) {
        let index = Math.floor(Math.random() * this.allUsers.length);
        this.recommendedUsers.push(this.allUsers[index]);

        this.allUsers.splice(index, 1);

        elemNum--;
      }
    }
  }

  public searchOnInput(searchQuery: string): void {
    this.searchQuery = searchQuery;

    const result = this.allUsers.filter((user) => {
      return user.name.toLowerCase().includes(searchQuery.toLowerCase());
    })

    console.log(result);
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }
}
