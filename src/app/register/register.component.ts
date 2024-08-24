import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterDto, RegisterService } from '../Services/register.service'; // Import the RegisterService and RegisterDto
import { Router } from '@angular/router';
import { query } from '@angular/animations';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  hide = true;
  hide2 = true;

  constructor(
    private router: Router,
    private registerService: RegisterService,
    private toastr: ToastrService // Inject the RegisterService
  ) {
    this.registerForm = new FormGroup({
      name:new FormControl('',[Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl('', [Validators.required])
    });
  }
  get name(){
    return this.registerForm.get('name');
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get confirmPassword() {
    return this.registerForm.get('confirmPassword');
  }

  getErrorMessage() {
    if (this.email?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email?.hasError('email') ? 'Not a valid email' : '';
  }

  getPassErrorMessage() {
    if (this.password?.hasError('required')) {
      return 'You must enter a value';
    }
    return this.password?.hasError('minlength') ? 'Password must be at least 8 characters long' : '';
  }

  onSubmit(): void {
    if (this.password?.value !== this.confirmPassword?.value) {
      console.error('Passwords must match');
      return;
    }
    const registerDto: RegisterDto = {
      name:this.name?.value,
      email: this.email?.value,
      password: this.password?.value,
      
    };

    // Call the register() method from the RegisterService and subscribe to its result
    this.registerService.register(registerDto).subscribe(
      (response: { name:string, email: string , password:string }) => {
        console.log('Registration successful:', response);
        this.toastr.success('Registration successful', 'Success');
        this.toastr.success('OTP Send to your Email', 'Success');

        // Navigate to '/otpverify' route after successful registration
        this.router.navigate(['/otpverify'], { queryParams: { email: this.email?.value ,name: this.name?.value} });
      },
      (error) => {
        console.error('Registration failed:', error);
        this.toastr.error('Email already Exists','Failure')
        // Handle registration error here
      }
    );
  }
}
