import { Component, OnInit, Input } from '@angular/core';
import { Comment } from './../../models/comment';
import { CommentService } from './../../services/comment.service';
import { AuthService } from './../../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';
import { Note } from 'src/app/models/note';

@Component({
  selector: 'app-notecomments',
  templateUrl: './notecomments.component.html',
  styleUrls: ['./notecomments.component.css']
})
export class NotecommentsComponent implements OnInit {

  @Input() note: Note;

  model: any = {};
  id: number;

  form: FormGroup = new FormGroup({
    Text: new FormControl(''),
  });

  constructor(private commentService: CommentService, private authService: AuthService) { }


  ngOnInit() {
    this.id = +this.authService.decodedToken.nameid;
<<<<<<< HEAD
    console.log('name :' + name);
=======
    console.log('name and userId in comment component :' + this.id);
>>>>>>> 0fb8875 (angular 14)
  }

  onSubmit() {

    this.model.userId = this.id;
    this.model.noteId = this.note.id;

    this.commentService.insertComment(this.model).subscribe(data => {
      console.log('success to insert comment :' + data);
    }, error => {
      console.log('failed to insert comment :' + error);
    });
  }

}
