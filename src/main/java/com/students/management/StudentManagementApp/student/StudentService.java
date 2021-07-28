package com.students.management.StudentManagementApp.student;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudent() {
        return studentRepository.findAll();
    }

    public Student addStudent(Student student) {
      return studentRepository.save(student);
    }

    public Student editStudent(Student student) {
        Student savedStudent = studentRepository.findById(student.getId())
                    .orElseThrow(() -> new RuntimeException(
                            String.format("Cannot Find Expense by ID %s", student.getId())));

        savedStudent.setName((student.getName()));
        savedStudent.setEmail((student.getEmail()));
        savedStudent.setGender((student.getGender()));

            return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }
}
