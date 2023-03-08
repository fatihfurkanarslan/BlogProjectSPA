import { Component, OnInit } from '@angular/core';
import { Category } from './../../models/category';
import axios from 'axios';
import { NoteService } from 'src/app/services/note.service';
import { CategoryService } from './../../services/category.service';
import { AuthService } from './../../services/auth.service';
import { Note } from 'src/app/models/note';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from './../../snackbar/snackbar.component';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import EditorJS from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ImageTool from '@editorjs/image';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Observable } from 'rxjs';
import { map, catchError, tap, debounceTime, skip } from 'rxjs/operators';
import {type} from 'os';

import { debounce } from 'lodash';

enum saveStatus {

saving = 1,
saved = 2,
idle = 3

}

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


  editor: any;

  editorObserver: MutationObserver;
  editorData: any;
  parsedData: JSON;
  HtmlData: string = "";



  note: Note;

  constructor(private noteService: NoteService, private categoryService: CategoryService,
     private authService: AuthService,  private _snackBar: MatSnackBar, private router: Router) {
       this.note = new Note();
      }

    //   editorConfig: AngularEditorConfig = {
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
    //     uploadUrl: 'https://localhost:44369/api/photo/insertphotonote',
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
  //   events: {
  //     'froalaEditor.image.beforeUpload': function(e, editor, images) {
  //       // Before image is uploaded
  //       const noteId = localStorage.getItem('noteId');
  //       const data = new FormData();
  //       data.append('File', images[0]);
  //       data.append('NoteId', noteId);

  //       axios.post('https://localhost:44369/api/photo/insert', data, {
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



  ngOnInit() {

    this.userId = this.authService.decodedToken.nameid;
    // tslint:disable-next-line:prefer-const
    

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
    },
    // data: {
    //   "time": 1550476186479,
    //   "blocks": [
    //      {
    //       type: 'paragraph',
    //       data: {
    //        text: 'Hello world'
    //       }
    //      }
    //   ]
    // },

    onReady: () => {
       

    let noteId = localStorage.getItem('editNoteId');

    console.log("noteid " + noteId)

    // this.categoryService.getCategories().subscribe((categoryList: Category[]) => {this.categories = categoryList; },
    // error => {
    //   console.log('category service failed');
    // });

    this.noteService.getNote(+noteId).subscribe(result => {
       this.note = result;
      console.log("raw text in edit page" + this.note.rawText);
      this.editorData = this.note.rawText;

      console.log(this.userId);
    
      let parsedData = JSON.parse(this.editorData);
     // console.log("parsed data : " + parsedData);

     this.editor.render(parsedData);
    //   for (const entry of Object.entries(parsedData)) {
    //    console.log("parsed data : " + entry[1]);
    //    console.log("parsed data key: " + Object.values(parsedData));
    //  //   if(key === 'blocks'){
    //   this.editor.blocks.render({

    //  "blocks": entry[1]

    //  });
    //  //   }
    //  }
      });

    //this.userId = this.authService.decodedToken.nameid;

  
      // for (var blok in JSON.parse(this.editorData.blocks)) {
      //   console.log("inside of for loop");
      //   if (this.editorData.blocks.hasOwnProperty(blok)){
      //       console.log("block data --> " + this.editorData.blocks[blok]);
      //   }

      //   // console.log("block data : " + this.editorData.blocks[i]);
      //   //  this.editor.blocks.insert({
      //   //   type: "image",
      //   //   data: {
      //   //     url: "https://cdn.pixabay.com/photo/2017/09/01/21/53/blue-2705642_1280.jpg"
      //   //   }
      //   // });

      //   }
      // this.editor.blocks.render({

        // blocks: [
        //   {
        //     type: "image",
        //     data: {
        //       url: "https://cdn.pixabay.com/photo/2017/09/01/21/53/blue-2705642_1280.jpg"
        //     }
        //   },
        //   {
        //     type: "header",
        //     data: {
        //        text: "New header",
        //        level: 2
        //     }
        //   }
        // ]
       // this.editor.blocks.render(this.blocks);

      },
      
    onChange: () => {
     console.log("onchange e girdi")
     this.saveEditorData();
     this.extendedDebounceHandler();
      
    }
  });

    // this.editor.blocks.insert(this.editorData);
    // this.addBlocks();
  }

  extendedDebounceHandler = debounce(() => {
    // if(localStorage.getItem('noteId') == null){
    //   console.log("if bloğunda.." + localStorage.getItem('noteId'));
    //   this.note.userId = this.userId;
    //   this.note.isDraft = true;
    //   this.note.categoryId = 1;
    //   //console.log("localstore getitem worked.." + localStorage.getItem('noteId'));
    //   this.noteService.draftNote(this.note).subscribe(id => {
    //     this.noteId = id;
    //     localStorage.setItem('noteId', this.noteId);
    //    },
    //      error => {
    //        console.log('note id service failed');
    //      });
    //     }else{
        console.log('saving in editnote');
        this.SaveDraft();
    
        // }
  }, 3000);




  saveEditorData() : void {
    this.editor.save().then((outputData) => {
      this.editorData =  JSON.stringify(outputData, null, 2);
      console.log("*editordata : " + this.editorData);
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
    })}


  // JsonToHtml() {
  //   let parsedData = JSON.parse(this.editorData);

  //   for (let i = 0; i < parsedData.blocks.length; i++) {
  //     let block = parsedData.blocks[i];
  //       if(block.type === 'header'){
  //         this.HtmlData += '<header><h1>' + block.data.text + '</h1></header>';
  //       }
  //       if(block.type === 'paragraph'){
  //         this.HtmlData += '<p>'+block.data.text+'</p>';
  //       }
  //       if(block.type === 'image'){
  //         this.HtmlData += '<img src="' + block.data.file.url + '">';
  //       }
  //     }
  //   }

    // saveEditorData() : void {
    //   this.editor.save().then((outputData) => {
    //     this.editorData =  JSON.stringify(outputData, null, 2);
    //     // for(var block of JSON.parse(this.editorData)){
    //     //   this.editor.blocks.insert(block);
    //     //  }
    //     // console.log("detectEditorChanges in saveEditorData : " + this.editorData);
    //     // this.editor.render(outputData);
    //   })
    // }

    ngOnDestroy(): void {
      //this.editorObserver.disconnect();
    }


    // detectEditorChanges(): Observable <any> {

    //   return new Observable(observer => {

    //     const editorDom = document.querySelector('#editor-js');
    //     const config = { attributes: true, childList: true, subtree: true };

    //     this.editorObserver = new MutationObserver((mutation) => {
    //       observer.next(mutation);
    //     })
    //     this.editorObserver.observe(editorDom, config);

    //   })
    // }


    onSubmit() {

      // tslint:disable-next-line:prefer-const
      let noteId = localStorage.getItem('editNoteId');
    
  
        const images = $('img').map(function() {
          return $(this).attr('src').toString();
       });
  
       for (let i = 0; i < images.length; i++) {
         this.imageList.push(images[i].toString());
       }
  
       //this.saveEditorData();
  
     // console.log(this.tagList + ' fskdfs');
  
      // $('img').map();
      // this.imageList.push($('img').prop('src'));
      // for (let i = 0; i < imgArray.length; i++) {
      //   this.noteToInsert.photos[i] = imgArray[i];
      //     }
      // console.log('photooo ' + this.noteToInsert.photos[0]);
      // this.noteToInsert.photos.push();
      //this.noteToInsert.categoryId = this.selectedOption;
      this.note.userId = this.userId;
       this.note.photos = this.imageList;
       this.note.isDraft = false;

       this.note.text = this.HtmlData;
       this.note.rawText = this.editorData;
  
       this.note.id = +noteId;
  
      //  console.log("*editordata : " + this.editorData);
  
      //  console.log("*parseddata : " + this.parsedData);
     // console.log('tags : ' + this.tags);
  
      this.noteService.updateNote(this.note).subscribe(data => {
        console.log('success to update note');
      }, error => {
        console.log('failed to update note');
      });
  
      this.router.navigate(['/createtags']);
  
    }

    SaveDraft() {
      // tslint:disable-next-line:prefer-const
      let noteId = localStorage.getItem('editNoteId');
  
      //this.saveEditorData();
  
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
    // this.noteToInsert.categoryId = this.selectedOption;
    this.note.userId = this.userId;
    this.note.photos = this.imageList;
    this.note.isDraft = true;
    this.note.id = +noteId;
    this.note.text = this.HtmlData;
    this.note.rawText = this.editorData;
  
    //console.log("this.noteToInsert.rawText : " + this.editorData);
  
     // this.noteToInsert.tags = this.tags;
  
    // console.log('tags : ' + this.tags);
  
    this.noteService.updateNote(this.note).subscribe(data => {
      //this.router.navigate(['/usernotes']);
      //console.log('successed to update note');
      this.openSnackBarDraft();
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

  openSnackBarDraft() {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: this.durationInSeconds * 1000,
      verticalPosition: 'top'
    });
  }


}
