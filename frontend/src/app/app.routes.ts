import { RouterModule, Routes } from '@angular/router';
import { EmployeeListComponent } from './components/employees/employee-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { NgModule } from '@angular/core';


export const routes: Routes = [
  { path: '', component: EmployeeListComponent },
  { path: 'add-employee', component: AddEmployeeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }