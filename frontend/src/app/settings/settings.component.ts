
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true,  // Standalone component flag
  imports: [ CommonModule]  
})
export class SettingsComponent {
  isAdmin: boolean = true; // Change this based on user role
  isTwoFactorEnabled: boolean = false;

  // Simulated actions for settings
  changePassword() {
    alert('Change Password Clicked');
  }

  updateEmailPreferences() {
    alert('Email Preferences Clicked');
  }

  enableTwoFactorAuth() {
    this.isTwoFactorEnabled = !this.isTwoFactorEnabled;
    alert(this.isTwoFactorEnabled ? 'Two-Factor Authentication Enabled' : 'Two-Factor Authentication Disabled');
  }

  manageRoles() {
    alert('Manage Roles Clicked');
  }

  managePermissions() {
    alert('Manage Permissions Clicked');
  }

  assignToDepartment() {
    alert('Assign to Department Clicked');
  }

  updatePrivacySettings() {
    alert('Privacy Settings Updated');
  }

  viewAuditLogs() {
    alert('Audit Logs Viewed');
  }

  setPasswordPolicy() {
    alert('Password Policy Updated');
  }

  viewBenefits() {
    alert('Employee Benefits Viewed');
  }

  
}
