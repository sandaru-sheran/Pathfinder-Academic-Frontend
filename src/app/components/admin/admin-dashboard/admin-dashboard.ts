import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Added OnPush strategy
})
export class AdminDashboardComponent implements OnInit {

  adminName: string = '';
  stats = {
    totalUsers: 0,
    activePrograms: 0,
    totalCourses: 0
  };

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef // Injected ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.adminName = this.authService.getUserName() || 'Admin';
    this.loadStats();
  }

  loadStats(): void {
    // Load total users
    this.authService.getAllUsers()
      .subscribe({
        next: (data) => {
          this.stats.totalUsers = data.length;
          this.cdr.markForCheck(); // Manually trigger change detection
        },
        error: (err) => {
          console.error('Failed to load users count', err);
          this.stats.totalUsers = 0;
          this.cdr.markForCheck(); // Manually trigger change detection
        }
      });

    // Load total programs
    this.authService.getAllPrograms()
      .subscribe({
        next: (data) => {
          this.stats.activePrograms = data.length;
          this.cdr.markForCheck(); // Manually trigger change detection
        },
        error: (err) => {
          console.error('Failed to load programs count', err);
          this.stats.activePrograms = 0;
          this.cdr.markForCheck(); // Manually trigger change detection
        }
      });

    // Load total courses
    this.authService.getAllCourses()
      .subscribe({
        next: (data) => {
          this.stats.totalCourses = data.length;
          this.cdr.markForCheck(); // Manually trigger change detection
        },
        error: (err) => {
          console.error('Failed to load courses count', err);
          this.stats.totalCourses = 0;
          this.cdr.markForCheck(); // Manually trigger change detection
        }
      });
  }

}
