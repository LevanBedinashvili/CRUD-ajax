import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employees/employee-list.component';
import { FormEmployeeComponent } from './components/form-employee/form-employee.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'add-employee', component: FormEmployeeComponent },
  { path: 'edit-employee/:id', component: FormEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }