import { Component, OnInit } from '@angular/core';
import { TagService } from './../../services/tag.service';
import { Tag } from './../../models/tag';
import { Router } from '@angular/router';
import axios from 'axios';
import { MatSnackBar } from '@angular/material/snack-bar';
import { PhotobarComponent } from './../../photobar/photobar.component';
import { ErrorphotobarComponent } from './../../errorphotobar/errorphotobar.component';
import { NoteService } from 'src/app/services/note.service';
import { Note } from 'src/app/models/note';
import { ProfileService } from './../../services/profile.service';

@Component({
  selector: 'app-createtags',
  templateUrl: './createtags.component.html',
  styleUrls: ['./createtags.component.css']
})
export class CreatetagsComponent implements OnInit {

  tagList: string[] = [];
  noteId: any;

  tag: Tag = new Tag();

  selectedFile: File = null;
  durationInSeconds = 3;
  data = new FormData();
  photoUrl: string;
  note: Note;

  constructor(private tagService: TagService, private router: Router,
     private _snackBar: MatSnackBar, private noteService: NoteService, private profileService: ProfileService) {

       this.note = new Note();
       profileService.getChangeInPhoto.subscribe(photoUrl => this.changePhoto(photoUrl));

       this.photoUrl = 'http://cloudrangers.com/blog/wp-content/uploads/2017/08/blog_default.png';
      }

      private changePhoto(_photoUrl: string): void {
        this.photoUrl = _photoUrl;
    }
  ngOnInit() {
        // tslint:disable-next-line:prefer-const
    this.noteId = localStorage.getItem('noteId');
  }

  onSubmit() {

    this.tag.noteId = +this.noteId;
    this.tag.tags = this.tagList;

    this.tagService.insertTag(this.tag).subscribe(result => {
      console.log('basarılı bir tag ekleme');
      // this.router.navigate(['/usernotes']);
    }, error => {
      console.log('basarısız bir tag ekleme');
    });

    this.note.mainPhotourl = this.photoUrl;
    this.note.id = +this.noteId;

    this.noteService.updateNoteImage(this.note).subscribe(result => {
      this.router.navigate(['/usernotes']);
    }, error => {
      console.log(error);
    });
  }

  onFileSelected(event) {

    this.selectedFile = <File>event.target.files[0];
    // console.log(this.selectedFile);
    this.data.append('File', this.selectedFile);

    axios.post('https://localhost:44369/api/photo/insertphotonote', this.data, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data'
      }
    }).then(res => {
       this.photoUrl = res.data;
       this.openSnackBar();

    }).catch(err => {
      this.errorPhotoBar();
    });

    // this.photoService.insertPhoto(this.data).subscribe(result => {
    //   this.photoUrl = result;
    //   console.log('ffjslk   ' + this.photoUrl);
    // }, error => {
    //   console.log('photo yukleme basarısız');
    // });

  }

  openSnackBar() {
    this._snackBar.openFromComponent(PhotobarComponent, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top'
    });
  }

  errorPhotoBar() {
    this._snackBar.openFromComponent(ErrorphotobarComponent, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top'
    });
  }

}
