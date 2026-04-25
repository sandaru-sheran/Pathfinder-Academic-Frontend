import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

export interface StudentResult {
  enrollmentId: number;
  regNumber: string;
  name: string;
  grade: string;
}

@Component({
  selector: 'app-class-roster',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './class-roster.html',
  styleUrls: ['./class-roster.css']
})
export class ClassRosterComponent implements OnInit {

  courseId: string | null = '';
  courseName: string = 'Loading...';

  // Dummy students for this class
  students: StudentResult[] = [
    { enrollmentId: 101, regNumber: 'IT241001', name: 'Alice Johnson', grade: 'A' },
    { enrollmentId: 102, regNumber: 'IT241002', name: 'Bob Smith', grade: 'B+' },
    { enrollmentId: 103, regNumber: 'IT241003', name: 'Charlie Brown', grade: '' } // Empty grade
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    // Grab the course ID from the URL (e.g., /lecturer/roster/3)
    this.courseId = this.route.snapshot.paramMap.get('courseId');

    // In a real app, we would fetch the specific course name and student list from Spring Boot here
    this.courseName = "Advanced Frameworks (Spring Boot)";
  }

  saveGrade(student: StudentResult) {
    console.log(`Sending Grade to Spring Boot: Enrollment ${student.enrollmentId} gets ${student.grade}`);
    alert(`Grade '${student.grade}' saved for ${student.name}!`);
  }
}
