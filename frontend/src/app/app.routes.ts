import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { HomepageComponent } from './homepage/homepage.component';

export const routes: Routes = [
  { path: '', redirectTo: 'homepage', pathMatch: 'full' },  // Redirect to login by default
  { path: 'login', component: LoginComponent },  // Route for login page
  { path: 'register', component: RegisterComponent },  // Route for register page
  { path: 'dashboard', component: DashboardComponent },  // Route for dashboard page  
  {path: 'homepage', component: HomepageComponent}
];
