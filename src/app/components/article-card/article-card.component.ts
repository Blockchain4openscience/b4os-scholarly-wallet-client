import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'b4os-article-card',
  templateUrl: './article-card.component.html',
  styleUrls: ['./article-card.component.css']
})
export class ArticleCardComponent implements OnInit {

  @Input()
  publication: any;

  constructor() { }

  ngOnInit() {
  }

}
