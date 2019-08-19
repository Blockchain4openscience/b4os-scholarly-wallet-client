import { Repository } from './../../models/repository.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'b4os-repository-card',
  templateUrl: './repository-card.component.html',
  styleUrls: ['./repository-card.component.css']
})
export class RepositoryCardComponent implements OnInit {

  @Input()
  repository: Repository;

  languageIcons = {
    python: 'fa-python',
    html: 'fa-html5',
    javascript: 'fa-js',
    java: 'fa-java'
  };

  constructor() { }

  ngOnInit() {
  }

}
