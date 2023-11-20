import { Component } from '@angular/core';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-form-display',
  templateUrl: './form-display.component.html',
  styleUrls: ['./form-display.component.css']
})
export class FormDisplayComponent {
  formData: any[] = [];
constructor(private formDataService:FormDataService){}
ngOnInit() {
  this.formDataService.formData$.subscribe((formData) => {
    this.displayFormData(formData);
  });
}
displayFormData(formData: any[]){
  this.formData = formData;

}
}
