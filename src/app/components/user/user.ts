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
  showToaster: boolean = false;
  isOpened:boolean = false;

  constructor(
    private authService: AuthService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) { }

  getContent() {
    this.result = 'Loading content...';
    this.isOpened = true;
    this.authService.getContents().subscribe({
      next: (data) => {
        this.contents = data;
        this.result = '';
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.handleError(err, 'getContent');
      }
    });
  }

  addContent() {
    if (!this.contentInput.trim()) return;

    this.result = 'Adding content...';
    this.authService.addContent(this.contentInput).subscribe({
      next: (data) => {
        if(this.isOpened)
          this.contents = data;
        this.contentInput = '';
        this.result = 'Content added successfully.';
        this.showToaster = true;
        this.cdr.detectChanges();
        setTimeout(() => {
          this.showToaster = false;
          this.cdr.detectChanges();
        }, 3000);
      },
      error: (err) => {
        this.handleError(err, 'addContent');
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
        this.handleError(err, 'getUsers');
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  private handleError(err: any, context: string = '') {
    if (err.status === 403) {
      if (context === 'getContent') {
        this.result = 'Access denied: Only admins can access this data.';
      } else if (context === 'addContent') {
        this.result = 'Access denied: You are not authorized to add users.';
      } else if (context === 'getUsers') {
        this.result = 'Access denied: Only admins can access this data.';
      } else {
        this.result = 'Access denied: You do not have permission.';
      }
    } else if (err.status === 401) {
      if (context === 'getContent') {
        this.result = 'Unauthorized: Please log in to view users.';
      } else if (context === 'addContent') {
        this.result = 'Unauthorized: Please log in to add users.';
      } else if (context === 'getUsers') {
        this.result = 'Access denied: You are not authorized to add Content.';
      } else {
        this.result = 'Unauthorized: Please log in.';
      }
    } else {
      this.result = 'Error: ' + (err?.error || err.message || 'Unknown error');
    }
    this.cdr.detectChanges();
  }
}
