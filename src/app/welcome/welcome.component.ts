import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from '../Services/login.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-about',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  name: string="";

  constructor(private route: ActivatedRoute,
    private loginService: LoginService, // Inject LoginService
    private toastr: ToastrService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.name = params['name'];
    });
  }
  logout(): void {
    this.loginService.logout();
    this.toastr.clear(); // Clear any existing toasts
    this.toastr.success('Logout successful', 'Success');
    this.router.navigate(['\login'])
  }
}
