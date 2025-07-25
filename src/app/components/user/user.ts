import { Component, ChangeDetectorRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user.html',
  styleUrls: ['./user.scss']
})
export class UserComponent {
  result: string = '';
  contentInput: string = '';
  contents: string[] = [];
  users: any[] = [];

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  getContent() {
    this.result = 'Loading content...';
    this.authService.getContents().subscribe({
      next: (data) => {
        this.contents = data;
        this.result = '';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  addContent() {
    if (!this.contentInput.trim()) return;

    this.result = 'Adding content...';
    this.authService.addContent(this.contentInput).subscribe({
      next: (data) => {
        this.contents = data;
        this.contentInput = '';
        this.result = 'Content added successfully.';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  getUsers() {
    this.result = 'Loading users...';
    this.authService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.result = 'Users loaded.';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.handleError(err);
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  private handleError(err: any) {
    if (err.status === 403) {
      this.result = 'Access denied: You do not have permission.';
    } else if (err.status === 401) {
      this.result = 'Unauthorized: Please log in.';
    } else {
      this.result = 'Error: ' + (err?.error || err.message || 'Unknown error');
    }
    this.cdr.detectChanges();
  }
}
