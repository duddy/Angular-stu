import { Pipe, PipeTransform } from '@angular/core';
import { ProdStatus } from './product.model';

@Pipe({
  name: 'productStatus'
})
export class ProductStatusPipe implements PipeTransform {
  private labelMap;

  constructor() {
    this.labelMap = {};
    this.labelMap[ProdStatus.WAIT_FOR_SALE] = 'prepare';
    this.labelMap[ProdStatus.ON_SALE] = 'on sale';
    this.labelMap[ProdStatus.NOT_FOR_SALE] = 'NFS';
  }

  transform(value: any, args?: any): any {
    if(value !== undefined && this.labelMap.hasOwnProperty(value)) {
      console.log(this.labelMap[value]);
      return this.labelMap[value];
    }
    return '-';
  }

}
