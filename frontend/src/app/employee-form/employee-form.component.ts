import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';  // Import FormsModule
import { ActivatedRoute, Router } from '@angular/router';
import axios from 'axios';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],  // Use FormsModule in this component
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.css']
})
export class EmployeeFormComponent implements OnInit {
  employee = { first_name: '', last_name: '', email: '' };
  isEditMode = false;
  employeeId: number | null = null;

  constructor(private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.employeeId = parseInt(id, 10);

      // Correct API call for fetching employee by ID
      axios.get(`http://localhost:3000/api/employees/${this.employeeId}`)
        .then(response => {
          this.employee = response.data;
        })
        .catch(error => {
          console.error('Error fetching employee data for editing', error);
          alert('There was an error fetching the employee data. Please try again.');
        });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      if (this.employeeId && this.employee) {
        axios.put(`http://localhost:3000/api/employees/${this.employeeId}`, this.employee)
          .then(() => {
            alert('Employee updated successfully');
            this.router.navigate(['/employees']);  // Navigate to the employee list page after update
          })
          .catch(error => {
            console.error('There was an error updating the employee!', error);
            alert('There was an error updating the employee. Please try again later.');
          });
      } else {
        console.error('Employee data or employeeId is missing');
        alert('Employee data or ID is missing. Cannot update.');
      }
    } else {
      // Create new employee
      if (this.employee) {
        axios.post('http://localhost:3000/api/employees', this.employee)
          .then(response => {
            alert('Employee created successfully');
            this.router.navigate(['/employees']);  // Navigate to the employee list page after creation
          })
          .catch(error => {
            console.error('There was an error creating the employee!', error);
            alert('There was an error creating the employee. Please try again later.');
          });
      } else {
        console.error('Employee data is missing');
        alert('Employee data is missing. Cannot create.');
      }
    }
  }
}
