import { Routes, RouterModule } from "@angular/router";
import { ProductManagementComponent } from './product-management/product-management.component';
import { NgModule } from '@angular/core';
import { ProductDetailResolverService } from './product-detail/product-detail-resolver.service';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductListResolverService } from './product-management/product-list/product-list-resolver.service';
import { CanDeactivateGuardService } from '../shared/can-deativate-guard.service';
import { SessionAuthGuardService } from '../shared/session-auth-guard.service';

const routes: Routes = [{
    path: 'product-list',
    children: [
        { path: '', pathMatch: 'full', resolve: { list: ProductListResolverService }, component: ProductManagementComponent },
        { path: 'product/:no', resolve: { detail: ProductDetailResolverService }, canDeactivate: [CanDeactivateGuardService], canActivate:[SessionAuthGuardService], component: ProductDetailComponent }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [ProductDetailResolverService, ProductListResolverService]
    
})
export class ProductRoutingModule { }