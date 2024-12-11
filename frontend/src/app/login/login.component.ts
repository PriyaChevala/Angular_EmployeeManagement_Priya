import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; // Import Router to handle navigation
import { FormsModule } from '@angular/forms';  // Import FormsModule for form handling
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,  // Standalone component flag
  imports: [FormsModule, CommonModule, RouterModule, ReactiveFormsModule] // Import FormsModule here
  // Import FormsModule here
})
// export class LoginComponent {
//   loginError: boolean= false;
//   //loginError: string | null = null;;  // Flag to display error on invalid login
//   username = '';       // Store username input
//   password = '';       // Store password input


//   constructor(
//     private http: HttpClient,
//     private router: Router,
//     private authService: AuthService
//   ) {}
//   onSubmit() {
//     const { username, password } = this.loginForm.value;
  
//     this.authService.login(username, password).subscribe(
//       (response) => {
//         if (response.success) {
//           this.authService.setUsername(username); // Save username in storage
//           this.router.navigate(['/employees']); // Redirect to employee list
//         }
//       },
//       (error) => {
//         console.error('Login failed', error);
//         this.loginError = 'Invalid username or password.';
//       }
//     );
//   }
// }
  // Method to handle form submission
//   onSubmit() {
//     const correctUsername = 'admin';
//     const correctPassword = 'admin123';
  
//     if (this.username === correctUsername && this.password === correctPassword) {
//       this.loginError = false;
//       // Store the login state in sessionStorage
//       // Navigate to the employee list page after successful login
//       this.router.navigate(['/employees']);
//     } else {
//       this.loginError = true;
//     }
//   }  
// }
// onSubmit(): void {
//   const loginData = { username: this.username, password: this.password };

//   this.http.post('http://localhost:3000/api/login', loginData).subscribe(
//     (response: any) => {
//       if (response.success) {
//         this.authService.setUsername(this.username); // Store the username
//         this.router.navigate(['/dashboard']); // Redirect to dashboard
//       } else {
//         this.loginError = 'Invalid username or password';
//       }
//     },
//     (error) => {
//       this.loginError = 'Login failed. Please try again.';
//       console.error(error);
//     }
//   );
// }
// }









// export class LoginComponent {
//   loginForm: FormGroup; // Declare loginForm
//   //loginError: string = '';
//   loginError: boolean= true;
//   username = '';       // Store username input
//   password = '';       // Store password input

//   constructor(
//     private fb: FormBuilder,
//     private authService: AuthService,
//     private router: Router
//   ) {
//     // Initialize loginForm
//     this.loginForm = this.fb.group({
//       username: ['', Validators.required],
//       password: ['', Validators.required]
//     });
//   }

//   onSubmit() {
//     const correctUsername = 'admin123';
//     const correctPassword = 'admin123';
    
  
//     if (this.username === correctUsername && this.password === correctPassword) {
//       this.loginError = false;
//        // Store the login state in sessionStorage
//        // Navigate to the employee list page after successful login
//        this.router.navigate(['/employees']);
//      } else {
//        this.loginError = true;
//      }
    // if (this.loginForm.valid) {
    //   const { username, password } = this.loginForm.value;

    //   this.authService.login(username, password).subscribe(
    //     (response) => {
    //       console.log('Login successful:', response);
    //       this.authService.setUsername(username); // Store the username
    //       this.router.navigate(['/employees']); // Redirect on success
    //     },
    //     (error) => {
    //       console.error('Login failed', error);
    //       this.loginError = 'Invalid username or password.';
    //     }
    //   );
    // }
  




    export class LoginComponent implements OnInit {
      username = '';
      password = '';
      errorMessage = '';
    
      constructor(private authService: AuthService, private router: Router) {}
      ngOnInit(): void {
        const token = this.authService.getToken();
        console.log('JWT Token on Login Page:', token);
      }
      onSubmit(): void {
        this.authService.login(this.username, this.password).subscribe(
          (response: any) => {  // Ensure response is typed correctly
            if (response && response.token) {
            // Store username in local storage for further usage
            //this.authService.setUsername(this.username);
            this.authService.setToken(response.token);  // Save the token in service or local storage
          localStorage.setItem('username', this.username);  // Store username in localStorage

          console.log('Login successful, token:', response.token);
            // Navigate to employees page
            this.router.navigate(['/employees']);
          }
          else {
            //console.error('Login failed', error);
            this.errorMessage = 'Invalid username or password';
          }
        },
        (error) => {
          // Handle error response from backend
          console.error('Login failed', error);
          this.errorMessage = 'Invalid username or password';
        }
  
        );
      }
      
    }