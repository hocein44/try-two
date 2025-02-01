import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-signup',
  imports: [FormsModule, RouterLink, NgIf],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  username = '';
  email = '';
  password = '';
  isLoading = false; // Loading state
  successMessage = ''; // Success message
  errorMessage = ''; // Error message

  constructor(private authService: AuthService, private router: Router) {}

  signup() {
    this.isLoading = true; // Show loading spinner
    this.successMessage = ''; // Reset success message
    this.errorMessage = ''; // Reset error message

    this.authService.signup(this.username, this.email, this.password).subscribe({
      next: (response) => {
        this.successMessage = 'Signup successful! Redirecting to login...'; // Show success message
        setTimeout(() => {
          this.router.navigate(['/dashboard/login']); // Redirect to login page after 2 seconds
        }, 2000);
      },
      error: (error) => {
        this.isLoading = false; // Hide loading spinner
        this.errorMessage = 'Signup failed. Please try again.'; // Show error message
      },
      complete: () => {
        this.isLoading = false; // Hide loading spinner
      }
    });
  }
}