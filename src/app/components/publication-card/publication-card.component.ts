import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'b4os-publication-card',
  templateUrl: './publication-card.component.html',
  styleUrls: ['./publication-card.component.css']
})
export class PublicationCardComponent implements OnInit {

  @Input()
  publication: any;

  constructor() { }

  ngOnInit() {
  }

}
