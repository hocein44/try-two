import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgFor, NgIf} from '@angular/common';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../../services/auth.service';
import { ApiService } from '../../services/api.service'; // Import ApiService

@Component({
  selector: 'app-user-dashboard',
  imports: [NgIf,NgFor, RouterModule],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
  standalone: true,
  providers: [AuthService, LocalStorageService, ApiService] // Add ApiService to providers
})
export class UserDashboardComponent {
  purchaseHistory: any[] = [];

  constructor(
    private authService: AuthService, 
    private router: Router,
    private apiService: ApiService // Inject ApiService
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/dashboard/login']);
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }

  // Method to fetch purchase history
  fetchPurchaseHistory() {
    const userId = this.authService.getUserId(); // Assuming you have a method to get the user ID
    if (userId) {
      this.apiService.getPurchaseHistory(userId).subscribe(
        (data) => {
          this.purchaseHistory = data;
        },
        (error) => {
          console.error('Error fetching purchase history:', error);
        }
      );
    }
  }
}