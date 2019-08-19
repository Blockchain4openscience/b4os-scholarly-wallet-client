import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  authenticate(code): Observable<Array<any>> {
    const user = this.storageService.read('user');
    const url = `api/auth/github?code=${code}&orcid=${user.orcid}`;
    return this.http.get(url) as Observable<Array<any>>;
  }

  getRepos(start, size): Observable<Array<any>> {
    const user = this.storageService.read('user');
    const url = `api/${
      user.orcid
    }/github/list?start=${start}&size=${size}`;
    return this.http.get(url) as Observable<Array<any>>;
  }

  getAllRepos() {
    const user = this.storageService.read('user');
    const url = `api/${
      user.orcid
    }/github/all`;
    return this.http.get(url) as Observable<Array<any>>;
  }
}
