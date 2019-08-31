import { Component, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import cytoscape from 'cytoscape';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export interface ResearchObject {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  description: string;
}

@Component({
  selector: 'b4os-bundle-view',
  templateUrl: './bundle-view.component.html',
  styleUrls: ['./bundle-view.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class BundleViewComponent implements OnInit, AfterViewInit {
  columnsToDisplay = ['name', 'source', 'cites'];
  expandedObject: ResearchObject | null = null;
  dataSource: any;
  FABIO_TYPES = {
    github: {
      label: 'Computer Application',
      url: 'http://purl.org/spar/fabio/ComputerApplication'
    },
    figshare: {
      label: 'Dataset',
      url: 'http://purl.org/spar/fabio/Dataset'
    },
    orcid: {
      label: 'Journal Article',
      url: 'http://purl.org/spar/fabio/JournalArticle'
    }
  };

  disco: any;
  diagram: any;
  cy: any;
  cyLayout: any;
  layoutOptions = {
    name: 'klay',
    animate: false,
    nodeDimensionsIncludeLabels: true,
    padding: 20,
    klay: {
      borderSpacing: 50,
      spacing: 30
    }
  };
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.disco = this.route.snapshot.data.disco;
    this.diagram = this.disco.diagram;
    const relations = this.diagram.elements.edges.map(item => item.data);
    this.dataSource = this.diagram.elements.nodes.map(element => {
      const data = element.data;
      const source = data.source;
      const ro: any = {};
      ro.name = data.name;
      ro.source = source;
      ro.url = '';
      if (source === 'figshare') {
        ro.url = data.ro.url_public_html;
      } else if (source === 'orcid') {
        ro.url = 'https://doi.org/' + data.id;
      } else {
        ro.url = data.id;
      }
      ro.cites = [];
      relations.forEach(relation => {
        if (relation.source === data.id) {
          ro.cites.push(data.id);
        }
      });
      return ro;
    });
    this.dataSource.sort((a, b) =>  b.cites.length - a.cites.length );
  }

  ngAfterViewInit(): void {
    this.cy = cytoscape({
      container: document.getElementById('cy'),
      ...this.diagram
    });
    this.cy.$('node').unselectify();
    this.cy.$('node').ungrabify();
    this.cy.$('edge').unselectify();
    this.cy.$('edge').ungrabify();
    this.cyLayout = this.cy.layout(this.layoutOptions);
    this.cyLayout.run();
  }
}
