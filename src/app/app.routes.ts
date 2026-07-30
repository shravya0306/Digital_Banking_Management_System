import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CustomerDashboardComponent } from './pages/customer-dashboard/customer-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TransferMoneyComponent } from './pages/transfer-money/transfer-money.component';
import { TransactionHistoryComponent } from './pages/transaction-history/transaction-history.component';

export const routes: Routes = [
  { path: '', component: LandingComponent, title: 'TrustBank | Secure Banking. Simple Banking.' },
  { path: 'login', component: LoginComponent, title: 'Login | TrustBank' },
  { path: 'register', component: RegisterComponent, title: 'Register | TrustBank' },
  { path: 'customer-dashboard', component: CustomerDashboardComponent, title: 'Dashboard | TrustBank' },
  { path: 'profile', component: ProfileComponent, title: 'My Profile | TrustBank' },
  { path: 'transfer-money', component: TransferMoneyComponent, title: 'Transfer Money | TrustBank' },
  { path: 'transaction-history', component: TransactionHistoryComponent, title: 'Transaction History | TrustBank' },
  { path: '**', redirectTo: '' },
];