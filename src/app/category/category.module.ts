import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryManagementComponent } from './category-management/category-management.component';

@NgModule({
  declarations: [CategoryManagementComponent],
  imports: [
    CommonModule
  ],
  exports: [
    CategoryManagementComponent
  ]
})
export class CategoryModule { }
