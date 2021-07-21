package com.students.management.StudentManagementApp.student;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/students")
public class StudentController {

    @GetMapping
    public List<Student> getAllStudents(){
        List<Student> students = Arrays.asList(
                new Student(1L, "Patrycja", "patrycja@gmail.com", Gender.FEMALE),
                new Student(2L, "Adam", "adam@gmail.com", Gender.MALE)
        );
        return students;
    }

}
