import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  showLayout = true;
  currentRoute: string;
  excludedRoutes: string[] = ['/login', '/signup'];

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showLayout = true;
        this.currentRoute = event.url;
        if (this.excludedRoutes.includes(event.url)) {
          this.showLayout = false;
        }
      }
    });
  }
}
