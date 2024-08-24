import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr'; // Import ToastrService
import { LoginDto, LoginService } from '../Services/login.service'; // Import LoginService
import * as AuthActions from '../store/actions/auth.action';
import { selectAuthError, selectAuthName, selectIsLoggedIn } from '../store/selectors/auth.selectors';

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoggedIn$: Observable<boolean>;
  name$: Observable<string | null>;
  error$: Observable<string | null>;
  email: string = "";
  password: string = "";

  constructor(
    private store: Store,
    private router: Router,
    private loginService: LoginService, // Inject LoginService
    private toastr: ToastrService // Inject ToastrService
  ) {
    this.isLoggedIn$ = this.store.select(selectIsLoggedIn);
    this.name$ = this.store.select(selectAuthName);
    this.error$ = this.store.select(selectAuthError);
  }
  hidePassword: boolean = true;

  togglePasswordVisibility() {
    this.hidePassword = !this.hidePassword;
  }

  ngOnInit() {}

  login(): void {
    const loginDto: LoginDto = { email: this.email, password: this.password };
    this.store.dispatch(AuthActions.login({ loginDto }));
    this.isLoggedIn$.subscribe(isLoggedIn => {
      if (isLoggedIn) {
        this.name$.subscribe(name => {
          if (name) {
            this.toastr.clear(); // Clear any existing toasts
            this.router.navigate(['/about'], { queryParams: { name } });
            this.toastr.success('Login successful', 'Success');
          }
        });
      }
    });
  }
  
  logout(): void {
    this.loginService.logout();
    this.toastr.clear(); // Clear any existing toasts
    this.toastr.success('Logout successful', 'Success');
  }

  private isPasswordStrong(password: string): boolean {
    return password.length >= 8;
  }

  private extractNameFromEmail(email: string): string {
    const parts = email.split('@');
    return parts[0];
  }
}
