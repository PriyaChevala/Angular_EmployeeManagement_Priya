
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ChangePasswordDialogComponent } from '../change-password-dialog/change-password-dialog.component';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  standalone: true,  // Standalone component flag
  imports: [ CommonModule, ReactiveFormsModule]  
})
export class SettingsComponent {
  isAdmin: boolean = true; // Change this based on user role
  isTwoFactorEnabled: boolean = false;
  isBenefitsModalOpen: boolean = false;
  isPasswordPolicyModalOpen: boolean = false;
  isPrivacySettingsModalOpen: boolean = false;
  isAuditLogsModalOpen: boolean = false;
  isEmailPreferencesOpen = false;
  emailPreferencesForm: FormGroup;

  constructor(private fb: FormBuilder, private dialog: MatDialog) {
    this.emailPreferencesForm = this.fb.group({
      promotionalEmails: [true], // Default values
      transactionalEmails: [true],
      newsletterEmails: [false]
    });
  }

  openEmailPreferencesModal(): void {
    this.isEmailPreferencesOpen = true;
  }

  closeEmailPreferencesModal(): void {
    this.isEmailPreferencesOpen = false;
  }

  savePreferences(): void {
    if (this.emailPreferencesForm.valid) {
      const preferences = this.emailPreferencesForm.value;
      console.log('Email Preferences Saved:', preferences);
      // Implement logic to send preferences to a backend server here
      alert('Email preferences updated successfully!');
      this.closeEmailPreferencesModal();
    }
  }

  // // Simulated actions for settings
  // constructor(private fb: FormBuilder) {
  //   this.passwordForm = this.fb.group(
  //     {
  //       currentPassword: ['', Validators.required],
  //       newPassword: ['', [Validators.required, Validators.minLength(6)]],
  //       confirmPassword: ['', Validators.required]
  //     },
  //     { validators: this.passwordsMatchValidator }
  //   );
  // }

  // // Open the Change Password Modal
  // openChangePasswordModal(): void {
  //   this.isPasswordModalOpen = true;
  // }

  // // Close the Modal
  // closeChangePasswordModal(): void {
  //   this.isPasswordModalOpen = false;
  //   this.passwordForm.reset();
  // }

  // // Validator to Check if Passwords Match
  // passwordsMatchValidator(form: FormGroup) {
  //   const newPassword = form.get('newPassword')?.value;
  //   const confirmPassword = form.get('confirmPassword')?.value;
  //   return newPassword === confirmPassword ? null : { passwordMismatch: true };
  // }

  // // Change Password Action
  // changePassword(): void {
  //   if (this.passwordForm.valid) {
  //     const { currentPassword, newPassword } = this.passwordForm.value;

  //     console.log('Current Password:', currentPassword);
  //     console.log('New Password:', newPassword);

  //     // Simulate API call for password update
  //     // Replace with actual service logic
  //     alert('Password updated successfully!');
  //     this.closeChangePasswordModal();
  //   }
  // }
  

  changePassword() {
    this.dialog.open(ChangePasswordDialogComponent, {
      width: '500px'
    });
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

  // Privacy Settings Modal
  openPrivacySettingsModal() {
    this.isPrivacySettingsModalOpen = true;
  }

  closePrivacySettingsModal() {
    this.isPrivacySettingsModalOpen = false;
  }

  // Audit Logs Modal
  openAuditLogsModal() {
    this.isAuditLogsModalOpen = true;
  }

  closeAuditLogsModal() {
    this.isAuditLogsModalOpen = false;
  }

  // Open and close the Password Policy modal
  openPasswordPolicyModal() {
    this.isPasswordPolicyModalOpen = true;
  }

  closePasswordPolicyModal() {
    this.isPasswordPolicyModalOpen = false;
  }

  
  openBenefitsModal() {
    this.isBenefitsModalOpen = true;
  }

  closeBenefitsModal() {
    this.isBenefitsModalOpen = false;
  }

  
}
