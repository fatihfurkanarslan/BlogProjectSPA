import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Note } from '../models/note';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Bearer ' + localStorage.getItem('token')
  })
};
@Injectable({
  providedIn: 'root'
})
export class NoteService {


  apiUrl = environment.apiUrl + 'note/';

  constructor(private http: HttpClient) { }

  getPopularNotes(): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl + 'getpopularnotes');
  }

  getNotesWithScroll(pageNumber: number): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl + 'getnotes?pageNumber=' + pageNumber);
  }

  // get by note id
  getNote(id: number): Observable<Note> {
    return this.http.get<Note>(this.apiUrl + 'getnote/' + id);
  }

  // get by category id
  getNotes(id: number): Observable<Note[]> {
    return this.http.get<Note[]>(this.apiUrl + 'getnotesbycategory/' + id);
  }

  insertNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl + 'insert', note, httpOptions);
  }

  deleteNote(noteId: number): Observable<Note> {
    return this.http.delete<Note>(this.apiUrl + 'delete/' + noteId, httpOptions);
  }

  updateNote(note: Note): Observable<Note> {
    return this.http.put<Note>(this.apiUrl + 'update', note, httpOptions);
  }

  updateNoteImage(note: Note): Observable<Note> {
    return this.http.put<Note>(this.apiUrl + 'updateImage', note, httpOptions);
  }

  draftNote(note: Note): Observable<Note> {
    return this.http.post<Note>(this.apiUrl + 'draft', note, httpOptions);
  }

  // drafts get by user id
  getDraftNotes(id: number) {
    return this.http.get<Note[]>(this.apiUrl + 'getnotesbyuser/' + id);
  }
}
