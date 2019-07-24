import { Component, OnInit } from '@angular/core';
import { TagService } from './../../services/tag.service';
import { Tag } from './../../models/tag';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createtags',
  templateUrl: './createtags.component.html',
  styleUrls: ['./createtags.component.css']
})
export class CreatetagsComponent implements OnInit {

  tagList: string[] = [];
  noteId: any = {};

  tag: Tag = new Tag();

  constructor(private tagService: TagService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {

    // tslint:disable-next-line:prefer-const
    let noteId = localStorage.getItem('noteId');

    this.tag.noteId = +noteId;
    this.tag.tags = this.tagList;

    this.tagService.insertTag(this.tag).subscribe(result => {
      console.log('basarılı bir tag ekleme');
      this.router.navigate(['/usernotes']);
    }, error => {
      console.log('basarısız bir tag ekleme');
    } );


  }

}
