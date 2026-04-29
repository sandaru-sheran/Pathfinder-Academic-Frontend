import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth';
import { StudentAllCourseDTO } from '../../../models/student-all-course';

@Component({
  selector: 'app-course-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course-catalog.html',
  styleUrls: ['./course-catalog.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Added OnPush strategy
})
export class CourseCatalogComponent implements OnInit {

  // Local interface for display
  availableCourses: Array<{ id: number; code: string; name: string; program: string; isEnrolled: boolean }> = [];

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef // Injected ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCatalog();
  }

  loadCatalog(): void {
    this.authService.getCourseCatalog()
      .subscribe({
        next: (data) => {
          this.availableCourses = data.map(course => ({
            id: course.id,
            code: course.courseCode,
            name: course.courseName,
            program: course.programTitle,
            isEnrolled: course.isEnrolled
          }));
          this.cdr.markForCheck(); // Manually trigger change detection
        },
        error: (err) => {
          console.error('Failed to load catalog', err);
          // Fallback to dummy data
          this.availableCourses = [
            { id: 1, code: 'IT101', name: 'Java Programming Fundamentals', program: 'BIT', isEnrolled: false },
            { id: 2, code: 'IT102', name: 'Database Management Systems (SQL)', program: 'BIT', isEnrolled: false },
            { id: 3, code: 'IT201', name: 'Advanced Frameworks (Spring Boot)', program: 'BIT', isEnrolled: true },
            { id: 4, code: 'CS301', name: 'Data Structures in C#', program: 'Computer Science', isEnrolled: false }
          ];
          this.cdr.markForCheck(); // Manually trigger change detection for dummy data
        }
      });
  }

  enroll(course: any) {
    // Using 2026-S1 as default semester - you can make this dynamic
    this.authService.enrollInCourse(course.id, '2026-S1')
      .subscribe({
        next: (response) => {
          console.log('Enrollment successful:', response);
          course.isEnrolled = true;
          this.cdr.markForCheck(); // Manually trigger change detection after enrollment
          alert(`Successfully enrolled in ${course.name}!`);
        },
        error: (err) => {
          console.error('Enrollment failed', err);
          alert('Failed to enroll in course');
          this.cdr.markForCheck(); // Manually trigger change detection for error state
        }
      });
  }
}
