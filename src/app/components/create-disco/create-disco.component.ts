import { Component, OnInit, AfterViewInit, HostListener } from '@angular/core';
import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';
import * as joint from 'jointjs';
import { ResearchObjectsService } from 'src/app/services/research-objects.service';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'b4os-create-disco',
  templateUrl: './create-disco.component.html',
  styleUrls: ['./create-disco.component.css']
})
export class CreateDiscoComponent implements OnInit, AfterViewInit {
  claimedResearchObjects = [];
  discoROs = [];
  paper: any;
  graph: any;
  pathLinks = [];
  selected: any;
  attrs = {
    elementDefault: {
      text: {
        fill: '#fff',
        style: {
          'text-shadow': '1px 1px 1px #999',
          'text-transform': 'capitalize'
        }
      },
      circle: { fill: '#feb663', stroke: 'white' }
    },
    elementSelected: {
      circle: { fill: '#9687fe' }
    },
    elementHighlighted: {
      circle: { fill: '#31d0c6' }
    },
    linkDefault: {
      '.connection': { stroke: '#6a6c8a', 'stroke-width': 1 }
    },
    linkDefaultDirected: {
      '.marker-target': { d: 'M 6 0 L 0 3 L 6 6 z' }
    },
    linkHighlighted: {
      '.connection': { stroke: '#33334e', 'stroke-width': 3 }
    }
  };

  constructor(private roService: ResearchObjectsService) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const canvas = jQuery('#paper-container');
    this.paper.setDimensions(canvas.width(), canvas.height());
  }

  ngOnInit() {
    this.roService.list().subscribe(ros => (this.claimedResearchObjects = ros));
    joint.setTheme('material');
  }

  ngAfterViewInit(): void {
    this.graph = new joint.dia.Graph();
    this.paper = new joint.dia.Paper({
      el: jQuery('#paper'),
      width: 500,
      height: 500,
      model: this.graph,
      gridSize: 1,
      perpendicularLinks: true,
      restrictTranslate: true
    });

    this.paper.options.defaultConnector = {
      name: 'rounded',
      args: {
        radius: 20
      }
    };

    this.paper.options.defaultConnectionPoint = {
      name: 'bbox',
      args: {
        sticky: true
      }
    };

    this.paper.options.defaultAnchor = {
      name: 'midSide',
      args: {
        rotate: true,
        padding: 20
      }
    };

    this.paper.on('cell:pointerdown', cellView => {
      if (cellView.model.isLink()) {
        return;
      }
      (this.selected = cellView.model).attr(this.attrs.elementSelected);
    });

    // Hover an element to select a target.
    this.paper.on('cell:mouseover', (cellView, evt) => {
      if (cellView.model.isLink() || cellView.model === this.selected) {
        return;
      }
    });

    // Deselect target.
    this.paper.on('cell:mouseout', (cellView, evt) => {
      if (cellView.model.isLink() || cellView.model === this.selected) {
        return;
      }
      cellView.model.attr(this.attrs.elementDefault);
    });

    const canvas = jQuery('#paper-container');
    this.paper.setDimensions(canvas.width(), canvas.height());
  }

  drop(event) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      console.log(event);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      this.graph.addCells([this.n(event.item.data.name)]);
    }
  }

  n(id) {
    const node = new joint.shapes.basic.Circle({
      id,
      position: { x: 100, y: 100 },
      size: { width: 40, height: 40 },
      attrs: this.attrs.elementDefault
    }).addTo(this.graph);
    node.attr('text/text', id);
    return node;
  }

  l(s, t) {
    new joint.dia.Link({
      id: [s, t].sort().join(),
      source: { id: s },
      target: { id: t },
      z: -1,
      attrs: this.attrs.linkDefault
    }).addTo(this.graph);
  }

  hidePath() {
    jQuery('#path').text('');
    _.each(this.pathLinks, link => {
      link.attr(this.attrs.linkDefault);
      link.set('labels', []);
    });
  }

  showPath(path) {
    jQuery('#path').text(path.join(' -> '));
    for (let i = 0; i < path.length; i++) {
      const curr = path[i];
      const next = path[i + 1];
      if (next) {
        const link = this.graph.getCell([curr, next].sort().join());
        link.label(0, {
          position: 0.5,
          attrs: {
            text: { text: ' ' + (i + 1) + ' ', 'font-size': 10, fill: 'white' },
            rect: {
              rx: 8,
              ry: 8,
              fill: 'black',
              stroke: 'black',
              'stroke-width': 5
            }
          }
        });
        this.pathLinks.push(link.attr(this.attrs.linkHighlighted));
      }
    }
  }
}
