import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.scss'
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', Validators.required],
    });
  }

  onLogin() {
    console.log("Login clicked");
    this.auth.login(this.loginForm.value).subscribe({
      next: (res: any) => {
        console.log('Login response:', res.token);
        localStorage.setItem('token', res.token);
        this.router.navigate(['/user']);
      },
      error: () => {
        this.errorMessage = 'Invalid credentials';
      },
    });
  }
}
