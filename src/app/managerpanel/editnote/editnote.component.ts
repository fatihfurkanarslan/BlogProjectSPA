import { Component, OnInit } from '@angular/core';
import { Category } from './../../models/category';
import axios from 'axios';
import { NoteService } from 'src/app/services/note.service';
import { CategoryService } from './../../services/category.service';
import { AuthService } from './../../services/auth.service';
import { Note } from 'src/app/models/note';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from './../../snackbar/snackbar.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-editnote',
  templateUrl: './editnote.component.html',
  styleUrls: ['./editnote.component.css']
})
export class EditnoteComponent implements OnInit {

  categories: Category[] = [];
  selectedOption: any = {};
  userId: any = {};
  noteId: any = {};
  imageList: string[] = [];
  durationInSeconds = 3;

  note: Note;

  constructor(private noteService: NoteService, private categoryService: CategoryService,
     private authService: AuthService,  private _snackBar: MatSnackBar, private router: Router) {
       this.note = new Note();
      }

  options: Object = {
    charCounterCount: false,
    placeholderText: 'Edit Your Content Here!',
    imageUpload: true,
    imageDefaultAlign: 'left',
    imageDefaultDisplay: 'inline-block',
    pastePlain: true,
    heightMin: 150,
    // Set max image size to 3MB.
    imageMaxSize: 3 * 1024 * 1024,
    // Allow to upload PNG and JPG.
    imageAllowedTypes: ['jpeg', 'jpg', 'png'],
    events: {
      'froalaEditor.image.beforeUpload': function(e, editor, images) {
        // Before image is uploaded
        const noteId = localStorage.getItem('noteId');
        const data = new FormData();
        data.append('File', images[0]);
        data.append('NoteId', noteId);

        axios.post('https://localhost:44369/api/photo/insert', data, {
          headers: {
            'accept': 'application/json',
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          // console.log(res.data);
           editor.image.insert(res.data, null, null, editor.image.get());
           // this.imageList.push(res.data);
           console.log('noteId of photo is ' + this.noteId);
        }).catch(err => {
          console.log(err);
        });
        return false;
      }
    }
  };

  ngOnInit() {

    this.userId = this.authService.decodedToken.nameid;
    // tslint:disable-next-line:prefer-const
    let noteId = localStorage.getItem('editNoteId');

    this.categoryService.getCategories().subscribe((categoryList: Category[]) => {this.categories = categoryList; },
    error => {
      console.log('category service failed');
    });

    this.noteService.getNote(+noteId).subscribe(result => { this.note = result; });

  }

  onSubmit() {
    // this.imageList = item.attributes['img'].value;
    // console.log(this.imageList);
      const images = $('img').map(function() {
        return $(this).attr('src').toString();
     });

     for (let i = 0; i < images.length; i++) {
       this.imageList.push(images[i].toString());
     }

    this.note.categoryId = this.selectedOption;
    this.note.userId = this.userId;
     this.note.photos = this.imageList;
     this.note.isDraft = false;

    this.noteService.updateNote(this.note).subscribe(data => {
      console.log('success to update note');
      this.router.navigate(['/usernotes']);
    }, error => {
      console.log('failed to update note');
    });
  }

  SaveDraft() {
    const images = $('img').map(function() {
      return $(this).attr('src').toString();
   });

   for (let i = 0; i < images.length; i++) {
     this.imageList.push(images[i].toString());
   }

  // $('img').map();
  // this.imageList.push($('img').prop('src'));
  // for (let i = 0; i < imgArray.length; i++) {
  //   this.noteToInsert.photos[i] = imgArray[i];
  //     }
  // console.log('photooo ' + this.noteToInsert.photos[0]);
  // this.noteToInsert.photos.push();
  this.note.categoryId = this.selectedOption;
  this.note.userId = this.userId;
   this.note.photos = this.imageList;
   this.note.isDraft = true;

  this.noteService.updateNote(this.note).subscribe(data => {
    console.log('success to insert note');
    this.router.navigate(['/usernotes']);
  }, error => {
    console.log('failed to insert note');
  });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top'
    });
  }



}
