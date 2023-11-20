import { HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { FormDataService } from '../form-data.service';
import { Router } from '@angular/router';
import { aadhaarNumberValidator, drivingLicenseValidator, panNumberValidator, voterIdValidator } from '../validations/validation';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  dynamicForm!: FormGroup;
  formSubmitted: boolean = false;

  
  fields = [
    { id: 1, name: 'Firstname', selected: true,type:'text',fixed: true,mandatory:true ,value:''},
    { id: 2, name: 'Lastname', selected: true,type:'text',fixed: false ,mandatory:false,value:''},
    { id: 3, name: 'Age', selected: false,type:'number' ,fixed: false,mandatory:false,value:''},
    { id: 4, name: 'Gender', selected: false,type:'text' ,fixed: false,mandatory:false,
    genderOptions:[{name:'Male',value:''},{name:'Female',value:''}]},
    { id: 5, name: 'Contactno', selected: true,type:'number',fixed: true ,mandatory:true,value:''},
    { id: 6, name: 'Email', selected: false ,type:'email',fixed: false,mandatory:false,value:''},
    { id: 7, name: 'PANNo', selected: false,type:'text' ,fixed: false,mandatory:false,value:''},
    { id: 8, name: 'VoterID', selected: false,type:'text' ,fixed: false,mandatory:false,value:''},
    { id: 9, name: 'AadharNo', selected: false,type:'number',fixed: false ,mandatory:false,value:''},
    { id: 10, name: 'DrivingLicense', selected: false,type:'text' ,fixed: false,mandatory:false,value:''},
    { id: 11, name: 'Father Name', selected: false,type:'text',fixed: false ,mandatory:false,value:''},
    { id: 12, name: 'Mother Name', selected: false,type:'text' ,fixed: false,mandatory:false,value:''},
    { id: 13, name: 'Siblings', selected: false,type:'text' ,fixed: false,mandatory:false,value:''},
    { id: 14, name: 'Income', selected: false,type:'number',fixed: false ,mandatory:false,value:''},
    { id: 15, name: 'Address', selected: false,type:'text' ,fixed: false,mandatory:false,value:''},
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
  // unitTrustsPnl: number
  submit=false
  Malecount: number=0;
  FemaleCount:number=0;
  inputFieldValues: any[] = [];
  inputFieldValue: any[] = [];
  selectedFields:any = [];
  genderSelected:any=[];
  addressSelected:any=[];
  siblingSelected:any=[];
  lastSavedFields: any[]=[];
  constructor(private fb: FormBuilder,private http:HttpClient,private formDataService:FormDataService,private router: Router) {
  
  }
  ngOnInit() {
    this.dynamicForm = this.fb.group({
      Firstname: ['', Validators.required],
      Age:['',Validators.required],
      Lastname:['',Validators.required],
      Contactno:['',Validators.required],
      Siblings:['',Validators.required],
      AadharNo:['',[Validators.required,aadhaarNumberValidator()]],
      Email:['',[Validators.required,Validators.email]],
      PANNo:['',[Validators.required,panNumberValidator()]],
      DrivingLicense:['',[Validators.required,drivingLicenseValidator()]],
      VoterID:['',[Validators.required,voterIdValidator()]]

    });
    const storedSelectedFields = JSON.parse(localStorage.getItem('selectedFields') || '[]');
    this.fields.forEach((field) => {
      field.selected = storedSelectedFields.some((selectedField:any) => selectedField.id === field.id);
    });
    // const storedSelectedFields = JSON.parse(localStorage.getItem('selectedFields') || '[]');
    this.fields.forEach((field) => {
      
      if (field.fixed) {
        field.selected = true;
        field.mandatory=true;
      } 
      
    });
    this.savebtn()
    this.updateSelectedFields();
    this.updateGender()
    this.updateAddress()
    this.updateSiblings()
  }
  
  getControl(name:any) {
    return this.dynamicForm.get(name)
  }
  getCount(){
    this.inputFieldValues = Array.from({length: this.Malecount }, (_, index) => index + 1);
    this.inputFieldValue = Array.from({ length: this.FemaleCount }, (_, index) => index + 1);
  }
  updateSelectedFields() {
    this.selectedFields = this.fields.filter((field) => field.selected);
    // const selectedFieldIds = this.selectedFields.map((field:any) => field.id);
    // localStorage.setItem('selectedFields', JSON.stringify(selectedFieldIds));
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
  resetbtn(){
    // this.http.delete('https://653fb25a9e8bd3be29e1100e.mockapi.io/addtocart/fields')
    // .subscribe(
    //   (response) => {
    //     console.log('Data deleted successfully:', response);
    //   },  
    //   (error) => {
    //     console.error('Error deleting data:', error);
    //   }
    // );
    this.fields.forEach((field)=>{
      field.selected=field.fixed
      field.value = undefined;
      field.mandatory=field.fixed
    })
    this.lastSavedFields = [...this.fields.filter((field) => field.selected )];
    localStorage.setItem('selectedFields', JSON.stringify(this.lastSavedFields));
    this.updateSelectedFields()
  }
  savebtn(){
    const selectedFields = this.fields.filter(field => field.selected);
    localStorage.setItem('selectedFields', JSON.stringify(selectedFields));
    this.lastSavedFields = [...selectedFields];
    this.http.post('https://653fb25a9e8bd3be29e1100e.mockapi.io/addtocart/fields', selectedFields)
      .subscribe(
        (response) => {
          console.log('Changes saved successfully:', response);
        },
        (error) => {
          console.error('Error saving changes:', error);
        }
      );
  }
  cancelbtn(){
    
    this.fields.forEach((field) => {
      field.selected = this.lastSavedFields.some((selectedField) => selectedField.id === field.id);
    });
  
    this.updateSelectedFields();
  }
  handleLabelClick(event: Event): void {
    event.stopPropagation();
  }
  saveform(){
    this.submit=true
    this.markAllFieldsAsTouched();
    this.formSubmitted = true;
    const formData = this.fields
    .filter(field => field.selected && 'value' in field) 
    .map(field => {
      return {
        name:field.name,
        value: field.value !== undefined ? field.value : ''
      };
    });
    const drivingLicense=this.dynamicForm.get('DrivingLicense')
    const panControl=this.dynamicForm.get('PANNo')
    const aadhaarNumberControl = this.dynamicForm.get('AadharNo');
    const emailControl = this.dynamicForm.get('Email');
    if(this.areMandatoryFieldsFilled() ){
    this.http.post('https://653fb25a9e8bd3be29e1100e.mockapi.io/addtocart/form', formData)
    .subscribe(
      (response) => {
        console.log('Form data saved successfully:', response);
        this.fields.forEach((field) => {
          this.dynamicForm.reset()  
        });
        this.formSubmitted = false;
        
      },
      (error) => {
        console.error('Error saving form data:', error);
      }
    );
    }
  
    this.formDataService.updateFormData(formData);
    this.router.navigate(['/form-display']);

  }
  markAllFieldsAsTouched() {
    // Mark all fields as touched to trigger error messages
    Object.keys(this.dynamicForm.controls).forEach(field => {
      const control = this.dynamicForm.get(field);
      control?.markAsTouched({ onlySelf: true });
    });
  }
  areMandatoryFieldsFilled(): boolean {
    if(!this.formSubmitted){
      return true
    }
    const mandatoryFields = this.fields.filter(field => field.mandatory && field.selected && !field.value);
  
    for (const field of mandatoryFields) {
      if (!field.value) {
        return false; 
      }
    }
  
    return true; 
  }
}
