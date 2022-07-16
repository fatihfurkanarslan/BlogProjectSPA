import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { AuthService } from './../services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ProfileService } from '../services/profile.service';
import { User } from './../models/user';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};
  user: User;
  searchToTag: string;
  isUserLoggedIn: boolean;
  photoUrl: string;
  isactive: boolean;

 // tslint:disable-next-line:no-inferrable-types
 // public isViewable: boolean = true;
  // decodedToken: any = {};

  constructor(public authService: AuthService, private http: HttpClient,
    private profileService: ProfileService,  private router: Router) {
      // this.isViewable = true;
      this.user = new User();

      authService.getLoggedInPhoto.subscribe(photoUrl => this.changePhoto(photoUrl));
      authService.getLoggedInActive.subscribe(isactive => this.checkActivate(isactive));
      profileService.getChangeInPhoto.subscribe(photoUrl => this.changePhoto(photoUrl));


    }

    private changePhoto(_photoUrl: string): void {
      this.photoUrl = _photoUrl;
  }

  private checkActivate(_isactive: boolean): void {
    this.isactive = _isactive;
    console.log('active or not ---> ' + this.isactive);

}

  ngOnInit() {

  }


  loggedIn() {
    const token = localStorage.getItem('token');
    // tslint:disable-next-line:prefer-const
    return !!token;

    console.log('loggedIn!!!');
  }


  loggedOut() {
    localStorage.removeItem('token');
    // this.alertify.success('log out is successfull');
    console.log('logged out !!');
    this.router.navigate(['/home']);

  }

  searchNote() {
    this.router.navigateByUrl('/searchednotes', {state: {redirect: this.searchToTag}});
    console.log('search button worked  ' + this.searchToTag);
    this.searchToTag = '';
    close();
  }


}
