import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/shared/services/user.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  @Input() uid: string;
  @Input() name: string;
  @Input() bio: string;
  @Input() location: string;

  @Output() profileUpdated = new EventEmitter<boolean>(false);

  error: string = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {}

  updateUserData() {
    this.validateForm();

    !this.error &&
      this.userService
        .updateUserData(this.uid, this.name, this.bio, this.location)
        .toPromise()
        .then(() => this.profileUpdated.emit(true));
  }

  private validateForm() {
    this.error = '';

    if (
      this.name.length < 2 ||
      this.bio.length < 2 ||
      this.location.length < 2
    ) {
      this.error = 'Fields must have at least 2 characters.';
    }
  }
}
