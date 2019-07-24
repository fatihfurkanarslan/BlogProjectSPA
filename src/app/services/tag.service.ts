import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Tag } from './../models/tag';
import { Tagmodel } from '../models/tagmodel';


const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  }).set('Content-type', 'application/json')
};
@Injectable({
  providedIn: 'root'
})
export class TagService {


  apiUrl = environment.apiUrl + 'tag/';

constructor(private http: HttpClient) { }

getTags(noteId: number): Observable<Tag[]> {
  return this.http.get<Tag[]>(this.apiUrl + 'gettags/' + noteId, httpOptions);
}

insertTag(tag: Tag): Observable<Tag> {
  return this.http.post<Tag>(this.apiUrl + 'insert', tag, httpOptions);
}

getNotesByTag(tag: Tagmodel): Observable<Tag[]> {
  return this.http.post<Tag[]>(this.apiUrl + 'getnotesbytag', tag, httpOptions);
}

}
