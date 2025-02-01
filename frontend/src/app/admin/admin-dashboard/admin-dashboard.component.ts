import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-dashboard',
  imports: [RouterModule, NgIf],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css',
  standalone: true,  // Declaring this as a standalone component
  providers: [AuthService, LocalStorageService]  // Ensure both services are provided here
})
export class AdminDashboardComponent {
    constructor(private authService: AuthService, private router: Router) {}
  
  logout() {
    this.authService.logout(); // ✅ Clear token
    this.router.navigate(['/dashboard/login']); // ✅ Redirect to login
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
