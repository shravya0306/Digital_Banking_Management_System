import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', component: LandingComponent, title: 'TrustBank | Secure Banking. Simple Banking.' },
  { path: 'login', component: LoginComponent, title: 'Login | TrustBank' },
  { path: 'register', component: RegisterComponent, title: 'Register | TrustBank' },
  { path: '**', redirectTo: '' },
];
