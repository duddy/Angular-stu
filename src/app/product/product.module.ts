import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductManagementComponent } from './product-management/product-management.component';
import { ProductRoutingModel } from './product-routing.module';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ButtonGroupComponent } from './product-management/button-group/button-group.component';
import { ReactiveFormsModule, FormsModule  } from '@angular/forms';
import { ProductListComponent } from './product-management/product-list/product-list.component';
import { PROD_LIST_PAGE_SIZE } from './products.tokens';

@NgModule({
  declarations: [ProductManagementComponent, ProductDetailComponent, ButtonGroupComponent, ProductListComponent],
  imports: [
    CommonModule, ProductRoutingModel, ReactiveFormsModule, FormsModule 
  ],
  providers: [{provide: PROD_LIST_PAGE_SIZE, useValue: 6}]
})
export class ProductModule { }