import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-follower-card',
  templateUrl: './follower-card.component.html',
  styleUrls: ['./follower-card.component.scss'],
})
export class FollowerCardComponent implements OnInit {
  @Input() uid: string;
  @Input() username: string;
  @Input() picture: string;

  constructor() {}

  ngOnInit(): void {}
}
