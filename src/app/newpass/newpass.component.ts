import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-newpass',
  templateUrl: './newpass.component.html',
  styleUrls: ['./newpass.component.css']
})
export class NewpassComponent {
  pass:string="";
  token: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
    });
  }

  resetPassword() {
    const payload = {
      token: this.token,
      newPassword: this.pass
    };

    this.http.post('http://localhost:8080/api/v1/employee/update-password', payload).subscribe(
      (response: any) => {
        alert('Password reset successfully');
        this.router.navigate(['/login']); // Redirect to login page
      },
      (error: any) => {
        alert('Password reset password Successful ');
        this.router.navigate(['/login']);
      }
    );
  }

}
