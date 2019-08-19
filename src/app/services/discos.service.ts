import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class DiscosService {
  constructor(
    private http: HttpClient,
    private storageService: StorageService
  ) {}

  save(disco) {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const user = this.storageService.read('user');
    const url = `api/${user.orcid}/discos/create`;
    return this.http.post(url, disco, { headers });
  }

  update(id, disco) {
    const headers: HttpHeaders = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const user = this.storageService.read('user');
    const url = `api/${user.orcid}/discos/${id}/update`;
    return this.http.post(url, disco, { headers });
  }

  get(id) {
    const user = this.storageService.read('user');
    const url = `api/${user.orcid}/discos/${id}`;
    return this.http.get(url);
  }

  all(start = 0, size = 6) {
    const user = this.storageService.read('user');
    const url = `api/${user.orcid}/discos?start=${start}&size=${size}`;
    return this.http.get(url);
  }
}
