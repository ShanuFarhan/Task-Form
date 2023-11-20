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
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    FormDisplayComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({formData:formReducer}, {})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
