import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Registermodel } from './../models/registermodel';
import { User } from './../models/user';
<<<<<<< HEAD
import { Observable, BehaviorSubject } from 'rxjs';
=======
import { Observable, BehaviorSubject, ReplaySubject } from 'rxjs';
>>>>>>> 0fb8875 (angular 14)
import { ProfileService } from './profile.service';
import { UrlSegment } from '@angular/router';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }).set('Content-type', 'application/json')
};


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: any = {};
<<<<<<< HEAD
=======

  private currentUserSource = new ReplaySubject<string>(1);
  currentUser$ = this.currentUserSource.asObservable();


>>>>>>> 0fb8875 (angular 14)
  authUrl = environment.apiUrl + 'auth/';
  decodedToken: any;
  jwtHelper = new JwtHelperService();

  @Output() getLoggedInPhoto: EventEmitter<any> = new EventEmitter();
  @Output() getLoggedInActive: EventEmitter<any> = new EventEmitter();

constructor(private http: HttpClient, private profileService: ProfileService) {
 }

login(model: any) {
  return this.http.post(this.authUrl + 'login', model).pipe(
<<<<<<< HEAD
    map((response: any ) => {
      const user = response;
      if (user) {

        localStorage.setItem('token', user.token);
        // localStorage.setItem('user', JSON.stringify(user.user));
        localStorage.setItem('user', JSON.stringify(user.id));
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
=======
    map((response: string ) => {
      const token = response;
      if (token) {

        // localStorage.setItem('token', user.token);
        // localStorage.setItem('user', JSON.stringify(user.user));
        localStorage.setItem('token', JSON.stringify(token));
        this.currentUserSource.next(token);

        this.decodedToken = this.jwtHelper.decodeToken(token);
>>>>>>> 0fb8875 (angular 14)
        // this.fireIsLoggedIn.emit(user);

            // tslint:disable-next-line:prefer-const
        let userId = this.decodedToken.nameid;
        this.profileService.getUser(userId).subscribe((result: User) => {
        this.user = result;

        // emit kullanılabilir refresh yapmadan bağımsız componentlar için
        this.getLoggedInPhoto.emit(this.user.photoUrl);
        this.getLoggedInActive.emit(this.user.isActive);
<<<<<<< HEAD
          },
        error => {
          console.log('user data fetch failed.');
                  });
=======
         },
        error => {
         console.log('user data fetch failed.');
                 });
>>>>>>> 0fb8875 (angular 14)
      }
    })
  );
}

<<<<<<< HEAD
=======
setCurrentUser(token: string){

this.currentUserSource.next(token);

}

>>>>>>> 0fb8875 (angular 14)
loginCheck(){

  // tslint:disable-next-line:prefer-const
  let token = localStorage.getItem('token');
  this.decodedToken = this.jwtHelper.decodeToken(token);
        // this.fireIsLoggedIn.emit(user);

            // tslint:disable-next-line:prefer-const
        let userId = this.decodedToken.nameid;
        this.profileService.getUser(userId).subscribe((result: User) => {
        this.user = result;

        // emit kullanılabilir refresh yapmadan bağımsız componentlar için
        this.getLoggedInPhoto.emit(this.user.photoUrl);
        this.getLoggedInActive.emit(this.user.isActive);
      },
      error => {
        console.log('user data fetch failed.');
                });
}

register(model: Registermodel) {
  return this.http.post(this.authUrl + 'register', model);
  }


activateUser(id): Observable<User> {
  return this.http.get<User>(this.authUrl + 'activateuser/' + id, httpOptions);
  }

  // getEmitter() {
  //   return this.fireIsLoggedIn;
  // }

  loggedIn() {
    const token = localStorage.getItem('token');
<<<<<<< HEAD
    return !this.jwtHelper.isTokenExpired(token);
  }

=======

    return !this.jwtHelper.isTokenExpired(token);
  }

  logOut(){
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
  }

>>>>>>> 0fb8875 (angular 14)

}
