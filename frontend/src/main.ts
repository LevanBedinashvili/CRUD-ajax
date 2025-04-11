import { bootstrapApplication, platformBrowser } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { FormEmployeeComponent } from './app/components/form-employee/form-employee.component';


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

  
