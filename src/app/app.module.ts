import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './form/form.component';
import {HttpClientModule} from '@angular/common/http';
import { FormDisplayComponent } from './form-display/form-display.component';
import { StoreModule } from '@ngrx/store'
import { formReducer } from './store/form.reducer';
import { CommonModule } from '@angular/common';
import { SidenavComponent } from './sidenav/sidenav.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AgGridModule } from 'ag-grid-angular';
import { DeleteButtonRendererComponent } from './delete-button-renderer/delete-button-renderer.component';
import { DeletedUsersComponent } from './deleted-users/deleted-users.component';
import { RestoreButtonRenderComponent } from './restore-button-render/restore-button-render.component';
// import { ActiveDeletedComponent } from './active-deleted/active-deleted.component';
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FormDisplayComponent,
    SidenavComponent,
    DeleteButtonRendererComponent,
    DeletedUsersComponent,
    RestoreButtonRenderComponent,
    // ActiveDeletedComponent,
    
  ],
  
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule,
    AgGridModule,
    StoreModule.forRoot({formData:formReducer}, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
