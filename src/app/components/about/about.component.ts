import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface AboutFeature {
  icon: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly features: AboutFeature[] = [
    {
      icon: 'shield',
      title: 'Secure Banking',
      description:
        'Encrypted authentication and account safeguards protect every transaction you make.',
    },
    {
      icon: 'bolt',
      title: 'Fast & Digital',
      description:
        'Manage accounts, transfers and loans instantly from a single, streamlined dashboard.',
    },
    {
      icon: 'headset_mic',
      title: 'Dedicated Support',
      description:
        'Our team is on hand to help you with account queries, transfers and loan applications.',
    },
  ];
}
