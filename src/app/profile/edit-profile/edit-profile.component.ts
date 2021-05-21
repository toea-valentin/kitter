import { Component, Input, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  @Input() uid: string;
  @Input() name: string;
  @Input() bio: string;
  @Input() location: string;

  error: false;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    console.log(this.name + ' ' + this.bio + ' ' + this.location)
  }

  updateUserData(){
    this.userService.updateUserData(this.uid, this.name, this.bio, this.location);
  }

}
