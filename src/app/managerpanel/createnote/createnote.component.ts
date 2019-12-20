import { Component, OnInit, AfterViewInit, Input, ɵConsole, NgProbeToken } from '@angular/core';
import { Note } from 'src/app/models/note';
import * as $ from 'jquery';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
// import { BehaviorSubject } from 'rxjs';
import axios from 'axios';
import { NoteService } from 'src/app/services/note.service';
import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { AuthService } from './../../services/auth.service';
// import { Photo } from 'src/app/models/photo';
import { MatSnackBar } from '@angular/material';
import { SnackbarComponent } from './../../snackbar/snackbar.component';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createnote',
  templateUrl: './createnote.component.html',
  styleUrls: ['./createnote.component.css']
})

export class CreatenoteComponent implements OnInit {

  public noteToInsert = new Note();
  categories: Category[] = [];
  selectedOption: any = {};
  userId: any = {};
  noteId: any = {};
  imageList: string[] = [];
  durationInSeconds = 3;
  // tslint:disable-next-line:no-inferrable-types
  fired: boolean = false;

  tagList: string[] = [];


  constructor(private noteService: NoteService, private categoryService: CategoryService,
     private authService: AuthService,  private _snackBar: MatSnackBar, private router: Router) { }

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
     toolbarButtons: [ 'bold', 'italic', 'underline', 'subscript', 'superscript', 'fontFamily', 'align', 'orderedList',
     'unorderedList', 'quote', 'fontSize', 'insertLink', 'insertImage', 'specialCharacters', 'html', 'undo', 'redo'],
    events: {
      'froalaEditor.image.beforeUpload': function(e, editor, images) {
        // Before image is uploaded
        const noteId = localStorage.getItem('noteId');
        const data = new FormData();
        data.append('File', images[0]);
        data.append('NoteId', noteId);
        data.append('MainPhoto', 'false');

        axios.post('https://localhost:44369/api/photo/insertphotonote', data, {
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

    this.categoryService.getCategories().subscribe((categoryList: Category[]) => {this.categories = categoryList; },
    error => {
      console.log('category service failed');
    });

    this.noteToInsert.userId = this.userId;
    this.noteToInsert.isDraft = true;

  }

  // keypress dosnt work when paste something to editor but keyup is okey
  keyup(event: any) {

    if (this.fired === false){
    this.noteToInsert.categoryId = 3;
    this.noteToInsert.userId = this.userId;
    this.noteToInsert.isDraft = true;

    this.noteService.draftNote(this.noteToInsert).subscribe(id => {this.noteId = id;
    localStorage.setItem('noteId', this.noteId);
   },
     error => {
       console.log('note id service failed');
     });
     this.fired = true;
    }
  }

  onSubmit() {

    // tslint:disable-next-line:prefer-const
    let noteId = localStorage.getItem('noteId');

      const images = $('img').map(function() {
        return $(this).attr('src').toString();
     });

     for (let i = 0; i < images.length; i++) {
       this.imageList.push(images[i].toString());
     }

   // console.log(this.tagList + ' fskdfs');

    // $('img').map();
    // this.imageList.push($('img').prop('src'));
    // for (let i = 0; i < imgArray.length; i++) {
    //   this.noteToInsert.photos[i] = imgArray[i];
    //     }
    // console.log('photooo ' + this.noteToInsert.photos[0]);
    // this.noteToInsert.photos.push();
    this.noteToInsert.categoryId = this.selectedOption;
    this.noteToInsert.userId = this.userId;
     this.noteToInsert.photos = this.imageList;
     this.noteToInsert.isDraft = false;
     this.noteToInsert.tags = this.tagList;
     this.noteToInsert.id = +noteId;

   // console.log('tags : ' + this.tags);

    this.noteService.updateNote(this.noteToInsert).subscribe(data => {
      console.log('success to update note');
    }, error => {
      console.log('failed to update note');
    });

    this.router.navigate(['/createtags']);

  }

  SaveDraft() {
    // tslint:disable-next-line:prefer-const
    let noteId = localStorage.getItem('noteId');

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
  this.noteToInsert.categoryId = this.selectedOption;
  this.noteToInsert.userId = this.userId;
   this.noteToInsert.photos = this.imageList;
   this.noteToInsert.isDraft = true;
   this.noteToInsert.id = +noteId;
   // this.noteToInsert.tags = this.tags;

  // console.log('tags : ' + this.tags);

  this.noteService.updateNote(this.noteToInsert).subscribe(data => {
    this.router.navigate(['/usernotes']);
  }, error => {
    console.log('failed to update note');
  });
  }

  openSnackBar() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top'
    });
  }

}
