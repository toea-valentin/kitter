# Kitter - a Twitter clone

Demo: https://sample-twitter-clone.web.app/

Public routes:
  - '/' Start Page
  - '/login'
  - '/signup'
  - '/explore'
  - '/search'
  - '/profile/:id' Any profile

Private routes:
  - '/home'
  - '/my-profile'
  - '/notifications'

A logged user can do:
  - Follow or unfollow other users
  - Have a feed filled with posts from following users
  - Like or unlike posts
  - Edit his profile
  - Write his own posts
  - Delete his own posts with the options of undoing immediately
  - Check in notifications when somebody started following them


## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
