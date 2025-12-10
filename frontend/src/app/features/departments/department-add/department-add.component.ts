import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AddDepartment, GetDepartmentByIdResponse, UpdateDepartmentRequest } from 'src/app/core/models/department.model';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.scss'],
})
export class DepartmentAddComponent implements OnInit{
  editMode: boolean = false; 
  editDepartmentId: number | null = null;
  depForm: FormGroup;
  depName='';
  successMessage='';
  errorMessage='';

  constructor(private fb: FormBuilder, private apiService: ApiService,private route: ActivatedRoute,private router: Router) {
    this.depForm = this.fb.group({
      depName: ['', Validators.required],
    });
  }
  ngOnInit(): void {
    const idParam = this.route.snapshot.queryParamMap.get('id');
    if(idParam){
      this.editMode=true;
      this.editDepartmentId = Number(idParam);
      this.apiService.GetDepartmentById(this.editDepartmentId).subscribe(
        (dep) => {
          this.depForm.patchValue({
            depName: dep.depName,
          });
        },
        (error) => {
          console.error('Error fetching department details', error);
        }
      );
    }
  }

  onSubmit(): void {
      if (this.depForm.valid) {
        const formValues = this.depForm.value;
        const newDepartment: AddDepartment = {
          depName: formValues.depName,
        };
        const editDepartment :UpdateDepartmentRequest={
          depName:formValues.depName
        }
        if(this.editMode&& this.editDepartmentId !== null){
          this.apiService.UpdateDepartment(this.editDepartmentId,editDepartment).subscribe(
            (response) => {
              console.log('Department updated successfully', response);
              alert('Department updated successfully!');
              this.depForm.reset();
              this.editMode=false;
              this.router.navigate(['departments/getAll']);
            },
            (error) => {
              console.error('Error fetching department', error);
              alert('Error fetching department. Please try again.');
            }
          );
          return;
        }
        

        this.apiService.CreateDepartment(newDepartment).subscribe(
          (response) => {
            console.log('Department added successfully', response);
            alert('Department  added successfully!');
            this.depForm.reset();
            this.router.navigate(['departments/getAll']);
          },
          (error) => {
            console.error('Error adding department', error);
            console.log('Submitted data:', newDepartment);
            alert('Error adding department. Please try again.');
          }
        );
      }
    }


}
