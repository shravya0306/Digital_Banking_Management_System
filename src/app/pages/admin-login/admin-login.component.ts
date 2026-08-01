import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss',
})
export class AdminLoginComponent {
  private readonly fb = inject(FormBuilder);
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);

  adminLoginForm = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required]],
  });

  isSubmitting = signal(false);
  errorMessage = signal<string | null>(null);

  get username() {
    return this.adminLoginForm.get('username')!;
  }

  get password() {
    return this.adminLoginForm.get('password')!;
  }

  onSubmit(): void {
    if (this.adminLoginForm.invalid) {
      this.adminLoginForm.markAllAsTouched();
      return;
    }

    this.errorMessage.set(null);
    this.isSubmitting.set(true);

    const username = this.adminLoginForm.value.username!;
    const password = this.adminLoginForm.value.password!;

    this.authService.adminLogin({ username, password }).subscribe({
      next: (response) => {
        this.isSubmitting.set(false);

        if (response.success) {
          sessionStorage.setItem('admin_id', String(response.admin_id));
          sessionStorage.setItem('admin_username', response.username ?? '');

          this.router.navigate(['/admin-dashboard']);
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