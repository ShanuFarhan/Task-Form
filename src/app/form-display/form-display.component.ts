import { Component } from '@angular/core';
import { FormDataService } from '../form-data.service';

@Component({
  selector: 'app-form-display',
  templateUrl: './form-display.component.html',
  styleUrls: ['./form-display.component.css']
})
export class FormDisplayComponent {
  formData: any[] = []; 
  selected:any[]=[]
  page:number=1
  count:number=0
  tableSize:number= 5;
  tableSizes=[5,10,15,20]
  constructor(private formDataService: FormDataService) { }
  ngOnInit() {
    this.getData()
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
