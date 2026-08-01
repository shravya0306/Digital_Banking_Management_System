import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService, AdminCustomer } from '../../services/auth.service';

@Component({
  selector: 'app-admin-customers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-customers.component.html',
  styleUrl: './admin-customers.component.scss',
})
export class AdminCustomersComponent implements OnInit {
  private readonly authService = inject(AuthService);

  customers = signal<AdminCustomer[]>([]);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.authService.getAllCustomers().subscribe({
      next: (response) => {
        if (response.success && response.customers) {
          this.customers.set(response.customers);
        } else {
          this.errorMessage.set(response.message ?? 'Unable to load customers.');
        }
      },
      error: () => {
        this.errorMessage.set('Unable to load customers.');
      },
    });
  }
}