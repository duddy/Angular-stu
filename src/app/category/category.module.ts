import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryManagementComponent } from './category-management/category-management.component';
import { CategoryRoutingModule } from './category-routing.module';
import { CategoryDetailComponent } from './category-detail/category-detail.component';

@NgModule({
  declarations: [CategoryManagementComponent, CategoryDetailComponent],
  imports: [
    CommonModule,
    CategoryRoutingModule
  ]
})
export class CategoryModule { }
