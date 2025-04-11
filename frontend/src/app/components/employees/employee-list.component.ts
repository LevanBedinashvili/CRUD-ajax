import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';
import { Router } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar'; 



@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatDividerModule, MatButton, MatIconModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})


export class EmployeeListComponent implements OnInit {

  employees: any[] = [];
  displayedColumns: string[] = ['id', 'Name', 'email', 'phone', 'position', 'actions', 'delete'];

  constructor
  (
    private employeeService: EmployeeService, 
    private router: Router,
    private snackBar: MatSnackBar

  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(res => {
      this.employees = res.data;
    });
  }

  editEmployee(emp: Employee): void {
    this.router.navigate(['/edit-employee', emp.id], { state: { data: emp } });
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe({
      next: (res) => {
        this.employees = res.data;
      },
      error: (error) => {
        this.snackBar.open('Failed to fetch employees', 'Close', { duration: 3000, horizontalPosition: 'start', verticalPosition: 'bottom'});
        console.error(error);
      }
    });
  }

  deleteEmployee(emp: any): void {
    if (confirm(`Are you sure you want to delete ${emp.first_name} ${emp.last_name}?`)) {
      this.employeeService.deleteEmployee(emp.id).subscribe({
        next: (response: any) => {
          const { status, message } = response;
          this.snackBar.open(message, 'Close', { duration: 3000, horizontalPosition: 'start', verticalPosition: 'bottom'});
  
          if (status === 'success') {
            this.getEmployees();
          }
        },
        error: (error) => {
          // If Laravel sends a JSON error message
          const message = error?.error?.message || 'An unexpected error occurred';
          this.snackBar.open(message, 'Close', { duration: 3000,  horizontalPosition: 'start', verticalPosition: 'bottom'});
          console.error(error);
        }
      });
    }
  }
  
}

