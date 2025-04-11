# Employee CRUD (Laravel API + Angular 19)

This is a full-stack CRUD Employee Management System built using Laravel (for the backend REST API) and Angular 19 (for the frontend UI). It allows users to add, edit, delete, and view employee records with real-time feedback and validations.

---

## Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Backend Setup (Laravel)](#backend-setup-laravel)
- [Frontend Setup (Angular)](#frontend-setup-angular)
- [API Endpoints](#api-endpoints)
- [Environment Configuration](#environment-configuration)
- [How It Works](#how-it-works)
- [License](#license)

---

## Features

- Add new employees
- Edit employee data
- Delete employees with confirmation
- View all employees in a table
- Reactive Forms with validation
- API responses displayed via toast/snackbar
- Modular and maintainable architecture

---

## Tech Stack

### Frontend
- Angular 19
- Angular Material
- RxJS & HTTPClient
- TypeScript + SCSS

### Backend
- Laravel 10+
- PHP 8.1+
- MySQL
- Eloquent ORM
- RESTful API

---

### Project Structure

├── CRUD-angular-laravel
│   ├── backend
│   └── frontend
│   └── README.md
---



## Backend Setup (Laravel)

### Requirements
- PHP >= 8.1
- Composer
- MySQL

### Installation

```bash
cd backend

composer install

cp .env.example .env
php artisan key:generate

# Configure your .env file with DB credentials

php artisan migrate:fresh --seed

php artisan serve

```
- The API will run at: http://127.0.0.1:8000


### Frontend Setup (Angular)

### Requirements

- Node.js v18+
- Angular CLI 16+

### Installation

```
cd frontend

npm install

ng serve

```
- Frontend will run at: http://localhost:4200

- Make sure the Angular service points to the Laravel API:

```
private apiUrl = 'http://127.0.0.1:8000/api/employees';
```


### API Endpoints

| Method  | Endpoint  | Description | 
| --------| -------- | ----------- |
| GET    |    /api/employees      | List all employees | 
| GET    |    /api/employees/{id}	| Get a single employee  |
| POST   |    /api/employees      | Create new employee |
| PUT    |    /api/employees/{id  | Update existing employee  |
| DELETE |    /api/employees/{id} | Delete employee  |

All responses include a message and status field sent from Laravel and displayed in Angular.


