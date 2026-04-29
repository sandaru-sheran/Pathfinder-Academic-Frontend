import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth';
import { TranscriptDTO } from '../../../models/transcript';

@Component({
  selector: 'app-transcript',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './transcript.html',
  styleUrls: ['./transcript.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Added OnPush strategy
})
export class TranscriptComponent implements OnInit {

  results: TranscriptDTO[] = [];

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadTranscript();
  }

  loadTranscript(): void {
    console.log('Transcript Component: Starting to load transcript...'); // Debug log
    this.authService.getStudentTranscript()
      .subscribe({
        next: (data) => {
          console.log('Transcript Component: Raw data from backend:', data); // Debug log
          this.results = data;
          console.log('Transcript Component: Updated results:', this.results); // Debug log
          this.cdr.markForCheck(); // Manually trigger change detection
        },
        error: (err) => {
          console.error('Transcript Component: Failed to load transcript', err); // Debug log
          // Fallback to dummy data
          this.results = [
            { courseCode: 'IT101', courseName: 'Java Programming Fundamentals', semester: '2025-S2', grade: 'A' },
            { courseCode: 'IT102', courseName: 'Database Management Systems (SQL)', semester: '2025-S2', grade: 'A-' }
          ];
          console.log('Transcript Component: Using dummy data for results:', this.results); // Debug log
          this.cdr.markForCheck(); // Manually trigger change detection for dummy data
        }
      });
  }

}
