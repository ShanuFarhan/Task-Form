
import { createAction, props } from '@ngrx/store';

export const updateFormData = createAction(
  '[Form] Update Form Data',
  props<{ formData: any[] }>()
);
