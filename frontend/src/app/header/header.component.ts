import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';  // Import RouterModule for navigation
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  standalone: true,  // Mark this component as standalone
  imports: [RouterModule, CommonModule],  // Import RouterModule here to enable routerLink in the template
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  isSidebarVisible: boolean = false;
  isDropdownVisible: boolean = false; // Profile dropdown visibility state
  username: string | null = null;
  constructor(private router: Router, public authService: AuthService) {}


  ngOnInit(): void {
    this.username = this.authService.getUsername();
    console.log("Username" ,this.username); // Get logged-in username
  }
  // Method to check if the current route is the login page
  isLoginPage(): boolean {
    return this.router.url === '/login';
  }
  isRegisterPage(): boolean {
    return this.router.url === '/register';
  }
  
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
  // Function to toggle profile dropdown visibility
  toggleDropdown() {
    this.isDropdownVisible = !this.isDropdownVisible;
  }

  // Function to handle logout
  // logout(): void {
  //   this.authService.clearUsername(); // Clear the username
  //   this.username = null;
  //   this.router.navigate(['/login']); // Redirect to login
  // }
  logout(): void {
    this.authService.logout(); // Clear the token
    this.username = null;
    this.router.navigate(['/login']); // Redirect to login page
  }
  getUsername(): string | null {
    return localStorage.getItem('username');
  }
}
