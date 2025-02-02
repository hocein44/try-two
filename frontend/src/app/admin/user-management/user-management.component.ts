import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { User } from '../../interfaces/user';
import { FormsModule } from '@angular/forms';
import { NgIf, NgFor } from '@angular/common';

@Component({
  selector: 'app-user-management',
  imports: [FormsModule, NgIf, NgFor],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.css'
})
export class UserManagementComponent implements OnInit {
  users: User[] = [];
  newUser: User = { username: '', email: '', password: '', role: 'user' };
  editUser: User | null = null;
  
  errorMessage: string = '';
  successMessage: string = '';
  isLoading: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  // Load all users
  loadUsers(): void {
    this.userService.getUsers().subscribe(
      (data) => {
        this.users = data;
      },
      () => {
        this.showError('Failed to load users. Please try again.');
      }
    );
  }

  // Add a new user
  addUser(): void {
    if (!this.newUser.username || !this.newUser.email || !this.newUser.password) {
      this.showError('All fields are required.');
      return;
    }

    this.isLoading = true;
    this.userService.addUser(this.newUser).subscribe(
      () => {
        this.loadUsers();
        this.newUser = { username: '', email: '', password: '', role: 'user' }; // Reset form
        this.showSuccess('User added successfully!');
      },
      () => {
        this.showError('Failed to add user. Please try again.');
      }
    );
  }

  // Set user to edit
  setEditUser(user: User): void {
    this.editUser = { ...user }; // Ensures all properties, including role, are copied
    this.clearMessages();
  }
  

  // Update a user
  updateUser(): void {
    if (!this.editUser || !this.editUser.username || !this.editUser.email || !this.editUser.password) {
      this.showError('All fields are required.');
      return;
    }

    this.isLoading = true;
    this.userService.updateUser(this.editUser._id || '', this.editUser).subscribe(
      () => {
        this.loadUsers();
        this.editUser = null;
        this.showSuccess('User updated successfully!');
      },
      () => {
        this.showError('Failed to update user. Please try again.');
      }
    );
  }

  // Delete a user
  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.isLoading = true;
      this.userService.deleteUser(id).subscribe(
        () => {
          this.loadUsers();
          this.showSuccess('User deleted successfully!');
        },
        () => {
          this.showError('Failed to delete user. Please try again.');
        }
      );
    }
  }

  // Helper method to show success message
  private showSuccess(message: string): void {
    this.successMessage = message;
    this.errorMessage = ''; // Clear error messages
    this.isLoading = false;
    setTimeout(() => {
      this.successMessage = ''; // Auto-hide success message after 3 seconds
    }, 3000);
  }

  // Helper method to show error message
  private showError(message: string): void {
    this.errorMessage = message;
    this.successMessage = ''; // Clear success messages
    this.isLoading = false;
  }

  // Clear all messages
  private clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}
