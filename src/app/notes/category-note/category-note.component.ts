import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { ActivatedRoute } from '@angular/router';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-category-note',
  templateUrl: './category-note.component.html',
  styleUrls: ['./category-note.component.css']
})
export class CategoryNoteComponent implements OnInit {


  id: number;
  private sub: any;
  notes: Note[];
  noteText: string;

  constructor(private noteService: NoteService, private route: ActivatedRoute) { }

  ngOnInit() {

    // this.route.data.subscribe(data => {
    //   this.notes = data['notes'];
    // });

    this.sub = this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.noteService.getNotes(this.id).subscribe((data: Note[]) => {this.notes = data; },
     error => console.log('failed note get methoud'));
  }

}
