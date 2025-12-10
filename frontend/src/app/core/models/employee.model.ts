export interface Employee {
id: number;
name: string;
salary?: number;
departmentId?: number;
// add other fields returned by backend
}

export interface CreateEmployeeRequest {
  empName: string,
  empSalary: number,
  DepName: string
}

export interface EmployeeSearchRequest{
  name?: string;
  department?: string;
  salary?: number;
}

export interface GetEmployeeByIdResponse {
  employeeId: number;
  empName: string;
  empSalary: number;
  depName: string;
}

export interface EditEmployeeRequest {
  employeeId: number,
  empName: string,
  empSalary: number,
  depName: string
}