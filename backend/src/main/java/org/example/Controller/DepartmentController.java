package org.example.Controller;

import org.example.DTO.DepartmentDtoDetails;
import org.example.DTO.DepartmentWithEmployeesNameDto;
import org.example.DTO.GetDepartmentDetailsDto;
import org.example.Entity.Department;
import org.example.Service.DepartmentService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/departments")
public class DepartmentController {
    private DepartmentService departmentService;
    public DepartmentController (DepartmentService departmentService){
        this.departmentService=departmentService;
    }
    @GetMapping("all")
    public List<GetDepartmentDetailsDto> getAllDepartments(){
        return departmentService.getAllDepartments();
    }
    @GetMapping("/{id}")
    public GetDepartmentDetailsDto getDepartmentById(@PathVariable int id) {
        return departmentService.getDepartmentById(id);
    }
    @PostMapping("/add")
    public Department addDepartment(@RequestBody DepartmentDtoDetails department) {
        return departmentService.addDepartment(department);
    }
    @PutMapping("/{id}")
    public DepartmentDtoDetails editDepartment(@PathVariable int id,@RequestBody DepartmentDtoDetails departmentDtoDetails) {
        return departmentService.editDepartmentById(id,departmentDtoDetails);
    }
    @GetMapping("/{id}/employees")
    public DepartmentWithEmployeesNameDto getDepartmentWiseEmployeeNames(@PathVariable int id){
        return departmentService.getDepartmentWiseEmployeeNames(id);
    }
    @DeleteMapping("/{id}")
    public String deleteDepartmentById(@PathVariable int id){
        return departmentService.deleteDepartmentById(id);
    }



}
