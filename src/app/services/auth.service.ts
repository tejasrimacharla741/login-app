import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://localhost:44310/api';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  
  logout() {
    localStorage.removeItem('jwtToken');
    this.router.navigate(['/login']);
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/user/users`);
  }

  addContent(content: string): Observable<string[]> {
    return this.http.post<string[]>(`${this.apiUrl}/user`, { content });
  }

  getContents(): Observable<string[]> {
    return this.http.get<string[]>(`${this.apiUrl}/user`);
  }
}
