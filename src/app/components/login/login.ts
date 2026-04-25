import { Component, Inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { LoginRequest } from '../../models/login-request';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class LoginComponent {

  loginData: LoginRequest = {
    email: '',
    password: ''
  };
  
  errorMessage: string = '';

  constructor(@Inject(AuthService) private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.loginData).subscribe({
      next: (response: string) => {
        console.log('Login successful! Token saved.');
        // Redirect the user to their dashboard after logging in
        this.router.navigate(['/dashboard']); 
      },
      error: (err: any) => {
        console.error('Login failed', err);
        this.errorMessage = 'Invalid email or password. Please try again.';
      }
    });
  }
}