import { Component, Inject } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ChangePasswordService } from '../change-password.service';
import { ToastrService } from 'ngx-toastr';
import axios from 'axios';


@Component({
  selector: 'app-change-password-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatButtonModule, MatInputModule, MatFormFieldModule, MatDialogModule],
  templateUrl: './change-password-dialog.component.html',
  styleUrl: './change-password-dialog.component.css'
})
export class ChangePasswordDialogComponent {
  // oldPassword: string = '';
  // newPassword: string = '';
  // confirmNewPassword: string = '';
  passwordForm: FormGroup;
  isLoading: boolean = false;
  newPassword: any;
  confirmNewPassword: any;
  oldPassword: any;
  // passwordForm: FormGroup;

  // constructor(
  //   private fb: FormBuilder,
  //   private dialogRef: MatDialogRef<ChangePasswordDialogComponent>
  // ) {
  //   this.passwordForm = this.fb.group(
  //     {
  //       currentPassword: ['', [Validators.required]],
  //       newPassword: ['', [Validators.required, Validators.minLength(3)]],
  //       confirmPassword: ['', [Validators.required]]
  //     },
  //     { validators: this.passwordMatchValidator }
  //   );
  // }

  // passwordMatchValidator(formGroup: FormGroup) {
  //   const newPassword = formGroup.get('newPassword')?.value;
  //   const confirmPassword = formGroup.get('confirmPassword')?.value;
  //   return newPassword === confirmPassword ? null : { passwordMismatch: true };
  // }

  // onSubmit() {
  //   if (this.passwordForm.valid) {
  //     console.log('Password updated:', this.passwordForm.value);
  //     alert('Password successfully updated!');
  //     this.dialogRef.close(true);
  //   }
  // }

  // onCancel() {
  //   this.dialogRef.close(false);
  // }


  constructor(
    private dialogRef: MatDialogRef<ChangePasswordDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private changePasswordService: ChangePasswordService,
    private toastr: ToastrService
  ) {
    this.passwordForm = this.fb.group(
      {
        currentPassword: ['', [Validators.required]],
        newPassword: ['', [Validators.required, Validators.minLength(3)]],
        confirmNewPassword: ['', [Validators.required]]
      },
      { validators: this.passwordMatchValidator }
    );
  }
  passwordMatchValidator(form: FormGroup): null | { mismatch: boolean } {
    const newPassword = form.get('newPassword')?.value;
    const confirmNewPassword = form.get('confirmNewPassword')?.value;
    if (newPassword !== confirmNewPassword) {
      return { mismatch: true };
    }
    return null;
  }


  // Method to close the dialog
  closeDialog(): void {
    this.dialogRef.close();
  }

  // Method to submit the form for changing the password
  onSubmit(): void {
    if (this.passwordForm.invalid) {
      return; // If form is invalid, stop the submission
    }

    if (this.newPassword !== this.confirmNewPassword) {
      this.toastr.error('New password and confirm password do not match', 'Error');
      return;
    }

    this.isLoading = true;
    const { oldPassword, newPassword } = this.passwordForm.value;

    this.changePasswordService.changePassword(oldPassword, newPassword).subscribe(
      (response) => {
        this.isLoading = false;
        this.toastr.success('Password changed successfully!', 'Success');
        this.dialogRef.close(true);  // Pass true to indicate success
      },
      (error) => {
        this.isLoading = false;
        this.toastr.error('Failed to change password. Please try again.', 'Error');
        alert('Error while changing password')
      }
    );
  }

  onCancel() {
    this.dialogRef.close(false);
  }
}
