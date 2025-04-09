import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { EmployeeService } from '../../services/employee.service';



@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatTableModule, MatDividerModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})


export class EmployeeListComponent implements OnInit {

  employees: any[] = [];
  displayedColumns: string[] = ['id', 'first_name', 'last_name', 'email', 'phone', 'position'];

  constructor(private employeeService: EmployeeService) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(res => {
      this.employees = res.data;
    });
  }
}

