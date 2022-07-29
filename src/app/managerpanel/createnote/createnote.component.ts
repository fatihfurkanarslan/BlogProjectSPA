import { Component, OnInit, AfterViewInit, Input, ɵConsole, NgProbeToken } from '@angular/core';
import { Note } from 'src/app/models/note';
import * as $ from 'jquery';
// import CKFinder from '@ckeditor/ckeditor5-ckfinder/src/ckfinder';
<<<<<<< HEAD
// import { BehaviorSubject } from 'rxjs';
=======
// import { BehaviorSubject, throwError } from 'rxjs';
>>>>>>> 0fb8875 (angular 14)
import axios from 'axios';
import { NoteService } from 'src/app/services/note.service';
import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { AuthService } from './../../services/auth.service';
// import { Photo } from 'src/app/models/photo';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './../../snackbar/snackbar.component';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
<<<<<<< HEAD
import { AngularEditorConfig } from '@kolkov/angular-editor';
=======
import { Observable } from 'rxjs';
import { map, catchError, tap, debounceTime, skip } from 'rxjs/operators';
import { throwError } from 'rxjs';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { type } from 'os';



>>>>>>> 0fb8875 (angular 14)

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

<<<<<<< HEAD
=======
  editor: any;

  editorObserver: MutationObserver;
  editorData: any;
  parsedData: JSON;
  HtmlData: string = "";
>>>>>>> 0fb8875 (angular 14)

  constructor(private noteService: NoteService, private categoryService: CategoryService,
     private authService: AuthService,  private _snackBar: MatSnackBar, private router: Router) { }

  //    editorConfig: AngularEditorConfig = {
  //     editable: true,
  //       spellcheck: true,
  //       height: 'auto',
  //       minHeight: '0',
  //       maxHeight: 'auto',
  //       width: 'auto',
  //       minWidth: '0',
  //       translate: 'yes',
  //       enableToolbar: true,
  //       showToolbar: true,
  //       placeholder: 'Enter text here...',
  //       defaultParagraphSeparator: '',
  //       defaultFontName: '',
  //       defaultFontSize: '',
  //       fonts: [
  //         {class: 'arial', name: 'Arial'},
  //         {class: 'times-new-roman', name: 'Times New Roman'},
  //         {class: 'calibri', name: 'Calibri'},
  //         {class: 'comic-sans-ms', name: 'Comic Sans MS'}
  //       ],
  //       customClasses: [
  //       {
  //         name: 'quote',
  //         class: 'quote',
  //       },
  //       {
  //         name: 'redText',
  //         class: 'redText'
  //       },
  //       {
  //         name: 'titleText',
  //         class: 'titleText',
  //         tag: 'h1',
  //       },
  //     ],
<<<<<<< HEAD
  //     uploadUrl: 'https://localhost:44369/api/photo/insertphotonote',
  // };


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
=======
  //      uploadUrl: 'https://localhost:44369/api/photo/insertphotonote'
  //     //  upload: (file: File) => { Observable<HttpEvent<UploadResponse>>
  //     //     const url = `https://localhost:44369/api/photo/insertphotonote`;
  //     //     const formData: FormData = new FormData();

  //     //     const noteId = localStorage.getItem('noteId');
  //     //     formData.append('File', file);
  //     //     formData.append('NoteId', noteId);
  //     //     formData.append('MainPhoto', 'false');

  //     //     return axios.post(url, formData, {headers: {
  //     //             'accept': 'application/json',
  //     //             'Content-Type': 'multipart/form-data'
  //     //     }}).then();

  //     //   const noteId = localStorage.getItem('noteId');
  //     //         const data = new FormData();
  //     //         data.append('File', file);
  //     //         data.append('NoteId', noteId);
  //     //         data.append('MainPhoto', 'false');

  //             // // axios.post<UploadResponse>('https://localhost:44369/api/photo/insertphotonote', formData, {
  //             // //   headers: {
  //             // //     'accept': 'application/json',
  //             // //     'Content-Type': 'multipart/form-data'
  //             // //   }
  //             // // }).then(res => {
  //             // //   // console.log(res.data);
  //             // //   //editor.image.insert(res.data, null, null, editor.image.get());
  //             // //    // this.imageList.push(res.data);
  //             // //    console.log('noteId of photo is ' + this.noteId);


  //             // // }).catch(err => {
  //             // //   console.log(err);
  //             // // });


  // };


  // options: Object = {
  //   charCounterCount: false,
  //   placeholderText: 'Edit Your Content Here!',
  //   imageUpload: true,
  //   imageDefaultAlign: 'left',
  //   imageDefaultDisplay: 'inline-block',
  //   pastePlain: true,
  //   heightMin: 150,
  //   // Set max image size to 3MB.
  //   imageMaxSize: 3 * 1024 * 1024,
  //   // Allow to upload PNG and JPG.
  //   imageAllowedTypes: ['jpeg', 'jpg', 'png'],
  //    toolbarButtons: [ 'bold', 'italic', 'underline', 'subscript', 'superscript', 'fontFamily', 'align', 'orderedList',
  //    'unorderedList', 'quote', 'fontSize', 'insertLink', 'insertImage', 'specialCharacters', 'html', 'undo', 'redo'],
  //   events: {
  //     'froalaEditor.image.beforeUpload': function(e, editor, images) {
  //       // Before image is uploaded
  //       const noteId = localStorage.getItem('noteId');
  //       const data = new FormData();
  //       data.append('File', images[0]);
  //       data.append('NoteId', noteId);
  //       data.append('MainPhoto', 'false');

  //       axios.post('https://localhost:44369/api/photo/insertphotonote', data, {
  //         headers: {
  //           'accept': 'application/json',
  //           'Content-Type': 'multipart/form-data'
  //         }
  //       }).then(res => {
  //         // console.log(res.data);
  //          editor.image.insert(res.data, null, null, editor.image.get());
  //          // this.imageList.push(res.data);
  //          console.log('noteId of photo is ' + this.noteId);
  //       }).catch(err => {
  //         console.log(err);
  //       });
  //       return false;
  //     }
  //   }
  // };

>>>>>>> 0fb8875 (angular 14)

  ngOnInit() {

    this.userId = this.authService.decodedToken.nameid;

<<<<<<< HEAD
=======
    console.log(this.userId);

>>>>>>> 0fb8875 (angular 14)
    this.categoryService.getCategories().subscribe((categoryList: Category[]) => {this.categories = categoryList; },
    error => {
      console.log('category service failed');
    });

<<<<<<< HEAD
    this.noteToInsert.userId = this.userId;
    this.noteToInsert.isDraft = true;

  }

  // keypress dosnt work when paste something to editor but keyup is okey
  keyup(event: any) {

    if (this.fired === false){
    this.noteToInsert.categoryId = 3;
=======
    // this.noteToInsert.userId = this.userId;
    // this.noteToInsert.isDraft = true;

    this.editor = new EditorJS({

      holder: 'editor-js',
      tools: {
        header: {
          class: Header,
          inlineToolbar: ['link']
        },
        image: {
          class: ImageTool,
          config: {
            // endpoints: {
            //   byFile: 'https://localhost:44369/api/photo/insertphotonote' // Your backend file uploader endpoint
            // },
            uploader: {

                /**
           * Upload file to the server and return an uploaded image data
           * @param {File} file - file selected from the device or pasted by drag-n-drop
           * @return {Promise.<{success, file: {url}}>}
           */
              uploadByFile(file){
              this.noteId = localStorage.getItem('noteId');
              const data = new FormData();
              data.append('File', file);
              data.append('NoteId', this.noteId);
              data.append('MainPhoto', 'false');

              console.log('file -->' + file);
              return axios.post('https://localhost:44369/api/photo/insertphotonote', data, {
                headers: {
                  'accept': 'application/json',
                  'Content-Type': 'multipart/form-data'
                }
              }).then(res => {

                return {
                  success: 1,
                  file: {
                    url: res.data,
                    // any other image data you want to store, such as width, height, color, extension, etc
                  }
                };

              })
              },

                 /**
              * @param {string} url - pasted image URL
              * @return {Promise.<{success, file: {url}}>}
              */
             uploadByUrl(url){
               // your ajax request for uploading
               this.noteId = localStorage.getItem('noteId');
               const data = new FormData();
               data.append('File', url);
               data.append('NoteId', this.noteId);
               data.append('MainPhoto', 'false');

               console.log('url -->' + url);
               return this.http.post('https://localhost:44369/api/photo/insertphotonote', data, {
                 headers: {
                   'accept': 'application/json',
                   'Content-Type': 'multipart/form-data'
                 }
               }).then(res => {

                 return {
                   success: 1,
                   file: {
                     url: res.data,
                     // any other image data you want to store, such as width, height, color, extension, etc
                   }
                 };

               })
            }
          }
        }
      }
    }
    // data: {}
    });

    this.detectEditorChanges().pipe(
      debounceTime(300),
      skip(1),
      untilDestroyed(this)
    ).subscribe(data=>{
      this.editor.save().then((outputData)=>{
        this.editorData =  JSON.stringify(outputData, null, 2);
      });
    });
  }

  JsonToHtml() {
    let parsedData = JSON.parse(this.editorData);

    for (let i = 0; i < parsedData.blocks.length; i++) {
      let block = parsedData.blocks[i];
        if(block.type === 'header'){
          this.HtmlData += '<header><h1>' + block.data.text + '</h1></header>';
        }
        if(block.type === 'paragraph'){
          this.HtmlData += '<p>'+block.data.text+'</p>';
        }
        if(block.type === 'image'){
          this.HtmlData += '<img src="' + block.data.file.url + '">';
        }
        // console.log("HtmlData : " + this.HtmlData);
      }
    }


  saveEditorData() : void {
    this.editor.save().then((outputData) => {
      this.editorData =  JSON.stringify(outputData, null, 2);
      console.log("*editordata : " + this.editorData);
    })
  }

  ngOnDestroy(): void {
    this.editorObserver.disconnect();
  }


  detectEditorChanges(): Observable <any> {

    return new Observable(observer => {

      const editorDom = document.querySelector('#editor-js');
      const config = { attributes: true, childList: true, subtree: true };

      this.editorObserver = new MutationObserver((mutation) => {
        observer.next(mutation);
      })
      this.editorObserver.observe(editorDom, config);

    })
  }


  // keypress dosnt work when paste something to editor but keyup is okey
  keyup(event: any) {
    console.log('keyup worked');
    if (this.fired === false){
      console.log('note id service worked');
      // neden 3 bakılacak??
    this.noteToInsert.categoryId = 3;
    this.noteToInsert.title = 'draft';
    this.noteToInsert.description = 'draft';
>>>>>>> 0fb8875 (angular 14)
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
<<<<<<< HEAD
=======
    this.JsonToHtml();
>>>>>>> 0fb8875 (angular 14)

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
<<<<<<< HEAD
     this.noteToInsert.id = +noteId;

=======
     this.noteToInsert.text = this.HtmlData;
     this.noteToInsert.rawText = this.editorData;

     this.noteToInsert.id = +noteId;

     console.log("*editordata : " + this.editorData);

     console.log("*parseddata : " + this.parsedData);
>>>>>>> 0fb8875 (angular 14)
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

<<<<<<< HEAD
=======
    this.JsonToHtml();

>>>>>>> 0fb8875 (angular 14)
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
<<<<<<< HEAD
   this.noteToInsert.photos = this.imageList;
   this.noteToInsert.isDraft = true;
   this.noteToInsert.id = +noteId;
=======
  this.noteToInsert.photos = this.imageList;
  this.noteToInsert.isDraft = true;
  this.noteToInsert.id = +noteId;
  this.noteToInsert.text = this.HtmlData;
  this.noteToInsert.rawText = this.editorData;

  console.log("*editordata : " + this.editorData);

>>>>>>> 0fb8875 (angular 14)
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

<<<<<<< HEAD
=======





>>>>>>> 0fb8875 (angular 14)
}
