import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private baseUrl = 'http://localhost:8080/api/v1/employee';

  constructor(private http: HttpClient) {}

  resetPassword(payload: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/update-password`, payload);
  }
}
