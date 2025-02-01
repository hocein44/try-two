import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  isLoading = false; // Loading state
  errorMessage = ''; // Error message

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.isLoading = true; // Show loading spinner
    this.errorMessage = ''; // Reset error message

    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        // Store token and role in local storage
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        this.authService.setToken(response.token); // Update token in service

        // Redirect based on user role
        if (response.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      error: (error) => {
        this.isLoading = false; // Hide loading spinner
        this.errorMessage = 'Invalid username or password. Please try again.'; // Show error message
      },
      complete: () => {
        this.isLoading = false; // Hide loading spinner
      }
    });
  }
}
