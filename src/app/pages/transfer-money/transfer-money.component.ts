import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-transfer-money',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './transfer-money.component.html',
  styleUrl: './transfer-money.component.scss',
})
export class TransferMoneyComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);
  successMessage = signal<string | null>(null);

  transferForm = this.fb.group({
    receiverAccount: ['', [Validators.required, Validators.pattern(/^[0-9]{6,20}$/)]],
    amount: ['', [Validators.required, Validators.min(1)]],
    remarks: [''],
  });

  field(name: string) {
    return this.transferForm.get(name)!;
  }

  onSubmit(): void {
    if (this.transferForm.invalid) {
      this.transferForm.markAllAsTouched();
      return;
    }

    const customerId = sessionStorage.getItem('customer_id');
    if (!customerId) {
      this.errorMessage.set('You must be logged in to transfer money.');
      return;
    }

    this.errorMessage.set(null);
    this.successMessage.set(null);
    this.isSubmitting.set(true);

    const v = this.transferForm.value;

    this.authService
      .transferMoney({
        customer_id: Number(customerId),
        receiver_account: v.receiverAccount!,
        amount: Number(v.amount),
        remarks: v.remarks ?? '',
      })
      .subscribe({
        next: (response) => {
          this.isSubmitting.set(false);
          if (response.success) {
            this.successMessage.set(response.message ?? 'Transfer successful.');
            this.transferForm.reset();
          } else {
            this.errorMessage.set(response.message ?? 'Transfer failed.');
          }
        },
        error: (err) => {
          this.isSubmitting.set(false);
          this.errorMessage.set(err?.error?.message ?? 'Transfer failed. Please try again.');
        },
      });
  }
}