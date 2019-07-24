import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup = new FormGroup({
    username: new FormControl(''),
    password: new FormControl(''),
  });

  model: any = {};

  constructor(private authService: AuthService) { }

  ngOnInit() {
    document.body.classList.add('imageback');
  }

  ngOnDestroy() {
    document.body.classList.remove('imageback');
  }

  register() {

    this.authService.register(this.model).subscribe(() => {
      console.log('registration is successfull');
    }, error => {console.log(error);
    });

  }

  cancel() {
  }


}
