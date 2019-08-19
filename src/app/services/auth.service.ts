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
    const url = `api/auth/orcid?orcid_auth_code=${code}`;
    this.http.get(url).subscribe((result: any) => {
      this.storageService.write('jwt-token', result.access_token);
      this.storageService.write('isLoggedIn', true);
      this.http.get(`api/profile`).subscribe(user => {
        this.storageService.write('user', user);
        this.loggedIn.next(true);
        this.router.navigate(['/research-objects/github']);
        this.roService
          .all()
          .subscribe(ros => this.storageService.write('claimed', ros));
      });
    });
  }

  isLoggedIn() {
    return localStorage.getItem('isLoggedIn') !== null;
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user');
    localStorage.removeItem('jwt-token');
    localStorage.removeItem('claimed');
    this.router.navigate(['/home']);
  }
}
