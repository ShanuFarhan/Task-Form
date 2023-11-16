import { Component } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent {
  fields = [
    { id: 1, name: 'First Name', selected: true,type:'text',fixed: true,mandatory:true },
    { id: 2, name: 'Last Name', selected: true,type:'text',fixed: true ,mandatory:true},
    { id: 3, name: 'Age', selected: false,type:'number' ,fixed: false,mandatory:false},
    { id: 4, name: 'Gender', selected: false,type:'text' ,fixed: false,mandatory:false},
    { id: 5, name: 'Contact No', selected: true,type:'number',fixed: true ,mandatory:true},
    { id: 6, name: 'Email', selected: false ,type:'email',fixed: false,mandatory:false},
    { id: 7, name: 'PAN No', selected: false,type:'text' ,fixed: false,mandatory:false},
    { id: 8, name: 'Voter ID', selected: false,type:'text' ,fixed: false,mandatory:false},
    { id: 9, name: 'Aadhar No', selected: false,type:'number',fixed: false ,mandatory:false},
    { id: 10, name: 'Driving License', selected: false,type:'text' ,fixed: false,mandatory:false},
    { id: 11, name: 'Father Name', selected: false,type:'text',fixed: false ,mandatory:false},
    { id: 12, name: 'Mother Name', selected: false,type:'text' ,fixed: false,mandatory:false},
    { id: 13, name: 'Siblings', selected: false,type:'text' ,fixed: false,mandatory:false},
    { id: 14, name: 'Income', selected: false,type:'number',fixed: false ,mandatory:false},
    { id: 15, name: 'Address', selected: false,type:'text' ,fixed: false,mandatory:false},
    { id: 16, name: 'Date of birth', selected: false,type:'date' ,fixed: false,mandatory:false},
  ];

  selectedFields:any = [];
  ngOnInit() {
    const storedSelectedFields = JSON.parse(localStorage.getItem('selectedFields') || '[]');
    this.fields.forEach((field) => {
      if (field.fixed) {
        field.selected = true;
        field.mandatory=true
      } else {
        field.selected = storedSelectedFields.includes(field.id);
      }
    });
    this.updateSelectedFields()
  }
  updateSelectedFields() {
    this.selectedFields = this.fields.filter((field) => field.selected);
    const selectedFieldIds = this.selectedFields.map((field:any) => field.id);
    localStorage.setItem('selectedFields', JSON.stringify(selectedFieldIds));
  }
}
