import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NegateAuthGuard implements CanActivate {
  userData: any;

  constructor(private authService: AuthService, private router: Router) {
    this.authService.getUserData().subscribe((data) => {
      this.userData = data;
    });
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (!this.userData) {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
