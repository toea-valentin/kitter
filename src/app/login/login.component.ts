import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  email: string = '';
  password: string = '';
  error: string;
  errorSubscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.errorSubscription = this.authService
      .getError()
      .subscribe((data) => (this.error = data));
  }

  ngOnDestroy(): void {
    this.errorSubscription.unsubscribe();
  }

  googleLogin(): void {
    this.authService.googleLogin();
  }

  emailLogin(): void {
    this.authService.emailLogin(this.email, this.password);
  }
}
