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
    { id: 4, name: 'Gender', selected: false,type:'text' ,fixed: false,mandatory:false,value:'Male'},
    { id: 5, name: 'Contactno', selected: true,type:'number',fixed: true ,mandatory:true,value:''},
    { id: 6, name: 'Email', selected: false ,type:'email',fixed: false,mandatory:false,value:''},
    { id: 7, name: 'PANNo', selected: false,type:'text' ,fixed: false,mandatory:false,value:''},
    { id: 8, name: 'VoterID', selected: false,type:'text' ,fixed: false,mandatory:false,value:''},
    { id: 9, name: 'AadharNo', selected: false,type:'number',fixed: false ,mandatory:false,value:''},
    { id: 10, name: 'DrivingLicense', selected: false,type:'text' ,fixed: false,mandatory:false,value:''},
    { id: 11, name: 'FatherName', selected: false,type:'text',fixed: false ,mandatory:false,value:''},
    { id: 12, name: 'MotherName', selected: false,type:'text' ,fixed: false,mandatory:false,value:''},
    { id: 13, name: 'Siblings', selected: false,type:'text' ,fixed: false,mandatory:false,value:''},
    { id: 14, name: 'Income', selected: false,type:'number',fixed: false ,mandatory:false,value:''},
    { id: 15, name: 'Address', selected: false,type:'text' ,fixed: false,mandatory:false,value:''},
    { id: 16, name: 'Dateofbirth', selected: false,type:'date' ,fixed: false,mandatory:false,value:''},
  ];
  Siblings=[
    {id:1,name:"Male",selected:false},
    {id:2,name:"Female",selected:false},
  ]
  Gender=[
    {id:1,name:"Male",selected:false,value:'Male'},
    {id:2,name:"Female",selected:false,value:'Female'},
    {id:3,name:"Transgender",selected:false,value:''},
    {id:4,name:"Prefer Not to respond",selected:false,value:''},
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
  isNavbarOpen=true
  ngOnInit() {
    this.dynamicForm = this.fb.group({
      Firstname: ['', Validators.required],
      Age:['',Validators.required],
      Gender:['',Validators.required],
      Lastname:['',Validators.required],
      Contactno:['',[Validators.required,Validators.maxLength(10), Validators.minLength(10)]],
      Siblings:['',Validators.required],
      AadharNo:['',[Validators.required,aadhaarNumberValidator()]],
      Email:['',[Validators.required,Validators.email]],
      PANNo:['',[Validators.required,panNumberValidator()]],
      DrivingLicense:['',[Validators.required,drivingLicenseValidator()]],
      VoterID:['',[Validators.required,voterIdValidator()]],
      FatherName:['',Validators.required],
      MotherName:['',Validators.required],
      Income:['',Validators.required],
      Dateofbirth:['',Validators.required]

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
      field.value = '';
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
    this.formDataService.saveFields(selectedFields).subscribe(data=>{
        console.log("Changes saved",data);
    })
    // this.http.post('https://653fb25a9e8bd3be29e1100e.mockapi.io/addtocart/fields', selectedFields)
    //   .subscribe(
    //     (response) => {
    //       console.log('Changes saved successfully:', response);
    //     },
    //     (error) => {
    //       console.error('Error saving changes:', error);
    //     }
    //   );
    this.formDataService.getFields()
  }
  cancelbtn(){
    
    this.fields.forEach((field) => {
      field.selected = this.lastSavedFields.some((selectedField) => selectedField.id === field.id);
    });
  
    this.updateSelectedFields();
  }
  
  saveform(){
    this.submit=true
    this.markAllFieldsAsTouched();
    this.formSubmitted = true;
    const formData = this.dynamicForm.value
    
    const drivingLicense=this.dynamicForm.get('DrivingLicense')
    const panControl=this.dynamicForm.get('PANNo')
    const aadhaarNumberControl = this.dynamicForm.get('AadharNo');
    const emailControl = this.dynamicForm.get('Email');
    const contact=this.dynamicForm.get('Contactno')
    if(this.areMandatoryFieldsFilled() && contact&&contact.valid ){
    this.http.post('https://653fb25a9e8bd3be29e1100e.mockapi.io/addtocart/form', formData)
    .subscribe(
      (response) => {
        console.log('Form data saved successfully:', response);
        this.fields.forEach((field) => {
          this.dynamicForm.reset()
          this.router.navigate(['/form-display']);

        });
        this.formSubmitted = false;
        
      },
      (error) => {
        console.error('Error saving form data:', error);
      }
    );
    }
  
    this.formDataService.setFormData(formData);

  }
  markAllFieldsAsTouched() {
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
