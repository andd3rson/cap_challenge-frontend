
export interface Employee {
    id?: Number;
    firstName: String;
    lastName: String;
    email: String;
    salary: Number;
    birthDate: Date;
    departmentId?: Number;
    department?: Department;

}

export interface Department {
    id: Number;
    name: String;
} 