import { Component } from '@angular/core';
import { ColDef, GridOptions } from 'ag-grid-community';
import { FormDataService } from '../form-data.service';
import { Router } from '@angular/router';
import { RestoreButtonRenderComponent } from '../restore-button-render/restore-button-render.component';

@Component({
  selector: 'app-deleted-users',
  templateUrl: './deleted-users.component.html',
  styleUrls: ['./deleted-users.component.css']
})
export class DeletedUsersComponent {
  constructor(private formservicedata:FormDataService,private router:Router){}
  deletedUsers: any[] = [];
  gridOptions!:GridOptions;
  formData: any[] = []; 
  page:number=1
  count:number=0
  tableSize:number= 5;
  tableSizes  =[5,10,15,20]
  colDefs:ColDef[]=[
    {field:'Sl',valueGetter: 'node.rowIndex + 1'},{field:'Firstname'},{field:'Lastname'},
    {field:'Age'}, {field:'Contactno'}, {field:'Email'},{field:'AadharNo'},
    {field:'PANNo'},{field:'Income'},{field:'Gender'},{field:'VoterID'},
    {field:'FatherName'},{field:'MotherName'},{field:'DrivingLicense'},{field:'Dateofbirth'},
    {field:'Actions',cellRenderer:RestoreButtonRenderComponent}
  ]
  ngOnInit(): void {
    this.deletedUsers = this.formservicedata.getDeletedUser();
    this.getData()
    console.log(this.deletedUsers);
    this.gridOptions = <GridOptions>{
      
      pagination: true,
      paginationPageSize: 5, 
    };
    
  }
  getData():void{
    this.formservicedata.getFormData().subscribe((data) => {
      this.formData = data;
      this.count = this.formData.length;

      console.log("saveditems", this.formData);
    },
      (error) => {
        console.log("Error Fetching", error);

      }
    );
  }
  getCurrentPageRange(): string {
    const startIdx = (this.page - 1) * this.tableSize + 1;
    const endIdx = Math.min(this.page * this.tableSize);
    const entries=this.count
    return `Showing ${startIdx} to ${endIdx} of ${entries} entries`;
  }
  onTableChange(event:any){
    this.page=event
    this.getData()
  }
  onTableSizeChange(event:any):void{
    this.tableSize=event.target.value;
    this.page=1
    this.getData()
  }
  getSelectedFields(): any[] {
    return this.formData.filter((field) => field.selected);    
  }
  onPageSizeChanged(event: any): void {
    const newPageSize = (event.target as HTMLSelectElement).value;
    this.gridOptions.paginationPageSize = +newPageSize; 
    this.getData();
  }
  viewDeletedUsers(): void {
    this.router.navigate(['form-display','deleted-users']); 
  }
  viewActiveUsers(){
    this.router.navigate(['/form-display'])
  }
}
