import { Component, OnInit } from '@angular/core';
import * as jQuery from 'jquery';
import * as _ from 'lodash';
import * as $ from 'backbone';
import * as joint from 'jointjs';

@Component({
  selector: 'b4os-create-disco',
  templateUrl: './create-disco.component.html',
  styleUrls: ['./create-disco.component.css']
})
export class CreateDiscoComponent implements OnInit {
  constructor() {}

  ngOnInit() {
    const graph = new joint.dia.Graph();

    const paper = new joint.dia.Paper({
      el: jQuery('#paper'),
      width: 600,
      height: 600,
      model: graph,
      gridSize: 1
    });

    const rect = new joint.shapes.basic.Rect({
      position: { x: 100, y: 30 },
      size: { width: 100, height: 30 },
      attrs: { rect: { fill: 'blue' }, text: { text: 'my box', fill: 'white' } }
    });

    const rect2 = rect.clone() as joint.shapes.basic.Rect;
    rect2.translate(300);

    const rect3 = rect.clone() as joint.shapes.basic.Rect;
    rect3.translate(200);

    const link = new joint.dia.Link({
      source: { id: rect.id },
      target: { id: rect2.id }
    });

    graph.addCells([rect, rect2, rect3, link]);
  }
}
