import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';
import { LecturerCoursesDTO } from '../../../models/lecturer-courses';

@Component({
  selector: 'app-lecturer-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './lecturer-dashboard.html',
  styleUrls: ['./lecturer-dashboard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Added OnPush strategy
})
export class LecturerDashboardComponent implements OnInit {

  lecturerName: string = '';

  // Local interface for component display
  myCourses: Array<{ id: number; code: string; name: string; semester: string; studentCount: number }> = [];

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef // Injected ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.lecturerName = this.authService.getUserName() || 'Lecturer';
    this.loadCourses();
  }

  loadCourses(): void {
    this.authService.getLecturerCourses()
      .subscribe({
        next: (data) => {
          this.myCourses = data.map(course => ({
            id: course.courseId,
            code: course.courseCode,
            name: course.courseName,
            semester: course.semester,
            studentCount: course.studentCount
          }));
          this.cdr.markForCheck(); // Manually trigger change detection
        },
        error: (err) => {
          console.error('Failed to load courses', err);
          this.cdr.markForCheck(); // Manually trigger change detection for error state
        }
      });
  }

}
