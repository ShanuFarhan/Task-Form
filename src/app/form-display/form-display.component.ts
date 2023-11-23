import { Component,OnDestroy } from '@angular/core';
import { FormDataService } from '../form-data.service';
import { ColDef ,GridOptions} from 'ag-grid-community';
import { DeleteButtonRendererComponent } from '../delete-button-renderer/delete-button-renderer.component';
import { Router } from '@angular/router';
import { Subject, pipe, takeUntil } from 'rxjs';

@Component({
  selector: 'app-form-display',
  templateUrl: './form-display.component.html',
  styleUrls: ['./form-display.component.css'],
 
})
export class FormDisplayComponent {
  private destroy$ = new Subject<void>();

  formData: any[] = []; 
  gridOptions!:GridOptions;
  page:number=1
  count:number=0
  tableSize:number= 5;
  deletedUser:any[]=[]
  tableSizes  =[5,10,15,20]
  private gridApi:any
  
  colDefs:ColDef[]=[
    {field:'Sl',valueGetter: 'node.rowIndex + 1'},{field:'Firstname'},{field:'Lastname'},
    {field:'Age'}, {field:'Contactno'}, {field:'Email'},{field:'AadharNo'},
    {field:'PANNo'},{field:'Income'},{field:'Gender'},{field:'VoterID'},
    {field:'FatherName'},{field:'MotherName'},{field:'DrivingLicense'},{field:'Dateofbirth'},
   {field:'Actions',
   cellRenderer:DeleteButtonRendererComponent,
  }
  ]

  constructor(private formDataService: FormDataService,private router: Router) { 
  }
getDeletedUser(){
 this.deletedUser=this.formDataService.getDeletedUser()
 console.log(this.deletedUser);
}
viewDeletedUsers(): void {
  this.router.navigate(['form-display/deleted-users']); 
}
viewActiveUsers(){
  this.router.navigate(['/form-display'])
}
  ngOnInit() {
    this.formDataService.onUserDeleted(),pipe(takeUntil(this.destroy$))
    this.getData()
    
    this.getDeletedUser()
    this.gridOptions = <GridOptions>{
      
      pagination: true,
      paginationPageSize: 5, 
    };
  }
 
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  onPageSizeChanged(event: any): void {
    const newPageSize = (event.target as HTMLSelectElement).value;
    this.gridOptions.paginationPageSize = +newPageSize; 
    this.getData();
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
  getData():void{
    this.formDataService.getFormData().subscribe((data) => {
      this.formData = data;
      this.count = this.formData.length;

      console.log("saveditems", this.formData);
    },
      (error) => {
        console.log("Error Fetching", error);

      }
    );
  }
  getSelectedFields(): any[] {
    return this.formData.filter((field) => field.selected);    
  }

}
