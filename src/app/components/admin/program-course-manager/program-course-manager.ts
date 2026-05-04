import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { ProgramDTO } from '../../../models/program';
import { CourseDTO } from '../../../models/course';
import { AddResourceComponent } from '../../shared/add-resource/add-resource.component';
import { CourseResourceDTO } from '../../../models/course-resource';

@Component({
  selector: 'app-program-course-manager',
  standalone: true,
  imports: [CommonModule, FormsModule, AddResourceComponent],
  templateUrl: './program-course-manager.html',
  styleUrls: ['./program-course-manager.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProgramCourseManagerComponent implements OnInit {

  programs: ProgramDTO[] = [];
  courses: CourseDTO[] = [];
  showResourceFormForCourseId: number | null = null;

  newProgram = { title: '', code: '' };
  newCourse = { name: '', code: '', credits: 0, programId: null };

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.authService.getAllPrograms().subscribe({
      next: (data) => {
        this.programs = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load programs', err);
        this.programs = [{ id: 1, title: 'Bachelor of Information Technology', code: 'BIT' }, { id: 2, title: 'Bachelor of Science in Engineering', code: 'BSE' }];
        this.cdr.markForCheck();
      }
    });

    this.authService.getAllCourses().subscribe({
      next: (data) => {
        this.courses = data;
        this.cdr.markForCheck();
      },
      error: (err) => {
        console.error('Failed to load courses', err);
        this.courses = [{ id: 1, name: 'Java Programming', code: 'IT101', credits: 3, programId: 1 }, { id: 2, name: 'Database Management Systems', code: 'IT102', credits: 3, programId: 1 }];
        this.cdr.markForCheck();
      }
    });
  }

  addProgram() {
    if (this.newProgram.title && this.newProgram.code) {
      const programDto: ProgramDTO = { title: this.newProgram.title, code: this.newProgram.code };
      this.authService.addProgram(programDto).subscribe({
        next: (response) => {
          this.programs.push(response);
          alert('Program added successfully!');
          this.newProgram = { title: '', code: '' };
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Failed to create program', err);
          alert('Failed to create program');
          this.cdr.markForCheck();
        }
      });
    }
  }

  addCourse() {
    if (this.newCourse.name && this.newCourse.code && this.newCourse.programId && this.newCourse.credits > 0) {
      const courseDto: CourseDTO = { name: this.newCourse.name, code: this.newCourse.code, credits: this.newCourse.credits, programId: Number(this.newCourse.programId) };
      this.authService.createCourse(courseDto).subscribe({
        next: (response) => {
          this.courses.push(response);
          alert('Course added successfully!');
          this.newCourse = { name: '', code: '', credits: 0, programId: null };
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Failed to create course', err);
          alert('Failed to create course');
          this.cdr.markForCheck();
        }
      });
    } else {
      alert('Please fill out all fields with valid data');
    }
  }

  getProgramName(programId: number): string {
    const program = this.programs.find(p => p.id === programId);
    return program ? program.title : 'Unknown Program';
  }

  showAddResourceForm(courseId: number | undefined): void {
    if (courseId !== undefined) {
      this.showResourceFormForCourseId = this.showResourceFormForCourseId === courseId ? null : courseId;
    } else {
      this.showResourceFormForCourseId = null;
    }
    this.cdr.markForCheck();
  }

  hideAddResourceForm(): void {
    this.showResourceFormForCourseId = null;
    this.cdr.markForCheck();
  }

  onResourceAdded(resource: CourseResourceDTO): void {
    if (this.showResourceFormForCourseId) {
      // The resource object already contains courseId from AddResourceComponent
      this.authService.addAdminResource(resource).subscribe({ // Removed courseId from method call
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
