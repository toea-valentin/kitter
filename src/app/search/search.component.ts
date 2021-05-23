import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { User } from '../shared/interfaces/user';
import { AuthService } from '../shared/services/auth.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  loggedUser: User;
  allUsers: any[];
  recommendedUsers: any[];
  foundUsers: any;
  debouncer: any;

  usersSubscription: Subscription;
  loggedUsersSubscription: Subscription;

  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loggedUsersSubscription = this.authService
      .getUserData()
      .subscribe((userData) => (this.loggedUser = userData));

    this.usersSubscription = this.userService
      .getAllUsers()
      .subscribe((users) => {
        this.allUsers = users.map((e) => e.payload.doc.data());
        this.generateRecommendedUsers([...this.allUsers]);
      });
  }

  private generateRecommendedUsers(users: any[]): void {
    //substract logged user from all users
    this.loggedUser &&
      users.splice(
        users.findIndex((u) => u.uid === this.loggedUser.uid),
        1
      );

    this.recommendedUsers = [];

    if (users.length < 5) {
      this.recommendedUsers = users;
    } else {
      this.recommendedUsers = users.slice(0, 5);
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
    this.loggedUsersSubscription.unsubscribe();
    this.usersSubscription.unsubscribe();
  }
}
