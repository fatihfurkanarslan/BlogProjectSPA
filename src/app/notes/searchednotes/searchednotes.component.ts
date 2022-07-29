import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TagService } from 'src/app/services/tag.service';
import { Tag } from 'src/app/models/tag';
import { Tagmodel } from 'src/app/models/tagmodel';

<<<<<<< HEAD
=======

>>>>>>> 0fb8875 (angular 14)
@Component({
  selector: 'app-searchednotes',
  templateUrl: './searchednotes.component.html',
  styleUrls: ['./searchednotes.component.css']
})
export class SearchednotesComponent implements OnInit {

<<<<<<< HEAD
  searchToTag: any = null;
  tag: Tagmodel = new Tagmodel();
  tagList: Tag[];
  constructor(private router: Router, private tagService: TagService) { }

  ngOnInit() {
      const {redirect} = window.history.state;
      this.searchToTag = redirect;
      this.tag.tag = this.searchToTag;

      this.tagService.getNotesByTag(this.tag).subscribe(result => {this.tagList = result; },
=======
  searchToTag: string;

  tagList: Tag[];


  data: any = {};
  routeState: any;
  constructor(private router: Router, private tagService: TagService) {

    console.log("state : " + this.router.getCurrentNavigation()?.extras?.state?.redirect);
    this.searchToTag = this.router.getCurrentNavigation()?.extras?.state?.redirect;
  }

  ngOnInit() {

      //  const {redirect} = this.router.getCurrentNavigation()?.extras?.state?.redirect;
      //  this.tag.tag = redirect;

      this.tagService.getNotesByTag(this.searchToTag).subscribe(result => {this.tagList = result;
        for(var tag in this.tagList){
            console.log("" + this.tagList[tag]);
        }

      },
>>>>>>> 0fb8875 (angular 14)
      error => {console.log('çalışmadı'); });

  }

}
