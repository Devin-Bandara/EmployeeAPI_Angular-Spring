import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from 'src/app/core/services/api.service';
import { CreateEmployeeRequest, EditEmployeeRequest } from 'src/app/core/models/employee.model';
import { GetAllDepartments } from 'src/app/core/models/department.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.scss']
})
export class EmployeeAddComponent implements OnInit {
  empForm: FormGroup;
  departments: GetAllDepartments[] = [];
  editMode: boolean = false;         // true when editing
  editEmployeeId: number | null = null;
  successMessage='';
  errorMessage='';

  constructor(private fb: FormBuilder, private apiService: ApiService,private route: ActivatedRoute,private router: Router) {
    this.empForm = this.fb.group({
      empName: ['', Validators.required],
      empSalary: ['', [Validators.required, Validators.min(0)]],
      depName: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
    const idParam = this.route.snapshot.queryParamMap.get('id');
    if(idParam){
      this.editMode=true;
      this.editEmployeeId = Number(idParam);
      this.apiService.GetEmployeeById(this.editEmployeeId).subscribe(
        (emp) => {
          this.empForm.patchValue({
            empName: emp.empName,
            empSalary: emp.empSalary,
            depName: emp.depName
          });
        },
        (error) => {
          console.error('Error fetching employee details', error);
        }
      );
    }
  }

  loadDepartments(): void {
    this.apiService.getAllDepartments().subscribe(
      (data) => {
        this.departments = data;
        console.log('Departments fetched:', data);
      },
      (error) => {
        console.error('Error fetching departments', error);
      }
    );
  }
  onSubmit(): void {
    if (this.empForm.valid) {
      const formValues = this.empForm.value;
      const newEmployee: CreateEmployeeRequest = {
        empName: formValues.empName,
        empSalary: formValues.empSalary,
        DepName: formValues.depName  
      };
      const editEmployee:EditEmployeeRequest={
        employeeId: this.editEmployeeId!,
        empName: formValues.empName,
        empSalary: formValues.empSalary,
        depName: formValues.depName  
      };
      if(this.editMode && this.editEmployeeId !== null){
        this.apiService.EditEmployeeRequest(this.editEmployeeId,editEmployee).subscribe(
          (response) => {
            console.log('Employee updated successfully', response);
            alert('Employee updated successfully!');
            this.empForm.reset();
            this.editMode = false;
            this.editEmployeeId = null;
            this.router.navigate([''])
          },
          (error) => {
            console.error('Error updating employee', error);
            console.log('Submitted data:', editEmployee);
            alert('Error updating employee. Please try again.');
          }
        );
        return;
      }else{
        this.apiService.CreateEmployeeRequest(newEmployee).subscribe(
        (response) => {
          console.log('Employee added successfully', response);
          alert('Employee added successfully!');
          this.empForm.reset();
          this.router.navigate([''])
        },
        (error) => {
          console.error('Error adding employee', error);
          console.log('Submitted data:', newEmployee);
          alert('Error adding employee. Please try again.');
        }
      );
      }
    }
  }

}
