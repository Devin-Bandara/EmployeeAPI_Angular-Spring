package org.example.Service;

import org.example.DTO.AddEmployeeDetails;
import org.example.DTO.EmployeeDetailsDto;
import org.example.Entity.Department;
import org.example.Entity.Employee;
import org.example.Repository.DepartmentRepo;
import org.example.Repository.EmployeeRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class EmployeeService {
    private DepartmentRepo departmentRepo;
    private EmployeeRepo employeeRepo;

    public EmployeeService(DepartmentRepo departmentRepo,EmployeeRepo employeeRepo){
        this.departmentRepo=departmentRepo;
        this.employeeRepo=employeeRepo;
    }

    public EmployeeDetailsDto getEmployeeDetailsById(int id){
        Employee employee=employeeRepo.findById(id).orElseThrow(null);
        EmployeeDetailsDto employeeDetailsDto=new EmployeeDetailsDto();
        employeeDetailsDto.setEmployeeId(employee.getEmployeeId());
        employeeDetailsDto.setEmpName(employee.getName());
        employeeDetailsDto.setEmpSalary(employee.getSalary());
        employeeDetailsDto.setDepName(employee.getDepartment().getName());
        return employeeDetailsDto;
    }
    public List<EmployeeDetailsDto>getAllEmployeeDetails(){
        List <Employee>employees=employeeRepo.findAll();
        List<EmployeeDetailsDto> dtoList = new ArrayList<>();
        for(Employee emp : employees){
            EmployeeDetailsDto employeeDetailsDto=new EmployeeDetailsDto();
            employeeDetailsDto.setEmpName(emp.getName());
            employeeDetailsDto.setEmpSalary(emp.getSalary());
            employeeDetailsDto.setDepName(emp.getDepartment().getName());
            dtoList.add(employeeDetailsDto);
        }
        return dtoList;
    }
    public AddEmployeeDetails addEmployeeDetails(AddEmployeeDetails addEmployeeDetails){
        Department department = departmentRepo.findByName(addEmployeeDetails.getDepName());
        if(department == null){
            throw new RuntimeException("Department not found: " + addEmployeeDetails.getDepName());
        }
        Employee employee=new Employee();
        employee.setDepartment(department);
        employee.setName(addEmployeeDetails.getEmpName());
        employee.setSalary(addEmployeeDetails.getEmpSalary());
        Employee savedEmployee=  employeeRepo.save(employee);

        // Convert to DTO
        AddEmployeeDetails dto = new AddEmployeeDetails();
        dto.setEmpName(savedEmployee.getName());
        dto.setEmpSalary(savedEmployee.getSalary());
        dto.setDepName(savedEmployee.getDepartment().getName());

        return dto;
    }

    public EmployeeDetailsDto editEmployeeDetails(int id, EmployeeDetailsDto employeeDetailsDto) {
        Employee employee = employeeRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Employee not found with id " + id));

        // Update name only if provided
        if (employeeDetailsDto.getEmpName() != null) {
            employee.setName(employeeDetailsDto.getEmpName());
        }
        // Update salary only if provided
        if (employeeDetailsDto.getEmpSalary() != null) {
            employee.setSalary(employeeDetailsDto.getEmpSalary());
        }

        // Update department only if provided
        if (employeeDetailsDto.getDepName() != null) {
            Department department = departmentRepo.findByName(employeeDetailsDto.getDepName());
            if (department == null) {
                throw new RuntimeException("Department not found: " + employeeDetailsDto.getDepName());
            }
            employee.setDepartment(department);
        }

        Employee updatedEmployee = employeeRepo.save(employee);

        // Convert to DTO
        EmployeeDetailsDto updatedDto = new EmployeeDetailsDto();
        updatedDto.setEmpName(updatedEmployee.getName());
        updatedDto.setEmpSalary(updatedEmployee.getSalary());
        updatedDto.setDepName(updatedEmployee.getDepartment() != null ? updatedEmployee.getDepartment().getName() : null);

        return updatedDto;
    }

    public String deleteEmployeeById(int id){
        employeeRepo.findById(id).orElseThrow(()->new RuntimeException("Employee "+id+"does not exists"));
        employeeRepo.deleteById(id);
        return "Employee deleted successfully";
    }
    public List<EmployeeDetailsDto> searchEmployees(String name, String department, Double salary){
        List<Employee> employeeList=employeeRepo.searchEmployees(name, department, salary);
        List<EmployeeDetailsDto> employeeDetailsDtoList=new ArrayList<>();
        for(Employee emp:employeeList){
            EmployeeDetailsDto employeeDetailsDto=new EmployeeDetailsDto();
            employeeDetailsDto.setEmployeeId(emp.getEmployeeId());
            employeeDetailsDto.setDepName(emp.getDepartment().getName());
            employeeDetailsDto.setEmpName(emp.getName());
            employeeDetailsDto.setEmpSalary(emp.getSalary());
            employeeDetailsDtoList.add(employeeDetailsDto);
        }
        return employeeDetailsDtoList;
    }

}
