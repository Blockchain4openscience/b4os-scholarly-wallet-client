import { Component, OnInit } from '@angular/core';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';
import { slideInAnimation } from 'src/app/route-animations';

@Component({
  selector: 'b4os-research-objects',
  templateUrl: './research-objects.component.html',
  styleUrls: ['./research-objects.component.css'],
  animations: [slideInAnimation]
})
export class ResearchObjectsComponent implements OnInit {

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {

  }

  ngOnInit() {}
}
