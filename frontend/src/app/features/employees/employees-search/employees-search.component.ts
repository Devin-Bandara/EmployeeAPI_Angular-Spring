import { Component } from '@angular/core';
import { Form, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GetAllDepartments } from 'src/app/core/models/department.model';
import { EmployeeSearchRequest } from 'src/app/core/models/employee.model';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-employees-search',
  templateUrl: './employees-search.component.html',
  styleUrls: ['./employees-search.component.scss'],
})
export class EmployeesSearchComponent {
  employeeSeachForm: FormGroup;
  employeeName: string | null = null;
  departmentName: string | null = null;
  salary: number | null = null;
  editMode: boolean = false;
  editEmployeeId: number | null = null;
  departments: GetAllDepartments[] = [];
  searchResults: any[] = [];
  successMessage = '';
  errorMessage = '';

  constructor(private fb: FormBuilder, private apiService: ApiService,private router: Router) {
    this.employeeSeachForm = this.fb.group({
      employeeName: [''],
      departmentName: [''],
      salary: [''],
    });
  }

  ngOnInit(): void {
    this.loadDepartments();
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

  onSearch(): void {
    if (this.employeeSeachForm.valid) {
      const formValues = this.employeeSeachForm.value;
      const searchCriteria: EmployeeSearchRequest = {
        name: formValues.employeeName || undefined,
        department: formValues.departmentName || undefined,
        salary: formValues.salary ? Number(formValues.salary) : undefined,
      };
      this.apiService.EmployeeSearchRequest(searchCriteria).subscribe(
        (response) => {
          console.log('Search Results:', response);
          this.searchResults = response;
          alert('Search completed. Check console for results.');
        },
        (error) => {
          console.error('Error during search', error);
          console.log('Search Results:', searchCriteria);
          alert('Error during search. Please try again.');
        }
      );
    }
  }

  editEmployee(emp: any) {
    this.router.navigate(['/employees/add'], { queryParams: { id: emp.employeeId } });
  }

  deleteEmployee(emp: any) {
  console.log("Delete: ", emp);
  this.apiService.DeleteEmployeeRequest(emp.employeeId).subscribe(
      (response:string) => {
        console.log(response);
        alert(response);
        this.onSearch(); 
      },
      (error) => {
        console.error('Error deleting employee', error);
        alert('Error deleting employee. Please try again.');
      }
    );
}
goToAddEmployee(): void {
    this.router.navigate(['/employees/add']);
  }
  searchDepartments(): void {
    this.router.navigate(['/departments/getAll']);
  }
}
