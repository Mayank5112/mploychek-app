import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';  

@Component({
  selector: 'app-login',
  standalone: true,  
  imports: [FormsModule],  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  
  constructor(private http: HttpClient, private router: Router) {}  

  userID: string = '';
  password: string = '';

  login() {
    console.log('User ID:', this.userID);
    console.log('Password:', this.password);

    this.http.post('http://localhost:3000/auth/login', {
      userID: this.userID,
      password: this.password
    }).subscribe({
      next: (response: any) => {
        // alert('Login successful!');
        localStorage.setItem('token', response.token);
        localStorage.setItem('role', response.role);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        alert('Invalid credentials');
        console.error('Login error:', error);
      }
    });
  }
}
