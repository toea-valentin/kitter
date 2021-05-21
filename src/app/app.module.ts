import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LeftSideComponent } from './layout/left-side/left-side.component';
import { RightSideComponent } from './layout/right-side/right-side.component';
import { LoginComponent } from './login/login.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { environment } from '../environments/environment';
import { AuthService } from './shared/services/auth.service';
import { FormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './post/post.component';
import { ExploreComponent } from './explore/explore.component';
import { FollowingCardComponent } from './profile/following-card/following-card.component';
import { FollowerCardComponent } from './profile/follower-card/follower-card.component';
import { MobileMenuComponent } from './layout/mobile-menu/mobile-menu.component';
import { SignupComponent } from './signup/signup.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { EditProfileComponent } from './profile/edit-profile/edit-profile.component';
import { SearchComponent } from './search/search.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { PostFormComponent } from './home/post-form/post-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LayoutComponent,
    LeftSideComponent,
    RightSideComponent,
    LoginComponent,
    ProfileComponent,
    PostComponent,
    ExploreComponent,
    FollowingCardComponent,
    FollowerCardComponent,
    MobileMenuComponent,
    SignupComponent,
    NotificationsComponent,
    EditProfileComponent,
    SearchComponent,
    MyProfileComponent,
    PostFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
