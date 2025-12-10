import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeAddComponent } from './features/employees/employee-add/employee-add.component';
import { DepartmentAddComponent } from './features/departments/department-add/department-add.component';
import { EmployeesSearchComponent } from './features/employees/employees-search/employees-search.component';
import { DepartmentsAllComponent } from './features/departments/departments-all/departments-all.component';

const routes: Routes = [
  { path: 'employees/add', component: EmployeeAddComponent },
  { path: '', component: EmployeesSearchComponent },
  { path: 'departments/add', component: DepartmentAddComponent },
  { path: 'departments/getAll', component: DepartmentsAllComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
