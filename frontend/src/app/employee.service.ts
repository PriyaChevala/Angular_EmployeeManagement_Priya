import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

const BASE_URL = 'http://localhost:8080/api/employees';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService {
  constructor(private http: HttpClient) {}

  getEmployees(): Observable<any> {
    return this.http.get(BASE_URL);
  }

  addEmployee(employee: any): Observable<any> {
    return this.http.post(BASE_URL, employee);
  }

  deleteEmployee(id: number): Observable<any> {
    return this.http.delete(`${BASE_URL}/${id}`);
  }

  updateEmployee(id: number, employee: any): Observable<any> {
    return this.http.put(`${BASE_URL}/${id}`, employee);
  }
}
