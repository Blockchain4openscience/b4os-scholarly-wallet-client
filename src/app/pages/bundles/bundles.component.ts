import { MatPaginator } from '@angular/material';
import { DiscosService } from 'src/app/services/discos.service';
import {
  Component,
  OnInit,
  EventEmitter,
  AfterViewInit,
  ViewChild
} from '@angular/core';
import { merge, of as observableOf } from 'rxjs';
import { startWith, switchMap, catchError, map } from 'rxjs/operators';

@Component({
  selector: 'b4os-bundles',
  templateUrl: './bundles.component.html',
  styleUrls: ['./bundles.component.css']
})
export class BundlesComponent implements OnInit, AfterViewInit {
  @ViewChild('paginatorBottom', { static: false })
  paginatorBottom: MatPaginator;

  isLoadingResults = true;
  notFound = false;
  bundles = [];
  resultsLength = 0;

  constructor(private disco: DiscosService) {}

  ngOnInit() {}

  ngAfterViewInit() {
    merge(() => {
      this.paginatorBottom.pageIndex = 0;
    });

    merge(this.paginatorBottom.page)
      .pipe(
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.disco.all(
            this.paginatorBottom.pageIndex,
            this.paginatorBottom.pageSize
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
        this.bundles = data;
        this.notFound = this.bundles.length === 0;
      });
  }

  scrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop;
    if (c > 0) {
      window.requestAnimationFrame(this.scrollToTop);
      window.scrollTo(0, c - c / 8);
    }
  }
}
