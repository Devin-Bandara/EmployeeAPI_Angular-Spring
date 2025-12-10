package org.example.Controller;

import org.example.DTO.AddEmployeeDetails;
import org.example.DTO.EmployeeDetailsDto;
import org.example.Entity.Employee;
import org.example.Service.EmployeeService;
import org.springframework.stereotype.Controller;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/employees")
public class EmployeeController {
    private EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService){
        this.employeeService=employeeService;
    }
    @GetMapping("/all")
    public List<EmployeeDetailsDto> getAllEmployeeDetails(){
        return employeeService.getAllEmployeeDetails();
    }
    @GetMapping("/{id}")
    public EmployeeDetailsDto getEmployeeDetailsById(@PathVariable int id){
        return employeeService.getEmployeeDetailsById(id);
    }
    @GetMapping("/search")
    public List<EmployeeDetailsDto> searchEmployee(@RequestParam(required = false) String name,@RequestParam(required = false) String department,@RequestParam(required = false) Double salary){
        return employeeService.searchEmployees(name, department, salary);
    }
    @PostMapping("/add")
    public AddEmployeeDetails addEmployeeDetails(@RequestBody AddEmployeeDetails addEmployeeDetails){
        return employeeService.addEmployeeDetails(addEmployeeDetails);
    }
    @PatchMapping("/{id}")
    public EmployeeDetailsDto editEmployeeDetails(@PathVariable int id,@RequestBody EmployeeDetailsDto employeeDetailsDto){
        return employeeService.editEmployeeDetails(id,employeeDetailsDto);
    }
    @DeleteMapping("/{id}")
    public String deleteEmployeeById(@PathVariable int id){
        return employeeService.deleteEmployeeById(id);
    }

}
