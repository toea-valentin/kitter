import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';
import { menu, MenuItem } from '../../shared/objects/menu';
import { BreakpointsListener } from '../../shared/objects/breakpoints-listener';

@Component({
  selector: 'app-left-side',
  templateUrl: './left-side.component.html',
  styleUrls: ['./left-side.component.scss'],
})
export class LeftSideComponent implements OnInit, OnDestroy {
  menu: MenuItem[] = menu;

  loggedUser: any = null;
  currentRoute: string = null;
  dimensions = {
    isMediumScreen: false,
    isMediumToSmallScreen: false,
    isSmallScreen: false,
  };

  breakpoints = new BreakpointsListener();

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
        this.loggedUser = data;
      });

    this.getScreenSize();
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

  public logOut(): void {
    this.authService.logOut();
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(_event?: any) {
    this.breakpoints.setBreakpoints(window.innerWidth);
  }
}
