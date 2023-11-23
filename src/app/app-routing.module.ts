import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormDisplayComponent } from './form-display/form-display.component';
import { FormComponent } from './form/form.component';
import { DeletedUsersComponent } from './deleted-users/deleted-users.component';

const routes: Routes = [
  {path:'',component:FormComponent},
  { path: 'form-display', component: FormDisplayComponent},
  { path: 'form-display/deleted-users', component: DeletedUsersComponent },
  { path: ':id', component: FormComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
