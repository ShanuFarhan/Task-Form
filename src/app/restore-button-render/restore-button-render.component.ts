import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from "ag-grid-community";
import { FormDataService } from '../form-data.service';
@Component({
  selector: 'app-restore-button-render',
  template: `
   <button class="btn btn-dark" (click)="OnRestore(value)">Restore</button>
  `,
  styleUrls: ['./restore-button-render.component.css']
})
export class RestoreButtonRenderComponent implements OnInit,ICellRendererAngularComp  {
  constructor(private FormDataService:FormDataService){}
  value:any
  ngOnInit(){

  }
  agInit(params: ICellRendererParams): void {
  
    this.value=params.data
  }
  
  refresh(params: ICellRendererParams): boolean {
    return false
  }
  OnRestore(value:any):void{
      this.FormDataService.restoreDeletedUser(value).subscribe(()=>{
        console.log("Restored",value);
      })
  }
}
