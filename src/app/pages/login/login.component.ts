import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'b4os-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    public router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const code = params.code;
      if (
        typeof code !== 'undefined' &&
        this.storageService.read('isLoggedIn') === null
      ) {
        this.authService.login(code);
      } else {
        this.router.navigate(['/research-objects/github'], {});
      }
    });
  }
}
