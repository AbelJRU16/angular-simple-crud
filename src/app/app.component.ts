import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Employee } from '../app/models/employee';
import { FormsModule } from '@angular/forms'; 
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'simple-crud';

  employeeArray: Employee[] = [
    { id: 1, name: "Ryan", country: "USA" },
    { id: 2, name: "Emma", country: "USA" },
    { id: 3, name: "Lucas", country: "USA" },
  ];

  total_employees = 3;

  form_employee: Employee = new Employee();

  save_data(): any{
    if(this.form_employee.id == 0){
      this.total_employees++;
      this.form_employee.id = this.total_employees;
      this.employeeArray.push(this.form_employee);
    }
    this.form_employee = new Employee();
  }

  edit_item(item: any): any{
    this.form_employee = item;
  }
  
  delete_item(id: number): any{
    // Alerta de confirmación
    Swal.fire({
      title: '¿Are you sure you want to delete this employee?',
      text: 'you can not revert this action',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.employeeArray = this.employeeArray.filter(item => item.id !== id)
        Swal.fire('Deleted!', 'the employee was deleted.', 'success');
      }
    });
  }
}
