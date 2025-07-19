export interface Employee {
  id: string;
  name: string;
  position: string;
  department?: string;
  avatar?: string;
  isManager?: boolean;
  email?: string;
  phone?: string;
  joinDate?: string;
  location?: string;
  experience?: string;
  skills?: string[];
  bio?: string;
}

export interface Intern extends Employee {
  university: string;
}

export interface Department {
  id: string;
  name: string;
  gradient: string;
  manager: Employee;
  employees: Employee[];
}

export interface MousePosition {
  x: number;
  y: number;
}
