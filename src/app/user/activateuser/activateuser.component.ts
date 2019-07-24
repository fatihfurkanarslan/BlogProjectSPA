import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-activateuser',
  templateUrl: './activateuser.component.html',
  styleUrls: ['./activateuser.component.css']
})
export class ActivateuserComponent implements OnInit, OnDestroy {

  user: User;
  private routeSub: Subscription;
  constructor(private route: ActivatedRoute, private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.routeSub = this.route.params.subscribe(params => {
      this.authService.activateUser(params['id']).subscribe(result => {this.user = result; });
      this.router.navigate(['/home']);
    });

  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }

}
