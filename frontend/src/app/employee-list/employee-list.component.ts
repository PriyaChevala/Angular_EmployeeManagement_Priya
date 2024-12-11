import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import axios from 'axios';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: any[] = []; // All employee data
  filteredEmployees: any[] = []; // Filtered list of employees
  paginatedEmployees: any[] = []; // Employees for the current page
  searchTerm: string = ''; // Search term bound to the input field
  pageSize: number = 10; // Number of employees per page
  currentPage: number = 1; // Current page number

  constructor() {}

  ngOnInit() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    axios
      .get('http://localhost:3000/api/employees')
      .then((response) => {
        this.employees = response.data.map((employee: any) => ({
          ...employee,
          isEditing: false,
        }));
        this.filteredEmployees = this.employees;
        this.updatePaginatedEmployees();
      })
      .catch((error) => {
        console.error('Error fetching employee data', error);
      });
  }

  // Update filteredEmployees when search term changes
  onSearchChange() {
    if (this.searchTerm) {
      this.filteredEmployees = this.employees.filter(
        (employee) =>
          employee.first_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          employee.last_name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          employee.email.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    } else {
      this.filteredEmployees = this.employees;
    }
    this.currentPage = 1; // Reset to the first page
    this.updatePaginatedEmployees();
  }

  // Update employees for the current page
  updatePaginatedEmployees() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.paginatedEmployees = this.filteredEmployees.slice(startIndex, endIndex);
  }

  // Handle page changes
  onPageChange(newPage: number) {
    this.currentPage = newPage;
    this.updatePaginatedEmployees();
  }

  editEmployee(index: number) {
    this.paginatedEmployees[index].isEditing = true;
  }

  saveEmployee(index: number) {
    const employee = this.paginatedEmployees[index];

    axios
      .put(`http://localhost:3000/api/employees/${employee.id}`, {
        first_name: employee.first_name,
        last_name: employee.last_name,
        email: employee.email,
      })
      .then(() => {
        employee.isEditing = false;
        console.log('Employee updated successfully');
        alert('Employee updated successfully');
      })
      .catch((error) => {
        console.error('Error updating employee', error);
      });
  }

  deleteEmployee(index: number) {
    const employeeId = this.paginatedEmployees[index].id;

    axios
      .delete(`http://localhost:3000/api/employees/${employeeId}`)
      .then(() => {
        this.employees = this.employees.filter((e) => e.id !== employeeId);
        this.filteredEmployees = this.filteredEmployees.filter((e) => e.id !== employeeId);
        this.updatePaginatedEmployees();
        console.log('Employee deleted successfully');
        alert('Employee deleted successfully');
      })
      .catch((error) => {
        console.error('Error deleting employee', error);
      });
  }

  // Getter for total pages
  get totalPages(): number {
    return Math.ceil(this.filteredEmployees.length / this.pageSize);
  }
}
