import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class ResearchObjectsService {

  constructor(private http: HttpClient, private storageService: StorageService, private router: Router) { }

  claim(researchObjects) {
    const user = this.storageService.read('user');
    const url = `ro/claim?orcid=${user.orcid}`;
    return this.http.post(url, researchObjects);
  }


  list() {
    const user = this.storageService.read('user');
    const url = `ro/list?orcid=${user.orcid}`;
    return this.http.get(url);
  }
}
