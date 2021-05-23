import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';
import { NotificationService } from '../shared/services/notification.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.scss'],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: any;
  notificationSubscription: Subscription;
  authSubscription: Subscription;
  constructor(
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.authSubscription = this.authService
      .getUserData()
      .subscribe((userData) => {
        if (this.notificationSubscription)
          this.notificationSubscription.unsubscribe();

        this.notificationSubscription = this.notificationService
          .getNotifications(userData.uid)
          .subscribe((data) => {
            this.notifications = data.map((e) => e.payload.doc.data());
          });
      });
  }

  transformDateTime(timestamp) {
    let date = timestamp.toDate().toDateString();
    let dateArr = date.split(' ');
    dateArr.splice(0, 1);
    date = dateArr.join(' ');

    let time = timestamp.toDate().toLocaleTimeString('en-US');

    return date + ' ' + time;
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();

    if (this.notificationSubscription)
      this.notificationSubscription.unsubscribe();
  }
}
