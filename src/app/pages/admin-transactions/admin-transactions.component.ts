import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AuthService,
  AdminTransaction,
} from '../../services/auth.service';

@Component({
  selector: 'app-admin-transactions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-transactions.component.html',
  styleUrl: './admin-transactions.component.scss',
})
export class AdminTransactionsComponent implements OnInit {
  private readonly authService = inject(AuthService);

  transactions = signal<AdminTransaction[]>([]);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    this.authService.getAllTransactions().subscribe({
      next: (response) => {
        if (response.success && response.transactions) {
          this.transactions.set(response.transactions);
        } else {
          this.errorMessage.set(response.message ?? 'Unable to load transactions.');
        }
      },
      error: () => {
        this.errorMessage.set('Unable to load transactions.');
      },
    });
  }
}