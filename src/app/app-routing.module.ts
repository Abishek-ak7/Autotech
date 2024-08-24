// app-routing.module.ts
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { RegisterComponent } from './register/register.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { OTPComponent } from './otp/otp.component';
import { ResetComponent } from './reset/reset.component';
import { NewpassComponent } from './newpass/newpass.component';

const routes: Routes = [
  { path: 'login', component:LoginComponent  },
  { path: '', component:RegisterComponent },
  {path:'about',component:WelcomeComponent},
  {path:'otpverify',component:OTPComponent},
  {path:'reset',component:ResetComponent},
  {path:'newpass',component:NewpassComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }