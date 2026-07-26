import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

interface FaqItem {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
})
export class FaqComponent {
  openIndex = signal<number | null>(0);

  readonly faqs: FaqItem[] = [
    {
      question: 'How do I register?',
      answer:
        'Click the Register button in the navigation bar and fill in your details to create a new Velora Bank account.',
    },
    {
      question: 'How do I log in?',
      answer:
        'Click the Login button and enter your registered username/email and password to access your account.',
    },
    {
      question: 'Can I have multiple accounts?',
      answer:
        'Yes, you can hold both a Savings Account and a Current Account under the same customer profile.',
    },
    {
      question: 'How do I transfer money?',
      answer:
        'Use the Money Transfer feature from your dashboard to send funds to another account instantly.',
    },
    {
      question: 'How do I apply for a loan?',
      answer:
        'Navigate to the Loan Services section of your dashboard and submit a loan application for review.',
    },
  ];

  toggle(index: number): void {
    this.openIndex.update((current) => (current === index ? null : index));
  }
}
