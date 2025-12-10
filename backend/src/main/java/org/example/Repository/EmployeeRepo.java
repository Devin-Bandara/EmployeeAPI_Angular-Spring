package org.example.Repository;

import org.example.DTO.EmployeeDetailsDto;
import org.example.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface EmployeeRepo extends JpaRepository<Employee,Integer> {
    @Query("SELECT e FROM Employee e JOIN e.department d WHERE " +
            "(:name IS NULL OR e.name LIKE %:name%) AND " +
            "(:department IS NULL OR d.name LIKE %:department%) AND " +
            "(:salary IS NULL OR e.salary = :salary)")
    List<Employee> searchEmployees(@Param("name") String name,
                                             @Param("department") String department,
                                             @Param("salary") Double salary);

}
