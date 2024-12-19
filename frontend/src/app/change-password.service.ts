import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  constructor(private http: HttpClient) {}

  changePassword(oldPassword: string, newPassword: string): Observable<any> {
    const body = { oldPassword, newPassword };
    return this.http.put('http://localhost:3000/api/change-password', body);
  }
}
