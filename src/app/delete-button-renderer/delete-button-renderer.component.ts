import { Component ,OnInit,Output,EventEmitter} from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from "ag-grid-community";
import { FormDataService } from '../form-data.service';
import { Router } from '@angular/router';

@Component({
  template: `
   <button class="btn btn-dark" (click)="onDelete(value)">Delete</button>
   <button class="btn btn-dark" (click)="onEdit(value)">Edit</button>
  `,
})
export class DeleteButtonRendererComponent implements OnInit ,ICellRendererAngularComp {
deleteUser:any[]=[]
 constructor(private formdataservice:FormDataService,private route:Router){}
  value:any=[]
  formData:any[]=[]
  ngOnInit(){
this.formdataservice.getFormData().subscribe(res=>{
  this.formData=res
})
}
agInit(params: ICellRendererParams): void {  
  this.value=params.data
}

refresh(params: ICellRendererParams): boolean {
  return false
}
onDelete(value:number){
 
  this.formdataservice.deleteProduct(value).subscribe(re=>{
    console.log("deleted",re);
    this.deleteUser=re
    console.log("DeletedArray",this.deleteUser);
  })
  
}
onEdit(value:any){
  
  this.route.navigate(['/',value.id]);
  
  // this.formdataservice.editUser(value).subscribe((res:any)=>{
  //   console.log("Update",res);
    
  // })
}
}
