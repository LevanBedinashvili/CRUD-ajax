export interface Employee {
    id?: number;
    first_name: string;
    last_name: string;
    email: string;
    phone: string;
    position: string;
  }
  
  export interface ApiResponse<T> {
    status: string;
    message: string;
    data?: T;
    errors?: {
      [key: string]: string[];
    };
  }
