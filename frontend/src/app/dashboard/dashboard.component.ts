import { Component, OnInit } from '@angular/core';
import axios from 'axios';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true, // Standalone component flag
  imports: [CommonModule],
})
export class DashboardComponent implements OnInit {
  totalEmployees: number = 0; // Total number of employees in the list

  constructor() {}

  ngOnInit() {
    this.fetchEmployeeCount();
  }

  // Fetches the employee data and calculates the count
  fetchEmployeeCount() {
    axios
      .get('http://localhost:3000/api/employees')
      .then((response) => {
        this.totalEmployees = response.data.length; // Calculate the total count
      })
      .catch((error) => {
        console.error('Error fetching employee data', error);
      });
  }
  months = [
    {
      name: 'January',
      date: '1st - 31st',
      color: '#8e44ad',
      activities: ['New Year', 'Pongal Celebration'],
    },
    {
      name: 'February',
      date: '15th - 16th',
      color: '#e74c3c',
      activities: ['Employee Sports event'],
    },
    {
      name: 'March',
      date: '12th - 16th',
      color: '#3498db',
      activities: ['Seminar on Work-Life Balance'],
    },
    {
      name: 'April',
      date: '20th - 22nd',
      color: '#27ae60',
      activities: ['Team Lunch week'],
    },
    {
      name: 'May',
      date: '9th',
      color: '#f39c12',
      activities: ['IT Awareness'],
    },
    {
      name: 'June',
      date: '4th - 8th',
      color: '#e91e63',
      activities: ['Volunteering for social service event'],
    },
    {
      name: 'July',
      date: '23rd - 31st',
      color: '#8e44ad',
      activities: ['Project Report Submission'],
    },
    {
      name: 'August',
      date: '20th',
      color: '#e67e22',
      activities: ['World Photo Day'],
    },
    {
      name: 'September',
      date: '1st - 7th',
      color: '#16a085',
      activities: ['Motivational Speaker event'],
    },
    {
      name: 'October',
      date: '6th',
      color: '#2ecc71',
      activities: ['National Work-Life Day'],
    },
    {
      name: 'November',
      date: '21st',
      color: '#f39c12',
      activities: ['All Hands Meet', 'Diwali Celebration'],
    },
    {
      name: 'December',
      date: '23rd - 26th',
      color: '#e91e63',
      activities: ['Christmas Celebration'],
    },
  ];
}
