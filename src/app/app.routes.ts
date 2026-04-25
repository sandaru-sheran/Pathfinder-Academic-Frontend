import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { roleGuard } from './guards/role-guard';
import { RegisterComponent } from './components/register/register';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  
  { path: 'login', component: LoginComponent },

  { path: 'register', component: RegisterComponent },
  

  { 
    path: 'dashboard', 
    component: DashboardComponent,
    canActivate: [roleGuard], 
    data: { expectedRole: 'STUDENT' } 
  },

  // Example of another route:
  // { 
  //   path: 'lecturer-panel', 
  //   component: LecturerPanelComponent,
  //   canActivate: [roleGuard],
  //   data: { expectedRole: 'ROLE_LECTURER' } 
  // },
  
  { path: '**', redirectTo: 'login' }
];