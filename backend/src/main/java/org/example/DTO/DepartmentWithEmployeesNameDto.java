package org.example.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
@Data
@AllArgsConstructor
@NoArgsConstructor
public class DepartmentWithEmployeesNameDto {
    private String DepartmentName;

    public String getDepartmentName() {
        return DepartmentName;
    }

    public void setDepartmentName(String departmentName) {
        DepartmentName = departmentName;
    }

    public List<EmployeeDetailsDto> getEmployeeDetailsDtoList() {
        return employeeDetailsDtoList;
    }

    public void setEmployeeDetailsDtoList(List<EmployeeDetailsDto> employeeDetailsDtoList) {
        this.employeeDetailsDtoList = employeeDetailsDtoList;
    }

    List<EmployeeDetailsDto> employeeDetailsDtoList;
}
