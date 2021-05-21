import { ViewportScroller } from '@angular/common';
import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnChanges {
  @Input() showLayout: boolean;
  @Input() currentRoute: string;

  dimensions = {
    isMediumScreen: false,
    isSmallScreen: false,
    isMobile: false,
  };

  pageTitles = [
    {
      path: '/home',
      title: ' Home',
    },
    {
      path: '/my-profile',
      title: 'My Profile',
    },
    {
      path: '/profile',
      title: 'Profile',
    },
    {
      path: '/explore',
      title: 'Explore live posts',
    },
    {
      path: '/notifications',
      title: 'Notifications',
    },
    {
      path: '/search',
      title: 'Search',
    },
  ];

  currentPageTitle: string = 'Title';

  constructor(private scroll: ViewportScroller) {
    this.getScreenSize();
  }

  ngOnInit(): void {
    this.getScreenSize();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.currentRoute.currentValue !== changes.currentRoute.previousValue
    ) {
      this.setPageTitle();
    }
  }

  private setPageTitle() {
    const currentTitle = this.pageTitles.find(
      (item) => this.currentRoute.includes(item.path)
    );
    if (currentTitle) this.currentPageTitle = currentTitle.title;
    else this.currentPageTitle = 'Title';
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(event?) {
    const scrWidth = window.innerWidth;

    this.dimensions.isMediumScreen = scrWidth <= 1000 ? true : false;
    this.dimensions.isSmallScreen = scrWidth <= 700 ? true : false;
    this.dimensions.isMobile = scrWidth <= 450 ? true : false;
  }

  public scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }
}
