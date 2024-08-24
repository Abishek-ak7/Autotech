import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as AuthActions from '../store/actions/auth.action';

export interface LoginDto {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = 'http://localhost:8080/api/v1/employee';

  constructor(private http: HttpClient, private store: Store) {}

  login(loginDto: LoginDto): Observable<{ name: string, email: string }> {
    return this.http.post<{ name: string, email: string }>(`${this.apiUrl}/login`, loginDto);
  }

  logout(): void {
    localStorage.removeItem('token');
    this.store.dispatch(AuthActions.logout());
  }
}
