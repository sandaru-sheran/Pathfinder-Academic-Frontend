import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CourseResourceDTO } from '../../../models/course-resource';

@Component({
  selector: 'app-add-resource',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.css']
})
export class AddResourceComponent {
  @Input() courseId: number | null = null;
  @Output() resourceAdded = new EventEmitter<CourseResourceDTO>();
  @Output() cancel = new EventEmitter<void>();

  newResource: CourseResourceDTO = {
    courseId: 0, // Initialize with a default or handle as optional
    title: '',
    videoId: ''
  };

  constructor() { }

  onSubmit(): void {
    if (this.newResource.videoId && this.courseId !== null) {
      // Assign the courseId from the input to the newResource object
      this.newResource.courseId = this.courseId;
      this.resourceAdded.emit(this.newResource);
      // Reset form
      this.newResource = { courseId: 0, title: '', videoId: '' };
    } else {
      alert('Video ID cannot be empty and Course ID must be provided.');
    }
  }

  onCancel(): void {
    this.cancel.emit();
    this.newResource = { courseId: 0, title: '', videoId: '' }; // Reset form on cancel
  }
}
