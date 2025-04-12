import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Router, ActivatedRoute  } from '@angular/router';
import { EmployeeService } from '../../services/employee.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-form-employee',
  templateUrl: './form-employee.component.html',
  styleUrls: ['./form-employee.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ]
})

export default class FormEmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  loading = false;
  submitted = false;
  serverErrors: Record<string, string[]> = {};
  generalError = '';
  employeeId!: number;
  isUpdateMode: boolean = false;  // Flag to track update mode


  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
    @Inject(PLATFORM_ID) private platformId: any

  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.isUpdateMode = true;  
      }
    });


    this.employeeForm = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(255)]],
      last_name: ['', [Validators.required, Validators.maxLength(255)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      position: ['', [Validators.required]]
    });

    this.route.queryParams.subscribe((params: any) => {
      if (isPlatformBrowser(this.platformId)) {
        const empData = history.state?.data;
        if (empData) {
          this.employeeId = empData.id;
          this.employeeForm.patchValue(empData);
        }
      }
    });
  }

  onSubmit(): void {
    this.resetErrors();
    if (this.employeeForm.invalid) {
      this.markAllTouched(this.employeeForm);
      return;
    }
  
    this.loading = true;
  
    const request = this.employeeId
      ? this.employeeService.updateEmployee(this.employeeId, this.employeeForm.value)
      : this.employeeService.addEmployee(this.employeeForm.value);
  
    request.subscribe({
      next: res => {
        this.loading = false;
        this.snackBarMessage(res.message);
        if (!this.employeeId) {
          this.employeeForm.reset();
        }
      },
      error: (error: HttpErrorResponse) => {
        this.loading = false;
        this.submitted = false;

        if (error.status === 422 && error.error?.errors) {
          this.handleValidationErrors(error.error.errors);
        } else {
          this.generalError = error.error?.message || 'An error occurred';
          this.snackBarMessage(this.generalError, ['error-snackbar']);
        }
      }
    });
  }

  private handleValidationErrors(errors: Record<string, string[]>): void {
    this.serverErrors = errors;
    const messages = Object.values(errors).flat();
    this.snackBarMessage(messages.join('\n'), ['error-snackbar', 'multiline-snackbar'], 7000);

    Object.keys(errors).forEach(key => {
      const control = this.employeeForm.get(key);
      control?.markAsTouched();
      control?.setErrors({ serverError: true });
    });
  }

  private snackBarMessage(msg: string, panelClass: string[] = [], duration = 3000): void {
    this.snackBar.open(msg, 'Close', {
      duration,
      horizontalPosition: 'start',
      verticalPosition: 'bottom',
      panelClass
    });
  }

  private markAllTouched(form: FormGroup): void {
    Object.values(form.controls).forEach(control => control.markAsTouched());
  }

  private resetErrors(): void {
    this.serverErrors = {};
    this.generalError = '';
  }

  hasError(controlName: string, error: string): boolean {
    const control = this.employeeForm.get(controlName);
    return !!(control?.touched && control.hasError(error));
  }

  hasServerError(controlName: string): boolean {
    return !!this.serverErrors[controlName]?.length;
  }

  getServerErrors(controlName: string): string[] {
    return this.serverErrors[controlName] || [];
  }

  cancel(): void {
    this.employeeForm.reset();
    this.resetErrors();
  }
}
