package com.students.management.StudentManagementApp.student;

import com.students.management.StudentManagementApp.student.exceptions.BadRequestException;
import com.students.management.StudentManagementApp.student.exceptions.NotFoundException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class StudentService {

    private final StudentRepository studentRepository;

    public List<Student> getAllStudent() {
        return studentRepository.findAll();
    }

    public Student addStudent(Student student) {
        // check if email already exists in the database.
        if (studentRepository.selectExistsEmail(student.getEmail())){
            throw new BadRequestException(
                    String.format("This email: %s is already registered in database.", student.getEmail()));
        }
        return studentRepository.save(student);
    }

    public Student editStudent(Student student) {
        Student savedStudent = studentRepository.findById(student.getId())
                    .orElseThrow(() -> new NotFoundException(
                            String.format("Cannot Find Student by privded ID %s", student.getId())));

        if (studentRepository.selectExistsEmail(student.getEmail()) && !student.getEmail().equals(savedStudent.getEmail()) ){
            throw new BadRequestException(
                    String.format("This email: %s is already registered in database.", student.getEmail()));
        }

        savedStudent.setName((student.getName()));
        savedStudent.setEmail((student.getEmail()));
        savedStudent.setGender((student.getGender()));

            return studentRepository.save(student);
    }

    public void deleteStudent(Long id) {
        studentRepository.findById(id)
                .orElseThrow(() -> new NotFoundException(
                        String.format("Item with id %s that's flagged for removal, could not be found!", id)));
        studentRepository.deleteById(id);
    }
}
