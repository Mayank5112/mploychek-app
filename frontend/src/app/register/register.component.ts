import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';  
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],  
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'] ,
  
})
export class RegisterComponent {
  userID: string = '';
  password: string = '';
  confirmPassword: string = '';
  role: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    console.log('Register Component Initialized');
  }

  register() {
    if (!this.userID || !this.password || !this.confirmPassword || !this.role) {
      alert('All fields are required!');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }

    // Simulate user registration logic (e.g., send to backend)
    const userData = {
      userID: this.userID,
      password: this.password,
      role: this.role
    };
    this.http.post('http://localhost:3000/auth/register', userData)
    .subscribe({
      next: (response: any) => {
        alert('Registration successful!');
        this.router.navigate(['/login']);
      },
      error: (error: any) => {
        if (error.status === 400) {
          alert('User already exists!');
        } else {
          alert('Failed to register. Please try again later.');
        }
        console.error('Error:', error);
      }
    });
  }
  togglePasswordVisibility(fieldId: string): void {
    const passwordField = document.getElementById(fieldId) as HTMLInputElement;
    passwordField.type = passwordField.type === 'password' ? 'text' : 'password';
  }
}
