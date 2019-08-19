import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'b4os-ro-card',
  templateUrl: './ro-card.component.html',
  styleUrls: ['./ro-card.component.css']
})
export class RoCardComponent implements OnInit {

  @Input()
  ro: any;

  @Input()
  source: string;

  constructor() { }

  ngOnInit() {
  }

}
