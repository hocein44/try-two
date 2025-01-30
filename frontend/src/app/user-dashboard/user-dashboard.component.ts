import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { LocalStorageService } from 'ngx-webstorage';
import { AuthService } from '../services/auth.service';
import { CartComponent } from "../cart/cart.component";
@Component({
  selector: 'app-user-dashboard',
  imports: [NgIf, RouterModule, CartComponent],
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css',
  standalone: true,  // Declaring this as a standalone component
  providers: [AuthService, LocalStorageService]  // Ensure both services are provided here
})
export class UserDashboardComponent {
   constructor(private authService: AuthService, private router: Router) {}
  
    logout() {
      this.authService.logout(); // ✅ Clear token
      this.router.navigate(['/login']); // ✅ Redirect to login
    }
  
    isAuthenticated(): boolean {
      return this.authService.isAuthenticated();
    }

}
