import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,  // Standalone component flag
  imports: [ CommonModule]  
})
export class DashboardComponent implements OnInit {
  totalEmployees: number = 0; // Total number of employees in the list

  constructor() {}

  ngOnInit() {
    this.fetchEmployeeCount();
  }

  // Fetches the employee data and calculates the count
  fetchEmployeeCount() {
    axios.get('http://localhost:3000/api/employees')
      .then(response => {
        this.totalEmployees = response.data.length; // Calculate the total count
      })
      .catch(error => {
        console.error('Error fetching employee data', error);
      });
  }
}
