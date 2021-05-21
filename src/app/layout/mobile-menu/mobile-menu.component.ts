import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/shared/services/auth.service';
import { menu, MenuItem } from '../../shared/objects/menu';

@Component({
  selector: 'app-mobile-menu',
  templateUrl: './mobile-menu.component.html',
  styleUrls: ['./mobile-menu.component.scss'],
})
export class MobileMenuComponent implements OnInit, OnDestroy {
  menu: MenuItem[] = menu;
  loggedUser: any = null;
  currentRoute: string = null;

  loggedUserSubscription: Subscription;
  routerSubscription: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.currentRoute = this.router.url;

    this.routerSubscription = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
      }
    });

    this.loggedUserSubscription = this.authService
      .getUserData()
      .subscribe((data) => {
        if (data) {
          this.loggedUser = data;
        }
      });
  }

  ngOnDestroy(): void {
    this.loggedUserSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();
  }

  openPostModal(createPostModal) {
    this.loggedUser &&
      this.modalService.open(createPostModal, {
        ariaLabelledBy: 'modal-basic-title',
      });
  }

  closePostModal(val: boolean, modal) {
    if (val) modal.close();
  }
}
