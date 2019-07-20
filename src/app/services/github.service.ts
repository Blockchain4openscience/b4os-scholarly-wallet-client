import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GithubService {

  constructor(private http: HttpClient, private storageService: StorageService) { }

  getRepos(code): Observable<Array<any>> {
    const user = this.storageService.read('user');
    const url = `auth/github?code=${code}&orcid=${user.orcid}`;
    return this.http.get(url) as Observable<Array<any>>;
  }
}
