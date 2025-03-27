import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  users: any[] = [];
  role: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('token');
    this.role = localStorage.getItem('role') || '';

    if (!token) {
      alert('You are not authorized! Redirecting to login.');
      this.router.navigate(['/login']);
      return;
    }
    
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }
  loading: boolean = false;  // New loading flag


fetchUsers() {
  if (this.role === 'admin') {
    this.loading = true;  // Show loading spinner

    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get('http://localhost:3000/auth/users', { headers }).subscribe({
      next: (data: any) => {
        this.users = data;
        // alert('Users fetched successfully!');
      },
      error: (error) => console.error('Failed to fetch users:', error),
      complete: () => {
        setTimeout(() => {
          this.loading = false;  // Hide spinner after a short delay
        }, 500);
      }
    });
  } else {
    alert('Only admins can fetch users!');
  }
}
  
deleteUser(userId: string) {
  const token = localStorage.getItem('token');
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  if (confirm('Are you sure you want to delete this user?')) {
    this.http.delete(`http://localhost:3000/auth/users/${userId}`, { headers })
      .subscribe({
        next: (response) => {
          alert('User deleted successfully!');
          this.fetchUsers(); // Refresh the list after deletion
        },
        error: (err) => {
          alert('Error deleting user: ' + err.error.message);
        }
      });
  }
}

  logout() {
    localStorage.removeItem('token');  // Clear token from local storage
    this.router.navigate(['/login']);  // Redirect to login page
    localStorage.removeItem('role');  // Clear role from local storage
    // alert('Logged out successfully!');
  }
}
