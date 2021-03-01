import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import { EmployeeService } from './employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  employees;
  form: FormGroup;

  constructor(private employeeService: EmployeeService,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(employeeList => this.employees = employeeList.data);
    this.initForm();
  }

  private initForm(): void {
    this.form = this.fb.group({ // TODO: Add validations
      id: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]*$')
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[a-zA-Z ]*$')
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email
      ]),
      avatar: new FormControl('', Validators.required)
    });
  }

  addEmployee(): void {
    // TODO: Add an employee to the table
    this.employees.push(this.form.value);
    this.form.reset();
  }

  deleteEmployee(employee): void {
    // TODO: Delete an employee from the table
    this.employees = this.employees.filter(emp => emp !== employee);
  }

  fullName(employee): string {
    if (employee.name == null) {
      return employee.first_name + ' ' + employee.last_name;
    } else {
      return employee.name;
    }
  }
}
