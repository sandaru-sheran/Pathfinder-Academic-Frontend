import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent {
  
  // This is our "scaffolding" data. 
  // Later, we will delete this and fetch the real list from Spring Boot!
  mockGrades = [
    { courseName: 'Java Programming', credits: 4, grade: 'A' },
    { courseName: 'Web Development', credits: 3, grade: 'A-' },
    { courseName: 'Database Systems', credits: 3, grade: 'B+' }
  ];

}