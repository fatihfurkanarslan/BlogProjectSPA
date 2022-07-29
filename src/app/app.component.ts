import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ProfileService } from './services/profile.service';
<<<<<<< HEAD
=======
import { User } from 'src/app/models/user';
>>>>>>> 0fb8875 (angular 14)

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'BlogProject-SPA';
  jwtHelper = new JwtHelperService;

  decodedToken: any;
  public user: any = {};

  @Output() getLoggedInPhoto: EventEmitter<any> = new EventEmitter();
  @Output() getLoggedInActive: EventEmitter<any> = new EventEmitter();

  /**
   *
   */
  constructor(private authService: AuthService, private profileService: ProfileService) {

  }

  ngOnInit() {
<<<<<<< HEAD
    const token = localStorage.getItem('token');
    if (token) {
         this.authService.decodedToken = this.jwtHelper.decodeToken(token);

          this.authService.loginCheck();
        }
=======

    this.setCurrentUser();

    // // const token = localStorage.getItem('user');
    // // if (token) {
    // //      this.authService.decodedToken = this.jwtHelper.decodeToken(token);

    // //       this.authService.loginCheck();
    // //     }
>>>>>>> 0fb8875 (angular 14)
          //  this.decodedToken = this.jwtHelper.decodeToken(token);
          //  // tslint:disable-next-line:prefer-const
          //  let userId = this.authService.decodedToken;
          //  console.log(userId);
          //  console.log(this.decodedToken);
          //  this.profileService.getUser(userId).subscribe((result: User) => {
          //  this.user = result;

          //  // emit kullanılabilir refresh yapmadan bağımsız componentlar için
          //  this.getLoggedInPhoto.emit(this.user.photoUrl);
          //  this.getLoggedInActive.emit(this.user.isActive);
          //    },
          //  error => {
          //    console.log('user data fetch failed.');
          //            });


  }

<<<<<<< HEAD
=======
  setCurrentUser(){
    const token: string = JSON.parse(localStorage.getItem('token'));
    this.authService.setCurrentUser(token);
  }

>>>>>>> 0fb8875 (angular 14)
}
