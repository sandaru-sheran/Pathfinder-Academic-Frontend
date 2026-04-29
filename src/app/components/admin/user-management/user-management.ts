import { Component, OnInit, ChangeDetectorRef, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../services/auth';
import { UserDTO } from '../../../models/user';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.css'],
  changeDetection: ChangeDetectionStrategy.OnPush // Added OnPush strategy
})
export class UserManagementComponent implements OnInit {

  users: UserDTO[] = [];

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef // Injected ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getAllUsers()
      .subscribe({
        next: (data) => {
          this.users = data;
          this.cdr.markForCheck(); // Manually trigger change detection
        },
        error: (err) => {
          console.error('Failed to load users', err);
          // Fallback to dummy data
          this.users = [
            { id: 1, firstName: 'Sandaru', lastName: 'Sheran', email: 'sandaru@test.com', registrationNumber: 'ADMIN-01', role: 'ADMIN', isEnabled: true },
            { id: 2, firstName: 'Alice', lastName: 'Johnson', email: 'alice@test.com', registrationNumber: 'IT241001', role: 'STUDENT', isEnabled: true },
            { id: 3, firstName: 'Bob', lastName: 'Smith', email: 'bob@test.com', registrationNumber: 'IT241002', role: 'STUDENT', isEnabled: false },
            { id: 4, firstName: 'Dr. Niroth', lastName: 'Samarawickrama', email: 'niroth@test.com', registrationNumber: 'LEC-99', role: 'LECTURER', isEnabled: true }
          ];
          this.cdr.markForCheck(); // Manually trigger change detection for dummy data
        }
      });
  }

  // The logic to toggle the boolean
  toggleUserStatus(user: UserDTO): void {
    this.authService.toggleUserStatus(user.id)
      .subscribe({
        next: (response) => {
          console.log('User status toggled:', response);
          user.isEnabled = !user.isEnabled;
          this.cdr.markForCheck(); // Manually trigger change detection after status change
        },
        error: (err) => {
          console.error('Failed to toggle user status', err);
          alert('Failed to toggle user status');
          this.cdr.markForCheck(); // Manually trigger change detection for error state
        }
      });
  }
}
