import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { AllocationDTO } from '../../../models/allocation';
import { CourseDTO } from '../../../models/course';

// Local interface for lecturer display
interface Lecturer {
  id: number;
  name: string;
}

@Component({
  selector: 'app-allocation-interface',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './allocation-interface.html',
  styleUrls: ['./allocation-interface.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Added OnPush strategy
})
export class AllocationInterfaceComponent implements OnInit {

  lecturers: Lecturer[] = [];
  courses: CourseDTO[] = [];
  allocations: AllocationDTO[] = [];

  // Form state
  newAllocation = { lectureId: null, courseId: null, semester: '' };

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef // Injected ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Load lecturers (from users with role LECTURER)
    this.authService.getAllUsers()
      .subscribe({
        next: (users) => {
          this.lecturers = users
            .filter(u => u.role === 'LECTURER')
            .map(u => ({
              id: u.id,
              name: `${u.firstName} ${u.lastName}`
            }));
          this.cdr.markForCheck(); // Manually trigger change detection
        },
        error: (err) => {
          console.error('Failed to load lecturers', err);
          this.lecturers = [
            { id: 4, name: 'Dr. Niroth Samarawickrama' },
            { id: 5, name: 'Sharada Sir' }
          ];
          this.cdr.markForCheck(); // Manually trigger change detection for dummy data
        }
      });

    // Load courses
    this.authService.getAllCourses()
      .subscribe({
        next: (courses) => {
          this.courses = courses;
          this.cdr.markForCheck(); // Manually trigger change detection
        },
        error: (err) => {
          console.error('Failed to load courses', err);
          this.courses = [
            { id: 1, code: 'IT101', name: 'Java Programming', credits: 3, programId: 1 },
            { id: 2, code: 'IT102', name: 'Database Management Systems', credits: 3, programId: 1 },
            { id: 3, code: 'IT201', name: 'Advanced Frameworks (Spring Boot)', credits: 3, programId: 1 }
          ];
          this.cdr.markForCheck(); // Manually trigger change detection for dummy data
        }
      });
  }

  allocate() {
    if (this.newAllocation.lectureId && this.newAllocation.courseId && this.newAllocation.semester) {
      const newAlloc: AllocationDTO = {
        lectureId: Number(this.newAllocation.lectureId),
        courseId: Number(this.newAllocation.courseId),
        semester: this.newAllocation.semester
      };

      this.authService.lectureAllocation(newAlloc)
        .subscribe({
          next: (response) => {
            console.log('Allocation created:', response);
            this.allocations.push(response);
            alert('Lecturer allocation created successfully!');
            // Reset form
            this.newAllocation = { lectureId: null, courseId: null, semester: '' };
            this.cdr.markForCheck(); // Manually trigger change detection
          },
          error: (err) => {
            console.error('Failed to create allocation', err);
            alert('Failed to create allocation');
            this.cdr.markForCheck(); // Manually trigger change detection for error state
          }
        });
    } else {
      alert('Please fill out all fields.');
    }
  }

  getLecturerName(id: number): string {
    const lec = this.lecturers.find(l => l.id === id);
    return lec ? lec.name : 'Unknown';
  }

  getCourseDetails(id: number): string {
    const course = this.courses.find(c => c.id === id);
    return course ? `${course.code} - ${course.name}` : 'Unknown Course';
  }
}
