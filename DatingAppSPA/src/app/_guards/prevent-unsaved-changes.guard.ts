import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable()
export class PreventUnsavedChanges
  implements CanDeactivate<MemberEditComponent> {
  canDeactivate(component: MemberEditComponent): boolean {
    if (component.editProfileForm.dirty) {
      return confirm(
        'Any unsaved changes will be lost. Do you want to continue?'
      );
    }
    return true;
  }
}
