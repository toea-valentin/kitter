import { ViewportScroller } from '@angular/common';
import {
  Component,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { pageTitles, PageTitle } from '../shared/objects/page-titles';
import { Title } from '@angular/platform-browser';
import { BreakpointsListener } from '../shared/objects/breakpoints-listener';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnChanges {
  @Input() showLayout: boolean;
  @Input() currentRoute: string;

  breakpoints = new BreakpointsListener();

  currentPageTitle: string;
  pageTitles: PageTitle[] = pageTitles;

  constructor(private scroll: ViewportScroller, private titleService: Title) {}

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
    const pageTitle = this.pageTitles.find((item) =>
      this.currentRoute.includes(item.path)
    );

    if (pageTitle) {
      this.currentPageTitle = pageTitle.title;
      this.titleService.setTitle(pageTitle.title + ' / Kitter'); // tab title
    } else {
      this.currentPageTitle = 'Title';
      this.titleService.setTitle('Kitter'); // tab title
    }
  }

  scrollToTop() {
    this.scroll.scrollToPosition([0, 0]);
  }

  @HostListener('window:resize', ['$event'])
  getScreenSize(_event?: any) {
    this.breakpoints.setBreakpoints(window.innerWidth);
  }
}
