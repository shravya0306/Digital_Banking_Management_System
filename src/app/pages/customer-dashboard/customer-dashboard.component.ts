import { Component, OnInit, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-customer-dashboard',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.scss',
})
export class CustomerDashboardComponent implements OnInit {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  customerName = signal<string>('');
  accountNumber = signal<string>('');
  accountType = signal<string>('');
  balance = signal<number | null>(null);

  ngOnInit(): void {
    this.customerName.set(sessionStorage.getItem('full_name') ?? '');

    const customerId = sessionStorage.getItem('customer_id');
    if (!customerId) {
      return;
    }

    this.authService.getDashboard(customerId).subscribe({
      next: (response) => {
        if (response.success) {
          this.customerName.set(response.full_name ?? this.customerName());
          this.accountNumber.set(response.account_number ?? '');
          this.accountType.set(response.account_type ?? '');
          this.balance.set(response.balance ?? null);
        }
      },
    });
  }

  logout(): void {
    sessionStorage.clear();
    this.router.navigate(['/login']);
  }
}