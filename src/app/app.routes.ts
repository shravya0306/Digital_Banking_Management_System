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
  { path: '', component: LandingComponent, title: 'Velora Bank | Secure Banking. Simple Banking.' },
  { path: 'login', component: LoginComponent, title: 'Login | Velora Bank' },
  { path: 'register', component: RegisterComponent, title: 'Register | Velora Bank' },
  { path: 'customer-dashboard', component: CustomerDashboardComponent, title: 'Dashboard | Velora Bank' },
  { path: 'profile', component: ProfileComponent, title: 'My Profile | Velora Bank' },
  { path: 'transfer-money', component: TransferMoneyComponent, title: 'Transfer Money | Velora Bank' },
  { path: 'transaction-history', component: TransactionHistoryComponent, title: 'Transaction History | Velora Bank' },
  { path: 'admin-login', component: AdminLoginComponent, title: 'Admin Login | Velora Bank' },
  { path: 'admin-dashboard', component: AdminDashboardComponent, title: 'Admin Dashboard | Velora Bank' },
  { path: 'admin-customers', component: AdminCustomersComponent, title: 'Customers | Admin' },
  { path: 'admin-transactions', component: AdminTransactionsComponent, title: 'Transactions | Admin' },
  { path: '**', redirectTo: '' },
];