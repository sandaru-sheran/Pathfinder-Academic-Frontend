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

  studentName: string = 'Sandaru Sheran';
  program: string = 'Bachelor of Information Technology (BIT)';

  // Local interface for display
  activeCourses: Array<{ code: string; name: string; instructor: string }> = [];

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef // Injected ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.authService.getStudentMyCourses()
      .subscribe({
        next: (data) => {
          this.activeCourses = data.map(course => ({
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
            { code: 'IT201', name: 'Advanced Frameworks (Spring Boot)', instructor: 'Dr. Niroth Samarawickrama' },
            { code: 'IT205', name: 'Frontend Web Development (Angular)', instructor: 'Sharada Sir' }
          ];
          this.cdr.markForCheck(); // Manually trigger change detection for dummy data
        }
      });
  }
}
