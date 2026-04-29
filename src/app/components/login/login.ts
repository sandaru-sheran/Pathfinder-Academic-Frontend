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
      next: (response:any) => {
        // response is the token string directly (not an object)
        localStorage.setItem('jwt_token', response);

        const role = this.authService.getUserRole();

          if (role === 'LECTURER') {
            this.router.navigate(['/lecturer-dashboard']);
          } else if (role === 'STUDENT') {
            this.router.navigate(['/dashboard']);
          } else if (role === 'ADMIN') {
            this.router.navigate(['/admin']);
          } else {
            this.router.navigate(['/login']);
          }
      },
      error: (err) => {
        console.error('Login failed', err);
        this.errorMessage = 'Invalid email or password';
      }
    });
  }
}
// Added this comment to force re-evaluation of the file.
