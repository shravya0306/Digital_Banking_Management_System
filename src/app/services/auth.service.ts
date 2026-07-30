import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface RegisterPayload {
  full_name: string;
  email: string;
  mobile: string;
  aadhaar: string;
  pan: string;
  address: string;
  account_type: string;
  password: string;
}

export interface RegisterResponse {
  success: boolean;
  message: string;
}

export interface LoginPayload {
  identifier: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  customer_id?: number;
  full_name?: string;
  account_number?: string | null;
  message?: string;
}

export interface DashboardResponse {
  success: boolean;
  full_name?: string;
  account_number?: string;
  account_type?: string;
  balance?: number;
  message?: string;
}

export interface CustomerProfile {
  customer_id: number;
  full_name: string;
  email: string;
  mobile: string;
  aadhaar: string;
  pan: string;
  address: string;
  account_type: string;
  account_number: string;
  ifsc_code: string;
  branch: string;
}

export interface ProfileResponse {
  success: boolean;
  profile?: CustomerProfile;
  message?: string;
}

export interface TransferPayload {
  customer_id: number;
  receiver_account: string;
  amount: number;
  remarks?: string;
}

export interface TransferResponse {
  success: boolean;
  message: string;
}

export interface TransactionRecord {
  transaction_id: number;
  sender_account: string;
  receiver_account: string;
  amount: number;
  remarks: string;
  status: string;
  transaction_date: string;
  direction: 'CREDIT' | 'DEBIT';
}

export interface TransactionsResponse {
  success: boolean;
  transactions?: TransactionRecord[];
  message?: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = 'http://localhost:5000';

  register(payload: RegisterPayload): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(`${this.baseUrl}/register`, payload);
  }

  login(payload: LoginPayload): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/login`, payload);
  }

  getDashboard(customerId: string | number): Observable<DashboardResponse> {
    return this.http.get<DashboardResponse>(`${this.baseUrl}/customer/dashboard`, {
      params: { customer_id: String(customerId) },
    });
  }

  getProfile(customerId: string | number): Observable<ProfileResponse> {
    return this.http.get<ProfileResponse>(`${this.baseUrl}/customer/profile`, {
      params: { customer_id: String(customerId) },
    });
  }

  transferMoney(payload: TransferPayload): Observable<TransferResponse> {
    return this.http.post<TransferResponse>(`${this.baseUrl}/transfer`, payload);
  }

  getTransactions(customerId: string | number): Observable<TransactionsResponse> {
    return this.http.get<TransactionsResponse>(`${this.baseUrl}/transactions`, {
      params: { customer_id: String(customerId) },
    });
  }
}
