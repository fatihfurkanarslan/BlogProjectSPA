import { Injectable, Output, EventEmitter } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Observable } from 'rxjs';
import { User } from './../models/user';
import { map, mergeMap } from 'rxjs/operators';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({
<<<<<<< HEAD
    'Authorization': 'Bearer ' + localStorage.getItem('token')
=======
    'Authorization': 'Bearer ' + localStorage.getItem('user')
>>>>>>> 0fb8875 (angular 14)
  }).set('content', 'application/json')
};


@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  apiUrl = environment.apiUrl + 'user/';
  user: User;
   @Output() getChangeInPhoto: EventEmitter<any> = new EventEmitter();

  constructor(private http: HttpClient) {
    this.user = new User();
   }

  getUser(userId: number): Observable<User> {
    return this.http.get<User>(this.apiUrl + 'getuser/' + userId, httpOptions);
  }

  updateUser(user: User): Observable<any> {
    return this.http.put<any>(this.apiUrl + 'update', user, httpOptions).pipe(
      map((response: any) => {
        // tslint:disable-next-line:prefer-const
        let userId = localStorage.getItem('editUserId');
        this.getUser(+userId).subscribe((result: User) => {
        this.user = result;

        // emit kullanılabilir refresh yapmadan bağımsız componentlar için
        this.getChangeInPhoto.emit(this.user.photoUrl);
      },
      error => {
        console.log('user data fetch failed.');
                });
      })
    );
  }

}
