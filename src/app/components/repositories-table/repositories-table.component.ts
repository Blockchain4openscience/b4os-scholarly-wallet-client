import { ClaimResearchObjectComponent } from './../claim-research-object/claim-research-object.component';
import { StorageService } from 'src/app/services/storage.service';
import { AuthService } from './../../services/auth.service';
import { ResearchObjectsService } from 'src/app/services/research-objects.service';
import { GithubService } from './../../services/github.service';
import { Repository } from './../../models/repository.model';
import { ActivatedRoute, Router } from '@angular/router';
import {
  AfterViewInit,
  Component,
  OnInit,
  ViewChild,
  Input,
  EventEmitter
} from '@angular/core';
import { MatPaginator, MatSort, MatTable, MatDialog } from '@angular/material';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, map, catchError, flatMap } from 'rxjs/operators';
import { Source } from 'webpack-sources';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'b4os-repositories-table',
  templateUrl: './repositories-table.component.html',
  styleUrls: ['./repositories-table.component.css']
})
export class RepositoriesTableComponent implements AfterViewInit, OnInit {
  @ViewChild('paginatorBottom', { static: false })
  paginatorBottom: MatPaginator;
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatTable, { static: false }) table: MatTable<any>;

  source: string;

  @Input()
  claimable = false;

  isLoadingResults = true;
  notFound = false;
  repositories: any[] = [];
  candidates = [];
  resultsLength = 0;
  claimed: EventEmitter<any> = new EventEmitter();

  constructor(
    private researchObjects: ResearchObjectsService,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private storageService: StorageService
  ) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(data =>{
      this.source = data.source;
      this.claimable = data.claimable;
    });
    this.activatedRoute.queryParams.subscribe(params => {
      const code = params.code;
      if (typeof code !== 'undefined') {
        this.isLoadingResults = true;
        this.researchObjects
          .authenticate(this.source, code)
          .subscribe((repos: any[]) => {
            this.candidates = repos;
            this.isLoadingResults = false;
            const user = this.storageService.read('user');
            user[`${this.source}_access`] = true;
            this.storageService.write('user', user);
            this.openClaimDialog();
          });
      }
    });
  }

  ngAfterViewInit() {
    merge(() => {
      this.paginatorBottom.pageIndex = 0;
    });

    merge(this.paginatorBottom.page, this.claimed)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.researchObjects.list(
            this.paginatorBottom.pageIndex,
            this.paginatorBottom.pageSize,
            this.source
          );
        }),
        map((result: any) => {
          this.isLoadingResults = false;
          this.resultsLength = result.count;
          return result.results;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          return observableOf([]);
        })
      )
      .subscribe(data => {
        this.repositories = data;
        this.notFound = this.repositories.length === 0;
      });
  }

  syncPaginator(event, paginator, scrolltop) {
    paginator.pageIndex = event.pageIndex;
    paginator.pageSize = event.pageSize;
    if (scrolltop) {
      this.scrollToTop();
    }
  }

  scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(this.scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  }

  claim() {
    const user = this.storageService.read('user');
    this.isLoadingResults = true;
    if (user[this.source + '_access']) {
      this.researchObjects.authenticate(this.source).subscribe((candidates: any[]) => {
        this.isLoadingResults = false;
        this.candidates = candidates;
        this.openClaimDialog();
      });
    } else {
      window.location.href = environment[this.source + 'AuthUrl'];
    }
  }

  openClaimDialog(): void {
    const dialogRef = this.dialog.open(ClaimResearchObjectComponent, {
      width: '30%',
      data: {candidates: this.candidates, source: this.source}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.claimed.emit(true);
      this.paginatorBottom.pageIndex = 0;
    });
  }
}
