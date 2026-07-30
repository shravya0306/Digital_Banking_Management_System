import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService, CustomerProfile } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnInit {
  private readonly authService = inject(AuthService);

  profile = signal<CustomerProfile | null>(null);
  errorMessage = signal<string | null>(null);

  ngOnInit(): void {
    const customerId = sessionStorage.getItem('customer_id');
    if (!customerId) {
      this.errorMessage.set('You must be logged in to view your profile.');
      return;
    }

    this.authService.getProfile(customerId).subscribe({
      next: (response) => {
        if (response.success && response.profile) {
          this.profile.set(response.profile);
        } else {
          this.errorMessage.set(response.message ?? 'Unable to load profile.');
        }
      },
      error: () => {
        this.errorMessage.set('Unable to load profile. Please try again later.');
      },
    });
  }
}