import { DiscosService } from './../../services/discos.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { map, retryWhen, tap, delayWhen, switchMap } from 'rxjs/operators';
import { timer, interval } from 'rxjs';

@Component({
  selector: 'b4os-bundle-card',
  templateUrl: './bundle-card.component.html',
  styleUrls: ['./bundle-card.component.css']
})
export class BundleCardComponent implements OnInit, OnDestroy {
  @Input()
  bundle: any;

  bundleStatus: any;

  constructor(private disco: DiscosService) {}

  ngOnInit() {
    if (this.bundle.status === 'in progress') {
      this.checkProgress();
    }
  }

  publish() {
    this.disco.publish(this.bundle.id).subscribe(result => {
      this.bundle.status = result;
      this.checkProgress();
    });
  }

  checkProgress() {
    this.bundleStatus = interval(1000)
      .pipe(switchMap(() => this.disco.status(this.bundle.id)))
      .subscribe(data => {
        if (data !== 'in progress') {
          this.bundle.status = data;
          this.bundleStatus.unsubscribe();
          this.disco
            .get(this.bundle.id)
            .subscribe(bundle => (this.bundle = bundle));
        }
      });
  }

  ngOnDestroy() {
    if (this.bundleStatus) {
      this.bundleStatus.unsubscribe();
    }
  }
}
