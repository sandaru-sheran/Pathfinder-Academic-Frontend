import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

// Defining the shape of our User data to match your Spring Boot entity
export interface UserDTO {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  registrationNumber: string;
  role: string;
  isEnabled: boolean;
}

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './user-management.html',
  styleUrls: ['./user-management.css']
})
export class UserManagementComponent {

  // Dummy data to scaffold the UI. We will replace this with an HTTP call later.
  users: UserDTO[] = [
    { id: 1, firstName: 'Sandaru', lastName: 'Sheran', email: 'sandaru@test.com', registrationNumber: 'ADMIN-01', role: 'ADMIN', isEnabled: true },
    { id: 2, firstName: 'Alice', lastName: 'Johnson', email: 'alice@test.com', registrationNumber: 'IT241001', role: 'STUDENT', isEnabled: true },
    { id: 3, firstName: 'Bob', lastName: 'Smith', email: 'bob@test.com', registrationNumber: 'IT241002', role: 'STUDENT', isEnabled: false },
    { id: 4, firstName: 'Dr. Niroth', lastName: 'Samarawickrama', email: 'niroth@test.com', registrationNumber: 'LEC-99', role: 'LECTURER', isEnabled: true }
  ];

  // The logic to toggle the boolean
  toggleUserStatus(user: UserDTO): void {
    user.isEnabled = !user.isEnabled;
    console.log(`Sending to Spring Boot: User ${user.id} status changed to ${user.isEnabled}`);
    // In the future, we will call an AdminService here to update the DB
  }
}
