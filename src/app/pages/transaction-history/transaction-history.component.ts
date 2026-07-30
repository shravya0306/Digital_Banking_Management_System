import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService, TransactionRecord } from '../../services/auth.service';

@Component({
  selector: 'app-transaction-history',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './transaction-history.component.html',
  styleUrl: './transaction-history.component.scss',
})
export class TransactionHistoryComponent implements OnInit {
  private readonly authService = inject(AuthService);

  transactions = signal<TransactionRecord[]>([]);
  errorMessage = signal<string | null>(null);
  isLoading = signal(true);

  ngOnInit(): void {
    const customerId = sessionStorage.getItem('customer_id');
    if (!customerId) {
      this.errorMessage.set('You must be logged in to view transactions.');
      this.isLoading.set(false);
      return;
    }

    this.authService.getTransactions(customerId).subscribe({
      next: (response) => {
        this.isLoading.set(false);
        if (response.success) {
          this.transactions.set(response.transactions ?? []);
        } else {
          this.errorMessage.set(response.message ?? 'Unable to load transactions.');
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.errorMessage.set('Unable to load transactions. Please try again later.');
      },
    });
  }
}