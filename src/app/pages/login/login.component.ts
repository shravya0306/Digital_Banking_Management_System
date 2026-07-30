import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  loginForm = this.fb.group({
    customerId: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);

  get customerId() {
    return this.loginForm.get('customerId')!;
  }

  get password() {
    return this.loginForm.get('password')!;
  }

  onSubmit(): void {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    this.isSubmitting.set(true);

    // The existing "Customer ID" field accepts either a registered
    // email address or mobile number, matching the backend's login rule.
    const identifier = this.loginForm.value.customerId!;
    const password = this.loginForm.value.password!;

    this.authService.login({ identifier, password }).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);
        if (response.success) {
          sessionStorage.setItem('customer_id', String(response.customer_id));
          sessionStorage.setItem('full_name', response.full_name ?? '');
          if (response.account_number) {
            sessionStorage.setItem('account_number', response.account_number);
          }
          this.router.navigate(['/customer-dashboard']);
        } else {
          this.errorMessage.set(response.message ?? 'Invalid credentials.');
        }
      },
      error: (err) => {
        this.isSubmitting.set(false);
        this.errorMessage.set(
          err?.error?.message ?? 'Invalid credentials.'
        );
      },
    });
  }
}