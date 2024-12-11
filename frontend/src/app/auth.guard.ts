import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private router: Router, private authService: AuthService) {}

  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot
  // ): Observable<boolean> | Promise<boolean> | boolean {
  //   const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
    
  //   if (!isLoggedIn) {
  //     // If not logged in, redirect to login page
  //     this.router.navigate(['/login']);
  //     return false;
  //   }
  //   return true;
  // }

  
  canActivate(): boolean {
    if (this.authService.isLoggedIn()) {
      return true; // Allow access if logged in
    }
      // Redirect to login page if not logged in
      this.router.navigate(['/login']);
      return false;
    
  }
}
