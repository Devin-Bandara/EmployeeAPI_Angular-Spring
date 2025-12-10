package org.example.Service;

import org.example.DTO.DepartmentDtoDetails;
import org.example.DTO.DepartmentWithEmployeesNameDto;
import org.example.DTO.EmployeeDetailsDto;
import org.example.DTO.GetDepartmentDetailsDto;
import org.example.Entity.Department;
import org.example.Entity.Employee;
import org.example.Repository.DepartmentRepo;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class DepartmentService {
    private DepartmentRepo departmentRepo;
    public DepartmentService(DepartmentRepo departmentRepo){
        this.departmentRepo=departmentRepo;
    }
    public GetDepartmentDetailsDto  getDepartmentById(int id){
        try{
        Department department=departmentRepo.findById(id).orElse(null);
            if (department != null) {
                return getDepartmentNames(department);
            }
            else return null;
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }
    private GetDepartmentDetailsDto getDepartmentNames(Department department){
        GetDepartmentDetailsDto getDepartmentDetailsDto=new GetDepartmentDetailsDto();
        getDepartmentDetailsDto.setDepName(department.getName());
        getDepartmentDetailsDto.setDepID(department.getDepartmentId());
        return getDepartmentDetailsDto;
    }

    public Department addDepartment (DepartmentDtoDetails department){
            Department exsistingDepartment = departmentRepo.findByName(department.getDepName());
            if (exsistingDepartment != null) {
                throw new RuntimeException(
                        "Department '" + department.getDepName() + "' already exists."
                );
        }
        Department newDepartment=new Department();
        newDepartment.setName(department.getDepName());
            departmentRepo.save(newDepartment);
        return newDepartment;
    }

    public DepartmentDtoDetails editDepartmentById (int id,DepartmentDtoDetails departmentDtoDetails){
        Department updatedDepartment=departmentRepo.findById(id).orElseThrow(() -> new RuntimeException("Department not found with id " + id));
        updatedDepartment.setName(departmentDtoDetails.getDepName());
        departmentRepo.save(updatedDepartment);

        //covert to DTO
        return departmentDtoDetails;
    }
    public DepartmentWithEmployeesNameDto getDepartmentWiseEmployeeNames(int deptId){
        Department department = departmentRepo.findById(deptId)
                .orElseThrow(() -> new RuntimeException("Department not found with id " + deptId));

        DepartmentWithEmployeesNameDto dto = new DepartmentWithEmployeesNameDto();
        dto.setDepartmentName(department.getName());

        List<EmployeeDetailsDto> employeeDetailsDtoList=new ArrayList<>();
        for(Employee emp : department.getEmployeeList()){
            EmployeeDetailsDto empDto = new EmployeeDetailsDto();
            empDto.setEmpName(emp.getName());
            empDto.setEmpSalary(emp.getSalary());
            empDto.setDepName(department.getName()); // or emp.getDepartment().getName()
            employeeDetailsDtoList.add(empDto);
        }
        dto.setEmployeeDetailsDtoList(employeeDetailsDtoList);
        return dto;
    }
    public String deleteDepartmentById (int id){
        Department department=departmentRepo.findById(id).orElseThrow(() -> new RuntimeException("Department not found with id " + id));
        departmentRepo.deleteById(id);
        return "Successfully deleted";
    }
    public List<GetDepartmentDetailsDto>getAllDepartments(){
        List<Department> departments=departmentRepo.findAll();
        List<GetDepartmentDetailsDto> getDepartmentDetailsDtosList=new ArrayList<>();
        for(Department dep:departments){
            GetDepartmentDetailsDto getDepartmentDetailsDto=new GetDepartmentDetailsDto();
            getDepartmentDetailsDto.setDepName(dep.getName());
            getDepartmentDetailsDto.setDepID(dep.getDepartmentId());
            getDepartmentDetailsDtosList.add(getDepartmentDetailsDto);
        }
        return getDepartmentDetailsDtosList;
    }
}
