import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { GetAllDepartmentsResponse } from 'src/app/core/models/department.model';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-departments-all',
  templateUrl: './departments-all.component.html',
  styleUrls: ['./departments-all.component.scss']
})
export class DepartmentsAllComponent implements OnInit{
  ngOnInit(): void {
    this.loadAllDepartments();
  }
  getAllDepForm:FormGroup;
  departments: GetAllDepartmentsResponse[] = [];
  successMessage='';
  errorMessage='';

  constructor(private fb:FormBuilder,private apiService:ApiService,private router:Router){
    this.getAllDepForm=this.fb.group({
      depName:[''],
      depId:['']
    });
  }

  loadAllDepartments():void{  
    this.apiService.GetAllDepartments().subscribe(
      (response:GetAllDepartmentsResponse[])=>{
        console.log('Departments fetched successfully',response);
        this.departments=response;
      },
      (error)=>{
        console.error('Error fetching departments',error);
        alert('Error fetching departments. Please try again.');
      }
    );
  }
  onEdit(d:GetAllDepartmentsResponse):void{
    this.router.navigate(['/departments/add'], { queryParams: { id: d.depID } });

  }
  onDelete(depId:number):void{
    this.apiService.DeleteDepartment(depId).subscribe(
      (response)=>{
        console.log('Department deleted successfully',response);
        alert('Department deleted successfully!');
        this.loadAllDepartments();
      },
      (error)=>{
        console.error('Error deleting department',error);
        alert('Error deleting department. Please try again.');
      }
    );

  }
  addDepartment():void{
    this.router.navigate(['/departments/add']);
  }

}
