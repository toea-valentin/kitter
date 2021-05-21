import { Component, OnInit } from '@angular/core';
import { AuthService } from '../shared/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  name: string = '';
  email: string = '';
  password: string = '';

  validName: boolean = true;
  validEmail: boolean = true;
  validPassword: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {}

  checkInputs() {
    this.validName = this.name.length < 4 ? false : true;
    this.validEmail = !this.validateEmail(this.email) ? false : true;
    this.validPassword = this.password.length < 6 ? false : true;
  }

  validateEmail(email: any) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }

  submitForm() {
    this.checkInputs();
    if (this.validName && this.validEmail && this.validPassword) {
      this.authService.emailSignup(this.name, this.email, this.password);
    }
  }
}
