import { Routes } from '@angular/router';
import { LandingComponent } from './pages/landing/landing.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { CustomerDashboardComponent } from './pages/customer-dashboard/customer-dashboard.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { TransferMoneyComponent } from './pages/transfer-money/transfer-money.component';
import { TransactionHistoryComponent } from './pages/transaction-history/transaction-history.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { AdminCustomersComponent } from './pages/admin-customers/admin-customers.component';
import { AdminTransactionsComponent } from './pages/admin-transactions/admin-transactions.component';

export const routes: Routes = [
  { path: '', component: LandingComponent, title: 'TrustBank | Secure Banking. Simple Banking.' },
  { path: 'login', component: LoginComponent, title: 'Login | TrustBank' },
  { path: 'register', component: RegisterComponent, title: 'Register | TrustBank' },
  { path: 'customer-dashboard', component: CustomerDashboardComponent, title: 'Dashboard | TrustBank' },
  { path: 'profile', component: ProfileComponent, title: 'My Profile | TrustBank' },
  { path: 'transfer-money', component: TransferMoneyComponent, title: 'Transfer Money | TrustBank' },
  { path: 'transaction-history', component: TransactionHistoryComponent, title: 'Transaction History | TrustBank' },
  { path: 'admin-login', component: AdminLoginComponent, title: 'Admin Login | TrustBank' },
  { path: 'admin-dashboard', component: AdminDashboardComponent, title: 'Admin Dashboard | TrustBank' },
  { path: 'admin-customers', component: AdminCustomersComponent, title: 'Customers | Admin' },
  { path: 'admin-transactions', component: AdminTransactionsComponent, title: 'Transactions | Admin' },
  { path: '**', redirectTo: '' },
];