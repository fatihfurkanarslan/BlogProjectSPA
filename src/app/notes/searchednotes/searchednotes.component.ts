import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag';
import { Tagmodel } from 'src/app/models/tagmodel';

@Component({
  selector: 'app-searchednotes',
  templateUrl: './searchednotes.component.html',
  styleUrls: ['./searchednotes.component.css']
})
export class SearchednotesComponent implements OnInit {

  searchToTag: any = null;
  tag: Tagmodel = new Tagmodel();
  tagList: Tag[];
  constructor(private router: Router, private tagService: TagService) { }

  ngOnInit() {
      const {redirect} = window.history.state;
      this.searchToTag = redirect;
      this.tag.tag = this.searchToTag;

      this.tagService.getNotesByTag(this.tag).subscribe(result => {this.tagList = result; },
      error => {console.log('çalışmadı'); });

  }

}
