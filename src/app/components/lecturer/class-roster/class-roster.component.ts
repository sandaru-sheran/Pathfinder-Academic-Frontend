import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { RosterDTO } from '../../../models/roster';
import { AssignGradeDTO } from '../../../models/assign-grade';

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

  // Local interface for display
  students: Array<{ enrollmentId: number; regNumber: string; name: string; grade: string }> = [];

  constructor(private route: ActivatedRoute, private authService: AuthService) {}

  ngOnInit(): void {
    // Grab the course ID from the URL (e.g., /lecturer/roster/3)
    this.courseId = this.route.snapshot.paramMap.get('courseId');

    if (this.courseId) {
      this.loadRoster();
    }
  }

  loadRoster(): void {
    const courseIdNum = parseInt(this.courseId || '0');
    if (courseIdNum > 0) {
      this.authService.getCourseRoster(courseIdNum)
        .subscribe({
          next: (data) => {
            this.students = data.map(student => ({
              enrollmentId: student.enrolmentId,
              regNumber: student.registerNumber,
              name: student.name,
              grade: student.grade
            }));
          },
          error: (err) => {
            console.error('Failed to load roster', err);
            // Fallback to dummy data
            this.students = [
              { enrollmentId: 101, regNumber: 'IT241001', name: 'Alice Johnson', grade: 'A' },
              { enrollmentId: 102, regNumber: 'IT241002', name: 'Bob Smith', grade: 'B+' },
              { enrollmentId: 103, regNumber: 'IT241003', name: 'Charlie Brown', grade: '' }
            ];
          }
        });
    }
  }

  saveGrade(student: any) {
    const gradeData: AssignGradeDTO = {
      grade: student.grade
    };

    this.authService.assignGrade(student.enrollmentId, gradeData)
      .subscribe({
        next: (response) => {
          console.log('Grade saved successfully:', response);
          alert(`Grade '${student.grade}' saved for ${student.name}!`);
        },
        error: (err) => {
          console.error('Failed to save grade', err);
          alert('Failed to save grade');
        }
      });
  }
}
