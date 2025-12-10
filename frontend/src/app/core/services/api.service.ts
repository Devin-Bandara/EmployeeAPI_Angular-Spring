import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AddDepartment, Department, GetAllDepartments, GetAllDepartmentsResponse, GetDepartmentByIdResponse, UpdateDepartmentRequest } from '../models/department.model';
import { CreateEmployeeRequest, EditEmployeeRequest, Employee, EmployeeSearchRequest, GetEmployeeByIdResponse } from '../models/employee.model';
@Injectable({ providedIn: 'root' })
export class ApiService {
  private apiBaseUrl = 'http://localhost:8080';
  constructor(private http: HttpClient) {}

  //department APIs
  getAllDepartments(): Observable<GetAllDepartments[]> {
    return this.http.get<GetAllDepartments[]>(`${this.apiBaseUrl}/departments/all`);
  }

  CreateDepartment(department: AddDepartment): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/departments/add`, department);
  }
  GetDepartmentById(depId: number): Observable<GetDepartmentByIdResponse> {
    return this.http.get<GetDepartmentByIdResponse>(`${this.apiBaseUrl}/departments/${depId}`);
  }
  GetAllDepartments(): Observable<GetAllDepartmentsResponse[]> {
    return this.http.get<GetAllDepartmentsResponse[]>(`${this.apiBaseUrl}/departments/all`);
  }
  DeleteDepartment(depId: number): Observable<string> {
    return this.http.delete(`${this.apiBaseUrl}/departments/${depId}`, { responseType: 'text' });
  }
  UpdateDepartment(depId: number, updateDepartment: UpdateDepartmentRequest): Observable<any> {
    return this.http.put<any>(`${this.apiBaseUrl}/departments/${depId}`, updateDepartment);
  }

  //Emploeeee APIs
  CreateEmployeeRequest(request: CreateEmployeeRequest): Observable<any> {
    return this.http.post<any>(`${this.apiBaseUrl}/employees/add`, request);
  }

  EmployeeSearchRequest(request: EmployeeSearchRequest): Observable<any> {
    return this.http.get<any[]>(`${this.apiBaseUrl}/employees/search`, { params: {
      name: request.name || '',
      department: request.department || '',
      salary: request.salary ? request.salary.toString() : ''
    } });
  }

  DeleteEmployeeRequest(empId: number): Observable<string> {
    return this.http.delete(`${this.apiBaseUrl}/employees/${empId}`, { responseType: 'text' });
  }
  EditEmployeeRequest(empId: number, editEmployee: EditEmployeeRequest): Observable<any> {
    return this.http.patch<any>(`${this.apiBaseUrl}/employees/${empId}`,editEmployee);
  }
  GetEmployeeById(empId: number): Observable<GetEmployeeByIdResponse> {
    return this.http.get<GetEmployeeByIdResponse>(`${this.apiBaseUrl}/employees/${empId}`);
  }
  
}
