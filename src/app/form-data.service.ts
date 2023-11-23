import { HttpClient } from '@angular/common/http';
import { Injectable,EventEmitter  } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class FormDataService {
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
private formData:any[]=[]
selectedFields:any[]=[]
private deletedUserSubject = new EventEmitter<void>();
private deletedUsers:any[]=[]

constructor(private http:HttpClient){
  const storedDeletedUsers = localStorage.getItem('deletedUsers');
    if (storedDeletedUsers) {
      this.deletedUsers = JSON.parse(storedDeletedUsers);
    }
}
saveFormData(data: any): Observable<any> {
  return this.http.post('https://653fb25a9e8bd3be29e1100e.mockapi.io/addtocart/form', data);
}
saveFields(data:any):Observable<any>{
  return this.http.post('https://653fb25a9e8bd3be29e1100e.mockapi.io/addtocart/fields',data)
}
deleteProduct(value:any):Observable<any> {
  console.log(value.id);
  const url=`https://653fb25a9e8bd3be29e1100e.mockapi.io/addtocart/form/${value.id}`
  this.deletedUsers.push(value);
  localStorage.setItem('deletedUsers', JSON.stringify(this.deletedUsers));
  return this.http.delete(url).pipe(
    tap(() => this.deletedUserSubject.emit())
  );
}
getDeletedUser():any[] {
  console.log(this.deletedUsers);
  return this.deletedUsers;
}
restoreDeletedUser(user: any): Observable<any> {
  const url = 'https://653fb25a9e8bd3be29e1100e.mockapi.io/addtocart/form';
  const index = this.deletedUsers.findIndex((deletedUser) => deletedUser.id === user.id);
  if (index !== -1) {
    this.deletedUsers.splice(index, 1);
  }
  localStorage.setItem('deletedUsers', JSON.stringify(this.deletedUsers));

  return this.http.post(url, user).pipe(
    tap(() => this.deletedUserSubject.emit())
  );
}
getFormDetails(id: number): Observable<any> {
  console.log(id);
  return this.http.get(`https://653fb25a9e8bd3be29e1100e.mockapi.io/addtocart/form/${id}`);
}
editUser(id:number,user: any): Observable<any> {
  console.log(id);
  
  const url = `https://653fb25a9e8bd3be29e1100e.mockapi.io/addtocart/form/${id}`;

  return this.http.put<any>(url,user);

}
onUserDeleted(): Observable<void> {
  return this.deletedUserSubject.asObservable();
}
getFields():Observable<any>{
  return this.http.get<any>('https://653fb25a9e8bd3be29e1100e.mockapi.io/addtocart/fields')
}
getFormData(): Observable<any> {
  return this.http.get<any>('https://653fb25a9e8bd3be29e1100e.mockapi.io/addtocart/form');
}
setFormData(data: any[]): void {
  this.formData = data;
}
getCachedFormData(): any[] {
  return this.formData;
}
// private formDataSubject = new BehaviorSubject<any[]>([]);

//   formData$ = this.formDataSubject.asObservable();

//   updateFormData(data: any[]) {
//     this.formDataSubject.next(data);
//   }
}