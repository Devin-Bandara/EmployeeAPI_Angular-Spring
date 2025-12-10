package org.example.Repository;

import org.example.Entity.Department;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DepartmentRepo extends JpaRepository<Department,Integer> {
    Department findByName(String name);
}
