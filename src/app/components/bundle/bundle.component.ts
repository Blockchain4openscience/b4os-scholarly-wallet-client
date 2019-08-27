import { Router, ActivatedRoute } from '@angular/router';
import { defaults } from './cytoscape.config';
import {
  Component,
  OnInit,
  AfterViewInit,
  HostListener,
  Input
} from '@angular/core';
import { ResearchObjectsService } from 'src/app/services/research-objects.service';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import cytoscape from 'cytoscape';
import { FormGroup, FormControl } from '@angular/forms';
import { DiscosService } from 'src/app/services/discos.service';

@Component({
  selector: 'b4os-bundle',
  templateUrl: './bundle.component.html',
  styleUrls: ['./bundle.component.css']
})
export class BundleComponent implements OnInit, AfterViewInit {
  metadata: FormGroup;
  claimedResearchObjects: any;
  sections = [];
  discoROs = [];
  discoROIds = [];
  paper: any;
  graph: any;
  pathLinks: any;
  selection = false;
  cy: any;
  cyLayout: any;
  initialized = false;
  dragging = false;
  changed = false;
  id = null;
  name = '';
  description = '';
  diagram = defaults;

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

  constructor(
    private researchObjects: ResearchObjectsService,
    private discos: DiscosService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {}

  ngOnInit() {
    const disco = this.route.snapshot.data.disco;
    if (disco) {
      this.diagram = disco.diagram;
      this.id = disco.id;
      this.name = disco.name;
      this.description = disco.description;
      this.diagram.elements.nodes =
        this.diagram.elements.nodes === undefined
          ? []
          : this.diagram.elements.nodes;
      this.discoROIds = this.diagram.elements.nodes.map(node => node.data.id);
    }
    this.metadata = new FormGroup({
      name: new FormControl(this.name),
      description: new FormControl(this.description)
    });
    this.researchObjects.all().subscribe((ros: any) => {
      this.sections = Object.keys(ros);
      this.claimedResearchObjects = ros;
      this.claimedResearchObjects.orcid = ros.orcid.filter(
        ro => this.discoROIds.indexOf(ro.doi) < 0
      );
      this.claimedResearchObjects.github = ros.github.filter(
        ro => this.discoROIds.indexOf(ro.html_url) < 0
      );
      this.claimedResearchObjects.figshare = ros.figshare.filter(
        ro => this.discoROIds.indexOf(ro.url) < 0
      );
    });
    this.discoROs = [];
  }

  ngAfterViewInit(): void {
    this.cy = cytoscape({
      container: document.getElementById('cy'),
      ...this.diagram
    });
    this.cy.edgehandles({
      handlePosition(node) {
        return 'right middle';
      },
      edgeType(sourceNode, targetNode) {
        return sourceNode.edgesTo(targetNode).empty() ? 'flat' : null;
      }
    });
    this.cyLayout = this.cy.layout(this.layoutOptions);
    this.cyLayout.run();
    this.cy.on('select', event => {
      this.selection = this.cy.$(':selected').length > 0;
    });
    this.cy.on('unselect', event => {
      this.selection = this.cy.$(':selected').length > 0;
    });
    this.cy.on('add', event => {
      if (!event.target._private.classes.has('eh-handle')) {
        this.changed = true;
      }
    });
    this.cy.$('node').on('grab', () => (this.changed = true));
    this.cy.resize();
    this.cy.fit(80);
    this.cy.center();
  }

  drop(event) {
    this.dragging = false;
    this.changed = true;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.cy.add({
        group: 'nodes',
        position: {
          x: this.cy.width() + event.distance.x - 300,
          y: this.cy.height() + event.distance.y / 10 + 200
        },
        data: {
          id: event.item.data.url,
          name: event.item.data.name.endsWith('.')
            ? event.item.data.name.slice(0, -1)
            : event.item.data.name,
          source: event.item.data.source,
          ro: event.item.data.ro
        },
        classes: event.item.data.source
      });
      this.updateLayout();
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  delete() {
    this.cy.$('node:selected').forEach(element => {
      const itemData = element.data();
      this.claimedResearchObjects[itemData.source].push(itemData.ro);
    });
    this.cy.remove(':selected');
    this.updateLayout();
    this.selection = false;
    this.changed = true;
  }

  updateLayout() {
    this.cyLayout.stop();
    this.cyLayout = this.cy.elements().makeLayout(this.layoutOptions);
    this.cyLayout.run();
    this.cy.fit(80);
  }

  save() {
    this.cy.remove('.eh-handle');
    this.updateLayout();
    if (this.id) {
      this.discos
        .update(this.id, {
          name: this.metadata.controls.name.value,
          description: this.metadata.controls.description.value,
          diagram: this.cy.json(),
          thumb: this.cy.png({ full: false })
        })
        .subscribe(result => console.log(result));
    } else {
      this.discos
        .save({
          name: this.metadata.controls.name.value,
          description: this.metadata.controls.description.value,
          diagram: this.cy.json(),
          thumb: this.cy.png({ full: false }),
          status: 'unpublished'
        })
        .subscribe(result => {
          this.id = result;
          this.router.navigate(['/bundle/' + this.id]);
        });
    }
    this.changed = false;
  }
}
