import { Component, Input } from '@angular/core';
import { map } from 'rxjs/operators';
import { Breakpoints, BreakpointObserver } from '@angular/cdk/layout';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { AddRoComponent } from '../add-ro/add-ro.component';

@Component({
  selector: 'b4os-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @Input()
  cards = [];

  columnNumber: Observable<number> = of(6);
  constructor(private breakpointObserver: BreakpointObserver, public dialog: MatDialog) {
    this.breakpointObserver.observe([Breakpoints.HandsetPortrait]).subscribe(state => {
      if (state.matches) {
        this.columnNumber = of(1);
      }
    });
    this.breakpointObserver.observe([Breakpoints.Small]).subscribe(state => {
      if (state.matches) {
        this.columnNumber = of(2);
      }
    });
    this.breakpointObserver.observe([Breakpoints.Medium, Breakpoints.HandsetLandscape]).subscribe(state => {
      if (state.matches) {
        this.columnNumber = of(3);
      }
    });
    this.breakpointObserver
      .observe([Breakpoints.Large])
      .subscribe(state => {
        if (state.matches) {
          this.columnNumber = of(4);
        }
      });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddRoComponent, {
      width: '90%',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
