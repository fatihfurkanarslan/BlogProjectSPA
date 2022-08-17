import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
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

  tag: Tagmodel = new Tagmodel();

  apiUrl = environment.apiUrl + 'tag/';

constructor(private http: HttpClient) { }

getTags(noteId: number): Observable<Tag[]> {
  return this.http.get<Tag[]>(this.apiUrl + 'gettags/' + noteId, httpOptions);
}

insertTag(tag: Tag): Observable<Tag> {
  return this.http.post<Tag>(this.apiUrl + 'insert', tag, httpOptions);
}

getNotesByTag(tag: string): Observable<Tag[]> {
  console.log("getNotesByTag worked : " + tag);

  //error in tagparam Cannot set properties of undefined (setting 'tagParam')
  this.tag.tagParam = tag;
  return this.http.post<Tag[]>(this.apiUrl + 'gettags', this.tag, httpOptions);

}

}
