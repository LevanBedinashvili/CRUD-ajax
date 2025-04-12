import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { 
    path: '', 
    loadComponent: () =>
      import('./components/employees/employee-list.component'),
  },
  { 
    path: 'add-employee', 
    loadComponent: () =>
      import('./components/form-employee/form-employee.component'),  
  },
  { 
    path: 'edit-employee/:id', 
    loadComponent: () =>
      import('./components/form-employee/form-employee.component'),    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }