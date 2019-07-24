import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Comment } from './../models/comment';
import { map } from 'rxjs/operators';


const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }).set('content', 'application/json')
};

@Injectable({
  providedIn: 'root'
})
export class CommentService {


  apiUrl = environment.apiUrl + 'comment/';

constructor(private http: HttpClient) { }

getComments(): Observable<Comment[]> {
  return this.http.get<Comment[]>(this.apiUrl + 'getcomments', httpOptions);
}

getComment(commentId: number): Observable<Comment> {
  return this.http.get<Comment>(this.apiUrl + 'getcomment/' + commentId, httpOptions);
}

insertComment(comment: Comment): Observable<Comment> {
  return this.http.post<Comment>(this.apiUrl + 'insert', comment, httpOptions);
}

deleteComment(commentId: number): Observable<Comment> {
  return this.http.delete<Comment>(this.apiUrl + 'delete/' + commentId, httpOptions);
}

updateComment(comment: Comment): Observable<Comment> {
  return this.http.put<Comment>(this.apiUrl + 'update', comment);
}
}
