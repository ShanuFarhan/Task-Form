import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDisplayComponent } from './form-display/form-display.component';
import { FormComponent } from './form/form.component';

const routes: Routes = [
  {path:'',component:FormComponent},
  { path: 'form-display', component: FormDisplayComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
