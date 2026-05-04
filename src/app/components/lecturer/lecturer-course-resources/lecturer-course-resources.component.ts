import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth';
import { LecturerCoursesDTO } from '../../../models/lecturer-courses';
import { AddResourceComponent } from '../../shared/add-resource/add-resource.component';
import { CourseResourceDTO } from '../../../models/course-resource';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-lecturer-course-resources',
  standalone: true,
  imports: [CommonModule, AddResourceComponent, RouterLink],
  templateUrl: './lecturer-course-resources.component.html',
  styleUrls: ['./lecturer-course-resources.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LecturerCourseResourcesComponent implements OnInit {

  myCourses: Array<{ id: number; code: string; name: string; semester: string; studentCount: number }> = [];
  showResourceFormForCourseId: number | null = null;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
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
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Failed to load lecturer courses', err);
          this.cdr.markForCheck();
        }
      });
  }

  showAddResourceForm(courseId: number): void {
    this.showResourceFormForCourseId = this.showResourceFormForCourseId === courseId ? null : courseId;
    this.cdr.markForCheck();
  }

  hideAddResourceForm(): void {
    this.showResourceFormForCourseId = null;
    this.cdr.markForCheck();
  }

  onResourceAdded(resource: CourseResourceDTO): void {
    if (this.showResourceFormForCourseId) {
      // The resource object already contains courseId from AddResourceComponent
      this.authService.addLecturerResource(resource).subscribe({ // Removed courseId from method call
        next: (response) => {
          console.log('Resource added successfully:', response);
          alert('Resource added successfully!');
          this.hideAddResourceForm();
        },
        error: (err) => {
          console.error('Failed to add resource', err);
          alert('Failed to add resource');
          this.cdr.markForCheck();
        }
      });
    }
  }
}
