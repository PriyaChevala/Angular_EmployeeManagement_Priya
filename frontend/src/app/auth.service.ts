import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// export class AuthService {
//   private username: string | null = null;

//   // Set the username when the user logs in
//   setUsername(username: string): void {
//     this.username = username;
//   }

//   // Retrieve the logged-in username
//   getUsername(): string | null {
//     return this.username;
//   }

//   // Clear username when user logs out
//   clearUsername(): void {
//     this.username = null;
//   }
// }
// export class AuthService {
//     constructor() {}
  
//     isLoggedIn(): boolean {
//       // Check if a token or user data exists in localStorage/sessionStorage
//       return !!localStorage.getItem('username');
//     }
  
//     getUsername(): string | null {
//       return localStorage.getItem('username');
//     }
  
//     setUsername(username: string): void {
//       localStorage.setItem('username', username);
//     }
  
//     clearUsername(): void {
//       localStorage.removeItem('username');
//     }
//   }

// export class AuthService {
//     private apiUrl = 'http://localhost:3000/api'; // Update with your backend URL
//     private loggedInUsername: string | null = null;
  
//     constructor(private http: HttpClient) {}
  
//     login(username: string, password: string): Observable<any> {
//       const loginData = { username, password };
//       return this.http.post(`${this.apiUrl}/login`, loginData);
//     }
  
//     setUsername(username: string) {
//       this.loggedInUsername = username;
//     }
  
//     getUsername(): string | null {
//       return this.loggedInUsername;
//     }
  
//     logout() {
//       this.loggedInUsername = null;
//     }
  
//     // isLoggedIn(): boolean {
//     //   return this.loggedInUsername !== null;
//     // }
//     isLoggedIn(): boolean {
//                // Check if a token or user data exists in localStorage/sessionStorage
//               return !!localStorage.getItem('username');
//              }
//     clearUsername(): void {
//               localStorage.removeItem('username');
//         }
//   }





export class AuthService {
    private apiUrl = 'http://localhost:3000/api'; // Backend URL
    private loggedInUsername: string | null = null;
  
    constructor(private http: HttpClient) {}
  
    /**
     * Logs in the user by sending the username and password to the backend.
     * Stores the username in localStorage on success.
     */
    // login(username: string, password: string): Observable<any> {
    //     //const loginData = { username, password };
    //     return this.http.post<any>(`${this.apiUrl}/login`, { username, password }).pipe(
    //         tap((response: any) => {
    //             if (response.success && response.username) {
    //                 this.setUsername(response.username); // Set the username on successful login
    //             }
    //         })
    //     );
    // }
    // login(username: string, password: string): Observable<any> {
    //     const loginData = { username, password };
    //     return this.http.post(`${this.apiUrl}/login`, {username, password}).pipe(
    //       tap((response: any) => {
    //         if (response.success) {
    //           console.log('Login successful, saving username to localStorage');
    //           this.setUsername(response.username);
              
    //         } else {
    //           console.log('Login failed');
    //         }
    //       }),
        //   catchError(error => {
        //     console.log('Login error:', error);
        //     return throwError(error);
        //   })
    //     );
    //   }
    login(username: string, password: string): Observable<any> {
        return this.http.post(`${this.apiUrl}/login`, { username, password }).pipe(
          tap((response: any) => {
            console.log('API response:', response); // Log the backend response
            if (response) {
              localStorage.setItem('username', response.username); // Save username
              localStorage.setItem('email', response.email);       // Save email
            } else {
              console.error('Login failed or missing username in response');
            }
          })
        );
      }
      
    
      // Save the token to localStorage
      setToken(token: string): void {
        localStorage.setItem('jwtToken', token);
        
      }
    
      // Retrieve the token from localStorage
      getToken(): string | null {
        return localStorage.getItem('jwtToken');
      }
      getEmail(): string | null {
        return localStorage.getItem('email'); // Ensure email is stored during login
      }
      // Clear the token on logout
      logout(): void {
        localStorage.removeItem('jwtToken');
        this.loggedInUsername = null;
        localStorage.removeItem('username');
      }
    
      // Check if user is logged in
      isLoggedIn(): boolean {
        return !!this.getToken();
        
      }
  
    /**
     * Returns the currently logged-in username from localStorage.
     */
    getUsername(): string | null {
        const username = localStorage.getItem('username');
        console.log("Stored username from localStorage: ", username); // Log to see the value in localStorage
        return username;
      }
    // getUsername(): string | null {
    //     return  localStorage.getItem('username');
    // }
    // setUsername(username: string ) {
    //     localStorage.setItem('username', username);
    //     console.log('Username saved to localStorage:', username); // Check if the username is stored
    //     this.loggedInUsername = username; // Optional: Store username in the service as well
    
    // }
    setUsername(username: string): void {
        localStorage.setItem('username', username);
        console.log('Username saved to localStorage:', username);
      }
      setEmail(email: string): void {
        localStorage.setItem('email', email);
        console.log('Email saved to localStorage:', email);
      }
      
    // setUsername(username: string) {
    //            this.loggedInUsername = username;
    //            localStorage.setItem('username', username);
    //         }
    /**
     * Logs out the user by clearing localStorage and resetting variables.
     */
    // logout(): void {
    //   localStorage.removeItem('token');
    //   localStorage.removeItem('username');
    //   this.loggedInUsername = null;
    // }
    // getToken(): string | null {
    //     return localStorage.getItem('token');
    //   }
      
    clearUsername(): void {
                       localStorage.removeItem('username');
                }
    /**
     * Checks if the user is logged in by verifying the presence of a token.
     */
    // isLoggedIn(): boolean {
    //   return !!localStorage.getItem('token'); // Check if token exists
    // }
  }