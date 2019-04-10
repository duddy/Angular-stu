import { NgModule } from "@angular/core";
import { NoCounterService } from './no-counter.service';
import { DataStoreService } from './data-store.service';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { SpinnerService } from './loading-spinner/spinner.service';
import { CommonModule } from '@angular/common';
import { CanDeactivateGuardService } from './can-deativate-guard.service';
import { SessionAuthGuardService } from './session-auth-guard.service';

@NgModule({
    imports: [CommonModule],
    providers: [NoCounterService, DataStoreService, SpinnerService, CanDeactivateGuardService, SessionAuthGuardService],
    declarations: [LoadingSpinnerComponent],
    exports: [LoadingSpinnerComponent]
})
export class SharedModule {}