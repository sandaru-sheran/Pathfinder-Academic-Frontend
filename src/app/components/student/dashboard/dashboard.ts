import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Added OnPush strategy
})
export class DashboardComponent implements OnInit {

  studentName: string = '';
  program: string = 'Bachelor of Information Technology (BIT)';

  // Local interface for display
  activeCourses: Array<{ id: number; code: string; name: string; instructor: string }> = [];

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.studentName = this.authService.getUserName() || 'Student';
    this.loadCourses();
  }

  loadCourses(): void {
    this.authService.getStudentMyCourses()
      .subscribe({
        next: (data) => {
          this.activeCourses = data.map(course => ({
            id: course.courseId,
            code: course.courseCode,
            name: course.courseName,
            instructor: course.lecturerName
          }));
          this.cdr.markForCheck(); // Manually trigger change detection
        },
        error: (err) => {
          console.error('Failed to load courses', err);
          // Fallback to dummy data
          this.activeCourses = [
            { id: 1, code: 'IT201', name: 'Advanced Frameworks (Spring Boot)', instructor: 'Dr. Niroth Samarawickrama' },
            { id: 2, code: 'IT205', name: 'Frontend Web Development (Angular)', instructor: 'Sharada Sir' }
          ];
          this.cdr.markForCheck(); // Manually trigger change detection for dummy data
        }
      });
  }
}
