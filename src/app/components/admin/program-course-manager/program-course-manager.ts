import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth';
import { ProgramDTO } from '../../../models/program';
import { CourseDTO } from '../../../models/course';

@Component({
  selector: 'app-program-course-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './program-course-manager.html',
  styleUrls: ['./program-course-manager.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Added OnPush strategy
})
export class ProgramCourseManagerComponent implements OnInit {

  programs: ProgramDTO[] = [];
  courses: CourseDTO[] = [];

  // Form states
  newProgram = { title: '', code: '' };
  newCourse = { name: '', code: '', credits: 0, programId: null };

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef // Injected ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // Load programs
    this.authService.getAllPrograms()
      .subscribe({
        next: (data) => {
          this.programs = data;
          this.cdr.markForCheck(); // Manually trigger change detection
        },
        error: (err) => {
          console.error('Failed to load programs', err);
          // Fallback to dummy data
          this.programs = [
            { id: 1, title: 'Bachelor of Information Technology', code: 'BIT' },
            { id: 2, title: 'Bachelor of Science in Engineering', code: 'BSE' }
          ];
          this.cdr.markForCheck(); // Manually trigger change detection for dummy data
        }
      });

    // Load courses
    this.authService.getAllCourses()
      .subscribe({
        next: (data) => {
          this.courses = data;
          this.cdr.markForCheck(); // Manually trigger change detection
        },
        error: (err) => {
          console.error('Failed to load courses', err);
          // Fallback to dummy data
          this.courses = [
            { id: 1, name: 'Java Programming', code: 'IT101', credits: 3, programId: 1 },
            { id: 2, name: 'Database Management Systems', code: 'IT102', credits: 3, programId: 1 }
          ];
          this.cdr.markForCheck(); // Manually trigger change detection for dummy data
        }
      });
  }

  addProgram() {
    if (this.newProgram.title && this.newProgram.code) {
      const programDto: ProgramDTO = {
        title: this.newProgram.title,
        code: this.newProgram.code
      };

      this.authService.addProgram(programDto)
        .subscribe({
          next: (response) => {
            console.log('Program created:', response);
            this.programs.push(response);
            alert('Program added successfully!');
            this.newProgram = { title: '', code: '' };
            this.cdr.markForCheck(); // Manually trigger change detection
          },
          error: (err) => {
            console.error('Failed to create program', err);
            alert('Failed to create program');
            this.cdr.markForCheck(); // Manually trigger change detection for error state
          }
        });
    }
  }

  addCourse() {
    if (this.newCourse.name && this.newCourse.code && this.newCourse.programId && this.newCourse.credits > 0) {
      const courseDto: CourseDTO = {
        name: this.newCourse.name,
        code: this.newCourse.code,
        credits: this.newCourse.credits,
        programId: Number(this.newCourse.programId)
      };

      this.authService.createCourse(courseDto)
        .subscribe({
          next: (response) => {
            console.log('Course created:', response);
            this.courses.push(response);
            alert('Course added successfully!');
            this.newCourse = { name: '', code: '', credits: 0, programId: null };
            this.cdr.markForCheck(); // Manually trigger change detection
          },
          error: (err) => {
            console.error('Failed to create course', err);
            alert('Failed to create course');
            this.cdr.markForCheck(); // Manually trigger change detection for error state
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
}
