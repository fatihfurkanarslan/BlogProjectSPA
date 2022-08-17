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
      error => {console.log('çalışmadı'); });

  }

}
