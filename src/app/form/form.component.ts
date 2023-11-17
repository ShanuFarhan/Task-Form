import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  dynamicForm!: FormGroup;
  fields = [
    { id: 1, name: 'First Name', selected: true,type:'text',fixed: true,mandatory:true },
    { id: 2, name: 'Last Name', selected: true,type:'text',fixed: false ,mandatory:false},
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
    { id: 15, name: 'Address', selected: false,type:'text' ,fixed: false,mandatory:false,},
    { id: 16, name: 'Date of birth', selected: false,type:'date' ,fixed: false,mandatory:false},
  ];
  Siblings=[
    {id:1,name:"Male",selected:false},
    {id:2,name:"Female",selected:false},
  ]
  Gender=[
    {id:1,name:"Male",selected:false},
    {id:2,name:"Female",selected:false},
    {id:3,name:"Transgender",selected:false},
    {id:4,name:"Prefer Not to respond",selected:false},
  ];
  Address=[
    {id:1,name:"Home",selected:false,value:''},
    {id:2,name:"PG",selected:false,value:''},
    {id:3,name:"Office",selected:false,value:''},
  ]
 
  Malecount: number=0;
  FemaleCount:number=0;
  inputFieldValues: any[] = [];
  inputFieldValue: any[] = [];
  selectedFields:any = [];
  genderSelected:any=[];
  addressSelected:any=[];
  siblingSelected:any=[];
  constructor(private fb: FormBuilder) {}
  ngOnInit() {
    this.dynamicForm = this.fb.group({
      numberOfFields: ['', Validators.required],
      field: this.fb.array([])
    });
    const storedSelectedFields = JSON.parse(localStorage.getItem('selectedFields') || '[]');
    this.fields.forEach((field) => {
      // if(field.name==='First Name' || field.name==='Contact No'){
      //   field.mandatory=true;
      // }else{
      //   field.mandatory=false
      // }
      if (field.fixed) {
        field.selected = true;
        field.mandatory=true;
      } else {
        field.selected = storedSelectedFields.includes(field.id);
        if (!field.fixed && field.selected) {
          field.mandatory = true;
        }
      }
    });
    this.updateSelectedFields();
    this.updateGender()
    this.updateAddress()
    this.updateSiblings()
  }
  generateInputFields() {
    
     }
  get field() {
    return this.dynamicForm.get('field') as FormArray;
  }
  getCount(){
    this.inputFieldValues = Array.from({length: this.Malecount }, (_, index) => index + 1);
    this.inputFieldValue = Array.from({ length: this.FemaleCount }, (_, index) => index + 1);
  }
  updateSelectedFields() {
    this.selectedFields = this.fields.filter((field) => field.selected);
    const selectedFieldIds = this.selectedFields.map((field:any) => field.id);
    localStorage.setItem('selectedFields', JSON.stringify(selectedFieldIds));
  }
  updateGender(){
    this.genderSelected=this.Gender.filter((field:any)=>field.selected)
  }
  updateAddress(){
    this.addressSelected=this.Address.filter((field:any)=>field.selected)
  }
  updateSiblings(){
    this.siblingSelected=this.Siblings.filter((field:any)=>field.selected)
  }
}
