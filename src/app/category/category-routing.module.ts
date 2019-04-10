import { Routes, RouterModule } from "@angular/router";
import { CategoryManagementComponent } from './category-management/category-management.component';
import { NgModule } from '@angular/core';
import { CategoryDetailResolverService } from './category-detail/category-detail-resolver.service';
import { CategoryDetailComponent } from './category-detail/category-detail.component';
import { CategoryListResolverService } from './category-management/category-list-resolver.service';
import { CanDeactivateGuardService } from '../shared/can-deativate-guard.service';
import { SessionAuthGuardService } from '../shared/session-auth-guard.service';

const routes: Routes = [{ path: 'category-list', children:[
        {path: '', pathMatch: 'full', resolve: {list: CategoryListResolverService}, component: CategoryManagementComponent},
        {path: 'category/:no', resolve:{category: CategoryDetailResolverService}, canDeactivate: [CanDeactivateGuardService],
            canActivate:[SessionAuthGuardService],
            component: CategoryDetailComponent}]
        }
    ];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
    providers: [ CategoryDetailResolverService, CategoryListResolverService]
})
export class CategoryRoutingModule {}