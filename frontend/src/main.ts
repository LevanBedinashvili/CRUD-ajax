import { bootstrapApplication, platformBrowser } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { AddEmployeeComponent } from './app/components/add-employee/add-employee.component';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  
