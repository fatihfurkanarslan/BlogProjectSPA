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
  successMessage: string;
  errorMessage: string;

  constructor(private authService: AuthService) {
   }

  ngOnInit() {
    document.body.classList.add('imageback');
  }

  ngOnDestroy() {
    document.body.classList.remove('imageback');
  }

  register() {

    this.authService.register(this.model).subscribe(result => {
      if (result != null){
        this.successMessage = 'Registration is successfull.<br/> Please check your email box to activate your account.';

      }else {
        this.errorMessage = 'Username or email is already taken.<br/> Please try another one.';
      }
    }, error => {console.log(error);
    });

  }

  cancel() {
  }


}
