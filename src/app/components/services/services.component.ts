import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ServiceItem {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './services.component.html',
  styleUrl: './services.component.scss',
})
export class ServicesComponent {
  readonly services: ServiceItem[] = [
    {
      icon: 'savings',
      title: 'Savings Account',
      description: 'Open a savings account and track your balance and interest in one place.',
    },
    {
      icon: 'account_balance',
      title: 'Current Account',
      description: 'A everyday account for regular transactions and account management.',
    },
    {
      icon: 'payments',
      title: 'Money Transfer',
      description: 'Transfer funds between your accounts or to other TrustBank customers.',
    },
    {
      icon: 'history',
      title: 'Transaction History',
      description: 'View a complete, organized record of all your past transactions.',
    },
    {
      icon: 'request_quote',
      title: 'Account Management',
      description: 'Manage your banking profile, account information, and account type securely from your dashboard.',
    },
  ];
}
