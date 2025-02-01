import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from './services/auth.service';
import { LocalStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],  // Fixed to styleUrls (plural)
  standalone: true,  // Declaring this as a standalone component
  providers: [AuthService, LocalStorageService]  // Ensure both services are provided here
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  constructor(private authService: AuthService, private router: Router) {}

  logout() {
    this.authService.logout(); // ✅ Clear token
    this.router.navigate(['/login']); // ✅ Redirect to login
  }

  isAuthenticated(): boolean {
    return this.authService.isAuthenticated();
  }
}
