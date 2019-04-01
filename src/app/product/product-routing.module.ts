import { Routes, RouterModule } from "@angular/router";
import { ProductManagementComponent } from './product-management/product-management.component';
import { NgModule } from '@angular/core';

const routes: Routes = [{ path: 'product-list', component: ProductManagementComponent }];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports:[RouterModule]
})
export class ProductRoutingModel { }