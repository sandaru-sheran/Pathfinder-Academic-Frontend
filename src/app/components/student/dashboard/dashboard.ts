import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface EnrolledCourse {
  id: number;
  code: string;
  name: string;
  instructor: string;
}

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {

  studentName: string = 'Sandaru Sheran';
  program: string = 'Bachelor of Information Technology (BIT)';

  activeCourses: EnrolledCourse[] = [
    { id: 1, code: 'IT201', name: 'Advanced Frameworks (Spring Boot)', instructor: 'Dr. Niroth Samarawickrama' },
    { id: 2, code: 'IT205', name: 'Frontend Web Development (Angular)', instructor: 'Sharada Sir' }
  ];

  ngOnInit(): void {
    // Later, you can extract the student's name from the JWT token here!
  }
}
