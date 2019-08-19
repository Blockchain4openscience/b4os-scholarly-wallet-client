import { DiscosService } from './discos.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';

@Injectable()
export class BundleResolver implements Resolve<any> {

  constructor(private disco: DiscosService) {}

  resolve(route: ActivatedRouteSnapshot) {
    return this.disco.get(route.paramMap.get('id'));
  }
}
