package com.students.management.StudentManagementApp.student;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpStatusCodeException;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping(path = "api/students")
@AllArgsConstructor
public class StudentController {

    private final StudentService studentService;

    @GetMapping
    public ResponseEntity<List<Student>> getAllStudents(){
        return ResponseEntity.ok(studentService.getAllStudent());
    }

    @PostMapping
    public ResponseEntity<Student> addStudent(@RequestBody Student student){
        studentService.addStudent(student);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

}
