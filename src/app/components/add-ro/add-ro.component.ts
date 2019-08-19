import { StorageService } from './../../services/storage.service';
import { ResearchObjectsService } from './../../services/research-objects.service';
import { GithubService } from './../../services/github.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Repository } from 'src/app/models/repository.model';

@Component({
  selector: 'b4os-add-ro',
  templateUrl: './add-ro.component.html',
  styleUrls: ['./add-ro.component.css']
})
export class AddRoComponent implements OnInit {
  repositories: Repository[];
  loading = true;
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
        this.githubService.authenticate(code).subscribe(repos => {
          this.repositories = repos;
          this.loading = false;
        });
      }
    });
  }

  claim(researchObjects: Array<any>) {
    this.researchObjectsService
      .claim(researchObjects.map(option => option.value), 'github')
      .subscribe(result => {
        if (result) {
          this.router.navigate(['/research-objects'], {});
          this.storageService.write(
            'claimed',
            researchObjects.map(option => option.value)
          );
        }
      });
  }
}
