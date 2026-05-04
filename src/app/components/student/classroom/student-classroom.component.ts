import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { AuthService } from '../../../services/auth';
import { CourseResourceDTO } from '../../../models/course-resource';

@Component({
  selector: 'app-student-classroom',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './student-classroom.component.html',
  styleUrls: ['./student-classroom.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StudentClassroomComponent implements OnInit {
  courseId: number | null = null;
  courseName: string = 'Loading Course...';
  resources: CourseResourceDTO[] = [];
  selectedVideoUrl: SafeResourceUrl | null = null;
  selectedVideoTitle: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private sanitizer: DomSanitizer,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('courseId');
      if (id) {
        this.courseId = +id; // Convert string to number
        this.loadCourseDetails(); // Load course name
        this.loadResources();
      }
    });
  }

  loadCourseDetails(): void {
    if (this.courseId) {
      this.authService.getCourseById(this.courseId).subscribe({
        next: (course) => {
          this.courseName = course.name;
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Failed to load course details', err);
          this.courseName = 'Unknown Course';
          this.cdr.markForCheck();
        }
      });
    }
  }

  loadResources(): void {
    if (this.courseId) {
      this.authService.getStudentResources(this.courseId).subscribe({
        next: (data) => {
          this.resources = data;
          if (this.resources.length > 0) {
            this.selectVideo(this.resources[0]); // Select the first video by default
          }
          this.cdr.markForCheck();
        },
        error: (err) => {
          console.error('Failed to load resources', err);
          this.resources = []; // Clear resources on error
          this.cdr.markForCheck();
        }
      });
    }
  }

  getYouTubeThumbnail(videoId: string): string {
    // Assuming videoId can be a full YouTube URL or just the ID
    const idMatch = videoId.match(/(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/);
    const cleanVideoId = idMatch ? idMatch[1] : videoId;
    return `https://img.youtube.com/vi/${cleanVideoId}/mqdefault.jpg`;
  }

  getYouTubeEmbedUrl(videoId: string): SafeResourceUrl {
    const idMatch = videoId.match(/(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtube\.com|youtu\.be)\/(?:watch\?v=|embed\/|v\/|)([\w-]{11})(?:\S+)?/);
    const cleanVideoId = idMatch ? idMatch[1] : videoId;
    return this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${cleanVideoId}`);
  }

  selectVideo(resource: CourseResourceDTO): void {
    this.selectedVideoUrl = this.getYouTubeEmbedUrl(resource.videoId);
    this.selectedVideoTitle = resource.title || 'Untitled Video';
    this.cdr.markForCheck();
  }
}
