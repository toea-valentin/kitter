import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExploreComponent } from './explore/explore.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { NegateAuthGuard } from './shared/guards/negate-auth.guard';
import { SignupComponent } from './signup/signup.component';
import { StartPageComponent } from './start-page/start-page.component';

//AuthGuard - for routes used by a logged user
//NegateAuthGuard - for routes that can be accessed only by an unlogged user
const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: StartPageComponent,
    canActivate: [NegateAuthGuard],
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'explore',
    component: ExploreComponent,
  },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'my-profile',
    component: MyProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile/:id',
    component: ProfileComponent,
  },
  {
    path: 'notifications',
    component: NotificationsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NegateAuthGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [NegateAuthGuard],
  },
  {
    path: '**',
    redirectTo: '/explore',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard, NegateAuthGuard],
})
export class AppRoutingModule {}
