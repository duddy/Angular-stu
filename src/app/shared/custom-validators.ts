import { AbstractControl } from '@angular/forms';

export class NumberRangeValidator {
    static min(min: number) {
        return (control: AbstractControl): {[key: string]: any} => {
            return control.value >= min ? null : {'min': `Input ${min} more`};
        };
    }

    static max(max: number) {
        return (control: AbstractControl): {[key: string]: any} => {
            return control.value <= max ? null : {'max': `Input ${max} less`}
        }
    }
}