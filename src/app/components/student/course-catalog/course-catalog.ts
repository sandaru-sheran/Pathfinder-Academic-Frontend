import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CatalogCourse {
  id: number;
  code: string;
  name: string;
  program: string;
  isEnrolled: boolean;
}

@Component({
  selector: 'app-course-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-catalog.html',
  styleUrls: ['./course-catalog.css']
})
export class CourseCatalogComponent {

  availableCourses: CatalogCourse[] = [
    { id: 1, code: 'IT101', name: 'Java Programming Fundamentals', program: 'BIT', isEnrolled: false },
    { id: 2, code: 'IT102', name: 'Database Management Systems (SQL)', program: 'BIT', isEnrolled: false },
    { id: 3, code: 'IT201', name: 'Advanced Frameworks (Spring Boot)', program: 'BIT', isEnrolled: true }, // Already enrolled
    { id: 4, code: 'CS301', name: 'Data Structures in C#', program: 'Computer Science', isEnrolled: false }
  ];

  enroll(course: CatalogCourse) {
    console.log(`Sending to Spring Boot: Student enrolling in Course ID ${course.id}`);
    course.isEnrolled = true;
    alert(`Successfully enrolled in ${course.name}!`);
  }
}
