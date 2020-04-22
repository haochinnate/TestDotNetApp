import { Injectable } from '@angular/core';
import { CanDeactivate} from '@angular/router';
import { CarEditComponent } from '../carmodels/car-edit/car-edit.component';

@Injectable()
export class PreventUnsavedChanges implements CanDeactivate<CarEditComponent> {

    canDeactivate(component: CarEditComponent) {
        if (component.editForm.dirty) {
            return confirm('Are you sure you want to continue? Any unsaved changes will be lost');
        }
        return true;
    }

}