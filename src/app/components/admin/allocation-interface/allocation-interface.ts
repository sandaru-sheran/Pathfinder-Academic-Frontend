import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Lecturer {
  id: number;
  name: string;
}

export interface Course {
  id: number;
  code: string;
  name: string;
}

export interface Allocation {
  id: number;
  lecturerId: number;
  courseId: number;
  semester: string;
}

@Component({
  selector: 'app-allocation-interface',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './allocation-interface.html',
  styleUrls: ['./allocation-interface.css']
})
export class AllocationInterfaceComponent {

  // Dummy data
  lecturers: Lecturer[] = [
    { id: 4, name: 'Dr. Niroth Samarawickrama' },
    { id: 5, name: 'Sharada Sir' }
  ];

  courses: Course[] = [
    { id: 1, code: 'IT101', name: 'Java Programming' },
    { id: 2, code: 'IT102', name: 'Database Management Systems' },
    { id: 3, code: 'IT201', name: 'Advanced Frameworks (Spring Boot)' }
  ];

  allocations: Allocation[] = [
    { id: 1, lecturerId: 4, courseId: 3, semester: '2026-S1' }
  ];

  // Form state
  newAllocation = { lecturerId: null, courseId: null, semester: '' };

  allocate() {
    if (this.newAllocation.lecturerId && this.newAllocation.courseId && this.newAllocation.semester) {
      const newId = this.allocations.length + 1;

      this.allocations.push({
        id: newId,
        lecturerId: Number(this.newAllocation.lecturerId),
        courseId: Number(this.newAllocation.courseId),
        semester: this.newAllocation.semester
      });

      console.log('Sending Allocation to Spring Boot:', this.newAllocation);

      // Reset form
      this.newAllocation = { lecturerId: null, courseId: null, semester: '' };
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
