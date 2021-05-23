import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  allUsers: any[];
  recommendedUsers: any[];
  foundUsers: any;

  usersSubscription: Subscription;

  debouncer: any;

  constructor(private userService: UserService) {}

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
    if (this.debouncer) clearTimeout(this.debouncer);

    if (searchQuery) {
      const result = this.allUsers.filter((user) => {
        return user.name.toLowerCase().includes(searchQuery.toLowerCase());
      });

      this.debouncer = setTimeout(() => {
        this.foundUsers = result.slice(0, 7);
      }, 700);
    } else {
      this.debouncer = setTimeout(() => {
        this.foundUsers = null;
      }, 700);
    }
  }

  ngOnDestroy(): void {
    this.usersSubscription.unsubscribe();
  }
}
