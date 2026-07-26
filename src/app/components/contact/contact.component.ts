import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  name = '';
  email = '';
  message = '';
  submitted = false;

  onSubmit(): void {
    if (!this.name || !this.email || !this.message) {
      return;
    }
    // Hook this up to your backend/API endpoint.
    this.submitted = true;
    this.name = '';
    this.email = '';
    this.message = '';
  }
}
