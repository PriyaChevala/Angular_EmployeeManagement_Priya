import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,  // Standalone component flag
  imports: [FormsModule, CommonModule, RouterModule]  // Import FormsModule here
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';
  registerError: string ='';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const user = {
      email: this.email,
      username: this.username,
      password: this.password
    };
  
    this.http.post('http://localhost:3000/api/register', user).subscribe({
      next: (response) => {
        console.log('Registration successful:', response);
        console.log(user);
        this.router.navigate(['/login']); // Redirect to login page after successful registration
      },
      error: (error) => {
        console.error('Registration error:', error);
        this.registerError = 'There was an error during registration. Please try again.';
      },
      complete: () => {
        console.log('Registration request completed.');
      }
    });
  }
  
}
