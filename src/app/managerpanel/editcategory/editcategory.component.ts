import { Component, OnInit, Input } from '@angular/core';
import { Category } from './../../models/category';
import { CategoryService } from './../../services/category.service';
import { environment } from 'src/environments/environment';
import { FormGroup, FormBuilder, Validator, Validators } from '@angular/forms';

@Component({
  selector: 'app-editcategory',
  templateUrl: './editcategory.component.html',
  styleUrls: ['./editcategory.component.css']
})
export class EditcategoryComponent implements OnInit {

  category: Category;
  editForm: FormGroup;

  categoryToCreate: any = {};
  selectedFile: File = null;

  baseUrl = environment.apiUrl;

  constructor(private categoryService: CategoryService, private formBuilder: FormBuilder) { }

  ngOnInit() {
    // tslint:disable-next-line:prefer-const
    let categoryId = localStorage.getItem('editCategoryId');

    // this.editForm = this.formBuilder.group({
    //   id: [],
    //   name: ['', Validators.required],
    //   description: ['', Validators.required],
    //   photoUrl: []
    // });

    this.categoryService.getCategory(+categoryId).subscribe(result => { this.category = result; });

  }

  onFileSelected(event) {

    this.selectedFile = <File>event.target.files[0];
    console.log(this.selectedFile);
  }

  onSubmit() {
    const formData: FormData = new FormData();


   formData.append('File', this.selectedFile, this.selectedFile.name);
   formData.append('Name', this.category.name);
   formData.append('Description', this.category.description);
   formData.append('Id', this.category.id.toString());

   console.log('------');
   console.log(this.category);
   console.log(this.selectedFile);
   console.log('------');

   this.categoryService.updateCategory(formData).subscribe(data => {
     console.log('success to insert category');
   }, error => {
     console.log('failed to insert category');
   });
 }

}
