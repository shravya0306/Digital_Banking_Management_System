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

  readonly accountTypes = ['Savings', 'Current'];
  readonly genders = ['Male', 'Female', 'Other'];

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
    // Not connected to a backend (Flask/SQLite) yet — UI only.
    console.log('Register form submitted', this.registerForm.value);
    this.router.navigate(['/login']);
  }
}