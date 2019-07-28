import { ActivatedRoute, Router } from '@angular/router';
import { slideInAnimation } from './../../route-animations';
import { AuthService } from './../../services/auth.service';
import { StorageService } from './../../services/storage.service';
import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, startWith, share } from 'rxjs/operators';

@Component({
  selector: 'b4os-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  animations: [slideInAnimation]
})
export class MainComponent implements OnInit {
  isLoggedIn = false;
  user: any;
  isHome = true;

  isHandset$: Observable<boolean>;

  constructor(
    private breakpointObserver: BreakpointObserver,
    private storageService: StorageService,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.isHandset$ = this.breakpointObserver
    .observe(Breakpoints.HandsetPortrait)
    .pipe(
      map(result => result.matches),
      startWith(false)
    );
    this.activatedRoute.url.subscribe(
      result => (this.isHome = this.router.url.endsWith('home'))
    );
    this.isLoggedIn = this.storageService.read('isLoggedIn');
    this.user = this.storageService.read('user');
    this.authService.loggedIn.subscribe(result => {
      this.isLoggedIn = this.storageService.read('isLoggedIn');
      this.user = this.storageService.read('user');
    });
  }
  logout() {
    this.authService.logout();
    this.isLoggedIn = false;
    this.user = null;
  }
}
