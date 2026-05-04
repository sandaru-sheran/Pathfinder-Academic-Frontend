import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { RegisterComponent } from './components/register/register';
import { roleGuard } from './guards/role-guard';

// Student Components
import { DashboardComponent } from './components/student/dashboard/dashboard';
import { CourseCatalogComponent } from './components/student/course-catalog/course-catalog';
import { TranscriptComponent } from './components/student/transcript/transcript';
import { StudentClassroomComponent } from './components/student/classroom/student-classroom.component';

// Lecturer Components
import { LecturerDashboardComponent } from './components/lecturer/lecturer-dashboard/lecturer-dashboard';
import { ClassRosterComponent } from './components/lecturer/class-roster/class-roster';
import { LecturerCourseResourcesComponent } from './components/lecturer/lecturer-course-resources/lecturer-course-resources.component'; // Import new component

// Admin Components
import { AdminDashboardComponent } from './components/admin/admin-dashboard/admin-dashboard';
import { UserManagementComponent } from './components/admin/user-management/user-management';
import { ProgramCourseManagerComponent } from './components/admin/program-course-manager/program-course-manager';
import { AllocationInterfaceComponent } from './components/admin/allocation-interface/allocation-interface';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // ==========================================
  // 🛡️ ADMIN ROUTES
  // ==========================================
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMIN' }
  },
  {
    path: 'admin/users',
    component: UserManagementComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMIN' }
  },
  {
    path: 'admin/programs',
    component: ProgramCourseManagerComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMIN' }
  },
  {
    path: 'admin/allocations',
    component: AllocationInterfaceComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'ADMIN' }
  },

  // ==========================================
  // 👨‍🏫 LECTURER ROUTES
  // ==========================================
  {
    path: 'lecturer-dashboard',
    component: LecturerDashboardComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'LECTURER' }
  },
  {
    path: 'lecturer/roster/:courseId',
    component: ClassRosterComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'LECTURER' }
  },
  {
    path: 'lecturer/resources', // New route for lecturer resources
    component: LecturerCourseResourcesComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'LECTURER' }
  },

  // ==========================================
  // 🎓 STUDENT ROUTES
  // ==========================================
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'STUDENT' }
  },
  {
    path: 'student/catalog',
    component: CourseCatalogComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'STUDENT' }
  },
  {
    path: 'student/transcript',
    component: TranscriptComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'STUDENT' }
  },
  {
    path: 'student/classroom/:courseId',
    component: StudentClassroomComponent,
    canActivate: [roleGuard],
    data: { expectedRole: 'STUDENT' }
  },

  // Catch-all fallback
  { path: '**', redirectTo: 'login' }
];
