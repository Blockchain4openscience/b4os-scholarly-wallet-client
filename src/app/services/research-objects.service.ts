import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResearchObjectsService {

  constructor(private http: HttpClient, private storageService: StorageService, private router: Router) { }

  claim(researchObjects, source) {
    const user = this.storageService.read('user');
    const url = `api/${source}/claim?orcid=${user.orcid}`;
    return this.http.post(url, researchObjects);
  }


  list(start, size, source) {
    const user = this.storageService.read('user');
    const url = `api/${user.orcid}/${source}/list?start=${start}&size=${size}`;
    return this.http.get(url);
  }


  all(source = false) {
    const user = this.storageService.read('user');
    const url = `api/${
      user.orcid
    }${source ? '/' + source : ''}/all`;
    return this.http.get(url) as Observable<Array<any>>;
  }

  authenticate(source, code = false) {
    const user = this.storageService.read('user');
    let url = '';
    if (!code) {
      url = `api/auth/${source}?orcid=${user.orcid}`;
    } else {
      url = `api/auth/${source}?code=${code}&orcid=${user.orcid}`;
    }
    return this.http.get(url);
  }
}
