import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface GradeResult {
  courseCode: string;
  courseName: string;
  semester: string;
  grade: string;
}

@Component({
  selector: 'app-transcript',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transcript.html',
  styleUrls: ['./transcript.css']
})
export class TranscriptComponent {

  results: GradeResult[] = [
    { courseCode: 'IT101', courseName: 'Java Programming Fundamentals', semester: '2025-S2', grade: 'A' },
    { courseCode: 'IT102', courseName: 'Database Management Systems (SQL)', semester: '2025-S2', grade: 'A-' }
  ];

}
