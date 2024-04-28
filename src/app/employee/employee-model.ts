
export interface Employee {
    id?: Number;
    firstName: String;
    lastName: String;
    email: String;
    salary: Number;
    birthDate: String;
    department: Department | null;
    departmentId?: Number

}

export class Department {

    constructor(public id: Number, public name: String) {

    }

} 
