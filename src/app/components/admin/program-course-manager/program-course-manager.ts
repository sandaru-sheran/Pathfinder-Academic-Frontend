import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Program {
  id: number;
  name: string;
  code: string; // e.g., "BIT"
}

export interface Course {
  id: number;
  name: string;
  code: string; // e.g., "IT101"
  programId: number;
}

@Component({
  selector: 'app-program-course-manager',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './program-course-manager.html',
  styleUrls: ['./program-course-manager.css']
})
export class ProgramCourseManagerComponent {

  // Dummy data
  programs: Program[] = [
    { id: 1, name: 'Bachelor of Information Technology', code: 'BIT' },
    { id: 2, name: 'Bachelor of Science in Engineering', code: 'BSE' }
  ];

  courses: Course[] = [
    { id: 1, name: 'Java Programming', code: 'IT101', programId: 1 },
    { id: 2, name: 'Database Management Systems', code: 'IT102', programId: 1 }
  ];

  // Form states
  newProgram = { name: '', code: '' };
  newCourse = { name: '', code: '', programId: null };

  addProgram() {
    if (this.newProgram.name && this.newProgram.code) {
      const newId = this.programs.length + 1;
      this.programs.push({ id: newId, ...this.newProgram });
      console.log('Sending new Program to Spring Boot:', this.newProgram);
      this.newProgram = { name: '', code: '' }; // reset form
    }
  }

  addCourse() {
    if (this.newCourse.name && this.newCourse.code && this.newCourse.programId) {
      const newId = this.courses.length + 1;
      // Convert programId string from select input to a number
      const programIdNum = Number(this.newCourse.programId);
      this.courses.push({ id: newId, name: this.newCourse.name, code: this.newCourse.code, programId: programIdNum });
      console.log('Sending new Course to Spring Boot:', this.newCourse);
      this.newCourse = { name: '', code: '', programId: null }; // reset form
    }
  }

  getProgramName(programId: number): string {
    const program = this.programs.find(p => p.id === programId);
    return program ? program.name : 'Unknown Program';
  }
}
