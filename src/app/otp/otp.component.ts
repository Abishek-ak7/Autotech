import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { query } from '@angular/animations';

@Component({
  selector: 'app-otp-verification',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.css']
})
export class OTPComponent implements OnInit {
  otp: string="";
  email:string | null =null;
  name:string | null = null;
  private apiUrl = 'http://localhost:8080/api/v1/employee';
  

  constructor(private http: HttpClient,
    private router:Router,
    private route:ActivatedRoute,
    private toastr:ToastrService
  ) { }

 

  verifyOtp() {
    this.http.post<any>(`${this.apiUrl}/verify-otp`, { otp: this.otp }).subscribe(
      response => {
        console.log('OTP verification successful');
        this.toastr.success('OTP Verification Successful','Success');
        this.router.navigate(['/about'],{queryParams:{ name:this.name}})
      },
      error => {
        console.error('Error verifying OTP:', error);
      }
    );
  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.email = params.get('email');
      this.name = params.get('name');
    });
  }
}
