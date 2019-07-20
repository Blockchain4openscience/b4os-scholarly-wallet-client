import { ResearchObjectsService } from './research-objects.service';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';
import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor(
    private http: HttpClient,
    private storageService: StorageService,
    private roService: ResearchObjectsService,
    public router: Router
  ) {}

  loggedIn: EventEmitter<boolean> = new EventEmitter();

  login(code) {
    const url = `auth/orcid?orcid_auth_code=${code}`;
    this.http.get(url).subscribe(result => {
      this.storageService.write('user', result);
      this.storageService.write('isLoggedIn', true);
      this.loggedIn.next(true);
      this.router.navigate(['home']);
      this.roService.list().subscribe(ros => this.storageService.write('claimed', ros));
    });
  }

  isLoggedIn() {
    return localStorage.getItem('isLoggedin') !== null;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('claimed');
  }
}
