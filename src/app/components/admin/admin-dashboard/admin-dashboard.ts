import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterLink], // RouterLink is crucial here!
  templateUrl: './admin-dashboard.html',
  styleUrls: ['./admin-dashboard.css']
})
export class AdminDashboardComponent {

  // Dummy statistics to make the dashboard look active
  // We will fetch these real numbers from Spring Boot later
  stats = {
    totalUsers: 142,
    activePrograms: 4,
    totalCourses: 28
  };

}
