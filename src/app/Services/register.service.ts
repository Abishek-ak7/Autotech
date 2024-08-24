import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as AuthActions from '../store/actions/auth.action';

export interface RegisterDto {
  name:string;
  email: string;
  password: string;
  
}


@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  private apiUrl = 'http://localhost:8080/api/v1/employee';

  constructor(private http: HttpClient, private store: Store) {}

  register(registerDto: RegisterDto): Observable<{ name:string,email: string,password:string }> {
    return this.http.post<{  name:string,email: string ,password:string}>(`${this.apiUrl}/register`, registerDto);
  }

  
}
