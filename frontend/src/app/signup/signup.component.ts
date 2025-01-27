import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-signup',
  imports: [FormsModule,RouterLink],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  username = '';
  password = '';
  user=null;

  constructor(private authService: AuthService,private route: ActivatedRoute, private router: Router) {}

  signup() {
    this.authService.signup(this.username, this.password).subscribe(
      (response) => {
        alert('Signup successful!');
        this.router.navigate(['/login']);  // Redirect to login page after successful signup
      },
      (error) => {
        console.log(error);
        alert(error.message);
      }
    );
  }
  onSubmit() {
    console.log('User Data:', this.user);
    alert('Signup successful!');
}
}
