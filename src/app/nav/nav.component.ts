import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { User } from './../models/user';
<<<<<<< HEAD
=======
import { Observable } from 'rxjs';
>>>>>>> 0fb8875 (angular 14)


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  user: User;
  searchToTag: string;
<<<<<<< HEAD
  isUserLoggedIn: boolean;
=======
  // isUserLoggedIn: boolean;
  currentUser$: Observable<string>;
>>>>>>> 0fb8875 (angular 14)
  photoUrl: string;
  isactive: boolean;

 // tslint:disable-next-line:no-inferrable-types
 // public isViewable: boolean = true;
  // decodedToken: any = {};

  constructor(public authService: AuthService, private http: HttpClient,
    private profileService: ProfileService,  private router: Router) {
      // this.isViewable = true;
<<<<<<< HEAD
      this.user = new User();

      authService.getLoggedInPhoto.subscribe(photoUrl => this.changePhoto(photoUrl));
      authService.getLoggedInActive.subscribe(isactive => this.checkActivate(isactive));
      profileService.getChangeInPhoto.subscribe(photoUrl => this.changePhoto(photoUrl));

=======
      //// this.user = new User();


      this.authService.getLoggedInPhoto.subscribe(photoUrl => this.changePhoto(photoUrl));
      this.authService.getLoggedInActive.subscribe(isactive => this.checkActivate(isactive));
      this.profileService.getChangeInPhoto.subscribe(photoUrl => this.changePhoto(photoUrl));
>>>>>>> 0fb8875 (angular 14)

    }

    private changePhoto(_photoUrl: string): void {
      this.photoUrl = _photoUrl;
  }

  private checkActivate(_isactive: boolean): void {
    this.isactive = _isactive;
    console.log('active or not ---> ' + this.isactive);

}

  ngOnInit() {
<<<<<<< HEAD
=======
    this.currentUser$ = this.authService.currentUser$;

>>>>>>> 0fb8875 (angular 14)

  }


  loggedIn() {
    const token = localStorage.getItem('token');
<<<<<<< HEAD
    // tslint:disable-next-line:prefer-const
    return !!token;

    console.log('loggedIn!!!');
=======
    console.log('loggedIn!!!');
    // tslint:disable-next-line:prefer-const
    return !!token;
>>>>>>> 0fb8875 (angular 14)
  }


  loggedOut() {
<<<<<<< HEAD
    localStorage.removeItem('token');
=======
    this.authService.logOut();
    // this.isUserLoggedIn = false;
>>>>>>> 0fb8875 (angular 14)
    // this.alertify.success('log out is successfull');
    console.log('logged out !!');
    this.router.navigate(['/home']);

  }

<<<<<<< HEAD
=======
  // getCurrentUser(){
  //   this.authService.currentUser$.subscribe(user => {
  //   this.isUserLoggedIn = !!user;
  //   }, error => {
  //   console.log(error);
  //   });
  // }

>>>>>>> 0fb8875 (angular 14)
  searchNote() {
    this.router.navigateByUrl('/searchednotes', {state: {redirect: this.searchToTag}});
    console.log('search button worked  ' + this.searchToTag);
    this.searchToTag = '';
    close();
  }


}
