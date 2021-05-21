import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { User } from 'src/app/shared/interfaces/user';
import { AuthService } from 'src/app/shared/services/auth.service';
import { PostService } from 'src/app/shared/services/post.service';

@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss'],
})
export class PostFormComponent implements OnInit {
  @Output() messageSent = new EventEmitter<boolean>(false);

  message: string = '';
  user: User = null;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {
    this.authService.getUserData().subscribe((data) => {
      this.user = data;
    });
  }

  ngOnInit(): void {}

  public onInputChange(event) {
    this.message = event.target.value;

    const element = event.target;

    //resize the textarea to display the entire text
    element.style.overflow = 'hidden';
    element.style.height = 0;
    element.style.height = element.scrollHeight + 'px';
  }

  public onSubmit() {
    if (this.message.length > 0) {
      let messageBody = this.message;

      this.user && this.postService.postMessage(messageBody, this.user);
      this.messageSent.emit(true);
      this.message = '';
    }
  }
}
