import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import {
  aadhaarValidator,
  mobileNumberValidator,
  panValidator,
  pincodeValidator,
  passwordsMatchValidator,
} from '../../shared/custom-validators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent {
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  private readonly authService = inject(AuthService);

  readonly accountTypes = ['Savings', 'Current'];
  readonly genders = ['Male', 'Female', 'Other'];

  private isSubmitting = false;

  registerForm = this.fb.group(
    {
      // Personal Information
      fullName: ['', [Validators.required]],
      dob: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      mobile: ['', [Validators.required, mobileNumberValidator]],
      email: ['', [Validators.required, Validators.email]],

      // Identity
      aadhaar: ['', [Validators.required, aadhaarValidator]],
      pan: ['', [Validators.required, panValidator]],

      // Address
      address: ['', [Validators.required]],
      city: ['', [Validators.required]],
      state: ['', [Validators.required]],
      pincode: ['', [Validators.required, pincodeValidator]],

      // Account Information
      accountType: ['', [Validators.required]],

      // Login Credentials
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
    },
    {
      validators: [passwordsMatchValidator('password', 'confirmPassword')],
    }
  );

  field(name: string) {
    return this.registerForm.get(name)!;
  }

  onSubmit(): void {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    if (this.isSubmitting) {
      return;
    }
    this.isSubmitting = true;

    const v = this.registerForm.value;
    const fullAddress = `${v.address}, ${v.city}, ${v.state} - ${v.pincode}`;

    this.authService
      .register({
        full_name: v.fullName!,
        email: v.email!,
        mobile: v.mobile!,
        aadhaar: v.aadhaar!,
        pan: v.pan!,
        address: fullAddress,
        account_type: v.accountType!,
        password: v.password!,
      })
      .subscribe({
        next: (response) => {
          this.isSubmitting = false;
          if (response.success) {
            this.router.navigate(['/login']);
          } else {
            alert(response.message ?? 'Registration failed.');
          }
        },
        error: (err) => {
          this.isSubmitting = false;
          alert(err?.error?.message ?? 'Registration failed. Please try again.');
        },
      });
  }
}