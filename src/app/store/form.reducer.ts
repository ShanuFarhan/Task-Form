
import { createReducer, on } from '@ngrx/store';
import * as FormActions from './form.action';

export const initialState: any[] = [];

export const formReducer = createReducer(
  initialState,
  on(FormActions.updateFormData, (state, { formData }) => formData)
);
