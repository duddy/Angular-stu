import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProductRoutingModel } from './product-routing.module';

@NgModule({
  declarations: [ProductManagementComponent],
  imports: [
    CommonModule, ProductRoutingModel
  ]
})
export class ProductModule { }