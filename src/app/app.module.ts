import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ChangeDetectorRef } from '@angular/core';

// formsmodule used for data binding in html like register or login
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTabsModule, MatIconModule, MatMenuModule, MatButtonModule, MatTableModule, MatSelect, MatSelectModule, MatOptionModule, MatDialogModule, MatInputModule, MatGridListModule, MatCardModule, MatFormFieldModule, MatSortModule, MatSnackBarModule, MatChipsModule, MatAutocompleteModule} from '@angular/material';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

// components
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryComponent } from './category/category.component';
import { NoteCardComponent } from './notes/note-card/note-card.component';
import { NotePageComponent } from './notes/note-page/note-page.component';
import { CategoryNoteComponent } from './notes/category-note/category-note.component';
import { CreatecategoryComponent } from './managerpanel/createcategory/createcategory.component';
import { CreatenoteComponent } from './managerpanel/createnote/createnote.component';
import { UsernotesComponent } from './managerpanel/usernotes/usernotes.component';
import { AllcategoriesComponent } from './managerpanel/allcategories/allcategories.component';
import { EditcategoryComponent } from './managerpanel/editcategory/editcategory.component';
import { PopularNotesComponent } from './notes/popular-notes/popular-notes.component';
import { EditnoteComponent } from './managerpanel/editnote/editnote.component';
import { DeleteDialogComponent } from './managerpanel/DeleteDialog/DeleteDialog.component';
import { ProfileComponent } from './managerpanel/profile/profile.component';
import { EditprofileComponent } from './managerpanel/editprofile/editprofile.component';
import { ActivateuserComponent } from './user/activateuser/activateuser.component';
import { SearchednotesComponent } from './notes/searchednotes/searchednotes.component';
import { NotesbyuserComponent } from './notes/notesbyuser/notesbyuser.component';
import { CategoriesComponent } from './categories/categories.component';


// hammerjs

import 'hammerjs';

// infinite scroll

import { InfiniteScrollModule } from 'ngx-infinite-scroll';


// angular editor

import {AngularEditorModule } from '@kolkov/angular-editor';


// ng2-fileuplouder
import { FileUploadModule } from 'ng2-file-upload';

// froala editor
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

// tinymce

import { EditorModule } from '@tinymce/tinymce-angular';

// resolvers
import { HomeNotes } from './resolvers/homenotes';
import { Categorynoteresolver } from './resolvers/categorynoteresolver';

// app routes
import { RouterModule } from '@angular/router';
import { Routes } from './routes';

// font awesome
import { AngularFontAwesomeModule } from 'angular-font-awesome';

// devextreme
import { DxButtonModule, DxFormModule } from 'devextreme-angular';

// sharebuttons

import { ShareButtonsModule } from '@ngx-share/buttons';

// md bootstrap
import { MDBBootstrapModule } from 'angular-bootstrap-md';

// flex-layout
import { FlexLayoutModule } from '@angular/flex-layout';



// services
import { AuthService } from '../app/services/auth.service';
import { CategoryService } from './services/category.service';
import { NoteService } from './services/note.service';
import { ProfileService } from './services/profile.service';


import { NgMatSearchBarModule } from 'ng-mat-search-bar';
import { NotecommentsComponent } from './comment/notecomments/notecomments.component';
import { LoginComponent } from './login/login.component';
import { SnackbarComponent } from './snackbar/snackbar.component';
import { PhotobarComponent } from './photobar/photobar.component';

import { TagInputModule } from 'ngx-chips';
import { CreatetagsComponent } from './managerpanel/createtags/createtags.component';
import { TagService } from './services/tag.service';
import { SearchService } from './services/search.service';
import { CommentService } from './services/comment.service';
import { PhotoService } from './services/photo.service';
import { LikeService } from './services/like.service';
import { ErrorphotobarComponent } from './errorphotobar/errorphotobar.component';




@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      RegisterComponent,
      HomeComponent,
      FooterComponent,
      CategoryComponent,
      NoteCardComponent,
      NotePageComponent,
      CategoryNoteComponent,
      CreatecategoryComponent,
      CreatenoteComponent,
      UsernotesComponent,
      AllcategoriesComponent,
      EditcategoryComponent,
      PopularNotesComponent,
      EditnoteComponent,
      DeleteDialogComponent,
      ProfileComponent,
      EditprofileComponent,
      NotecommentsComponent,
      LoginComponent,
      SnackbarComponent,
      ActivateuserComponent,
      CreatetagsComponent,
      SearchednotesComponent,
      PhotobarComponent,
      ErrorphotobarComponent,
      NotesbyuserComponent,
      CategoriesComponent,
      CategoriesComponent
   ],
   imports: [
      BrowserModule,
      AppRoutingModule,
      FormsModule,
      DxFormModule,
      HttpClientModule,
      DxButtonModule,
      RouterModule.forRoot(Routes),
      AngularFontAwesomeModule,
      FileUploadModule,
      AngularEditorModule,
      FroalaEditorModule.forRoot(),
      FroalaViewModule.forRoot(),
      InfiniteScrollModule,
      MatTabsModule,
      FormsModule,
      ReactiveFormsModule,
      BrowserAnimationsModule,
      MatIconModule,
      MatMenuModule,
      MatButtonModule,
      MatTableModule,
      MatSelectModule,
      MatOptionModule,
      MatIconModule,
      MatDialogModule,
      MatInputModule,
      MatGridListModule,
      NgMatSearchBarModule,
      MatCardModule,
      MatMenuModule,
      MatFormFieldModule,
      MatSortModule,
      MatSnackBarModule,
      MatChipsModule,
      MatAutocompleteModule,
      TagInputModule,
      ShareButtonsModule,
      MDBBootstrapModule.forRoot(),
      FlexLayoutModule,
      EditorModule
   ],
   providers: [
      AuthService,
      CategoryService,
      NoteService,
      HomeNotes,
      Categorynoteresolver,
      ProfileService,
      TagService,
      SearchService,
      CommentService,
      PhotoService,
      LikeService,
      NavComponent
   ],
   bootstrap: [
      AppComponent
   ],
   entryComponents: [
      DeleteDialogComponent,
      SnackbarComponent,
      PhotobarComponent
   ]
})
export class AppModule { }
