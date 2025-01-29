import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute,Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';

  constructor(private authService: AuthService,private route: ActivatedRoute, private router :Router ) {}

  login() {
    this.authService.login(this.username, this.password).subscribe(
      (response) => {
        // Store token and role in local storage
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role); 
        this.authService.setToken(response.token); // ✅ Store token
        // Redirect based on user role
        if (response.role === 'admin') {
          this.router.navigate(['/admin-dashboard']);
        } else {
          this.router.navigate(['/dashboard']);
        }
      },
      (error) => {
        alert('Invalid credentials');
      }
    );
  }
}
