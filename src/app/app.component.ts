import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import cytoscape from 'cytoscape';
import edgehandles from 'cytoscape-edgehandles';
import klay from 'cytoscape-klay';

@Component({
  selector: 'b4os-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'b4os-scholarly-wallet-client';

  constructor() {
      cytoscape.use(edgehandles);
      cytoscape.use(klay);
  }
}
