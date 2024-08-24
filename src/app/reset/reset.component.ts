import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})

export class ResetComponent {
  email: string = '';
  private apiUrl = 'http://localhost:8080/api/v1/employee';

  constructor(private http: HttpClient) {}

  sendResetLink() {
    if (this.email) {
      this.http.post(`${this.apiUrl}/reset-password`, { email: this.email }).subscribe(
        response => {
          // Handle successful response
          console.log('Reset link sent successfully', response);
        },
        error => {
          // Handle error response
          console.error('Error sending reset link', error);
        }
      );
    } else {
      alert('Please enter an email address');
    }
  }
}
