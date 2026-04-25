import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

export interface AssignedCourse {
  id: number; // The Allocation ID or Course ID
  code: string;
  name: string;
  semester: string;
  studentCount: number;
}

@Component({
  selector: 'app-lecturer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lecturer-dashboard.html',
  styleUrls: ['./lecturer-dashboard.css']
})
export class LecturerDashboardComponent {

  // Dummy data representing the courses assigned to the logged-in lecturer
  myCourses: AssignedCourse[] = [
    { id: 1, code: 'IT101', name: 'Java Programming', semester: '2026-S1', studentCount: 45 },
    { id: 3, code: 'IT201', name: 'Advanced Frameworks (Spring Boot)', semester: '2026-S1', studentCount: 38 }
  ];

}
