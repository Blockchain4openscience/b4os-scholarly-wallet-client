import { StorageService } from './../../services/storage.service';
import { ResearchObjectsService } from './../../services/research-objects.service';
import { GithubService } from './../../services/github.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'b4os-add-ro',
  templateUrl: './add-ro.component.html',
  styleUrls: ['./add-ro.component.css']
})
export class AddRoComponent implements OnInit {
  repositories: Observable<Array<any>>;
  selectedRepositories = [];
  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private githubService: GithubService,
    private researchObjectsService: ResearchObjectsService,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      const code = params.code;
      if (typeof code !== 'undefined') {
        this.repositories = this.githubService.getRepos(code);
      }
    });
  }

  claim(researchObjects: Array<any>) {
    this.researchObjectsService.claim(
      researchObjects.map(option => option.value)
    ).subscribe(result => {
      if (result) {
        this.router.navigate(['home'], {});
        this.storageService.write('claimed', researchObjects.map(option => option.value));
      }
    });
  }
}
