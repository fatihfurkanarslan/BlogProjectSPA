import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Category } from './../../models/category';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { CategoryService } from './../../services/category.service';

@Component({
  selector: 'app-createcategory',
  templateUrl: './createcategory.component.html',
  styleUrls: ['./createcategory.component.css']
})
export class CreatecategoryComponent implements OnInit {

  categoryToCreate: any = {};
  selectedFile: File = null;

  baseUrl = environment.apiUrl;


  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
  }


  onFileSelected(event) {

    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }


  onSubmit() {
     const formData: FormData = new FormData();


    formData.append('File', this.selectedFile, this.selectedFile.name);
    formData.append('Name', this.categoryToCreate.name);
    formData.append('Description', this.categoryToCreate.description);

    console.log('------');
    console.log(this.categoryToCreate);
    console.log(this.selectedFile);
    console.log('------');

    this.categoryService.insertCategory(formData).subscribe(data => {
      console.log('success to insert category');
    }, error => {
      console.log('failed to insert category');
    });
  }

}
