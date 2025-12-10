import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeeAddComponent } from './features/employees/employee-add/employee-add.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { DepartmentAddComponent } from './features/departments/department-add/department-add.component';
import { EmployeesSearchComponent } from './features/employees/employees-search/employees-search.component';
import { DepartmentsAllComponent } from './features/departments/departments-all/departments-all.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeAddComponent,
    DepartmentAddComponent,
    EmployeesSearchComponent,
    DepartmentsAllComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule, 
    HttpClientModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
