import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UserService } from '../user.service';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,  // Standalone component flag
  imports: [FormsModule, CommonModule ] , // Import FormsModule here
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  fullName: string = 'Priya'; // Example default values
  username: string | null = '';
  email: string  = '';
  phone: string = '1234567890';
  bio: string = '';
  dob: string = '';
  location: string = '';
  profilePictureUrl: string | ArrayBuffer | null = null;
  profile: { username: string; email: string } | null = null;
  userProfile: any = {};
  constructor(private userService: UserService, private http: HttpClient, public authService: AuthService) {}
  isEditMode: boolean = true; // Start in edit mode  
  
  editProfile() {
    this.isEditMode = true; // Switch back to edit mode for editing
  }
  
  ngOnInit(): void {
    this.username = this.authService.getUsername();
    console.log("Username" ,this.username);
    this.loadProfile();
  }
  loadProfile() {
    const username = localStorage.getItem('username');
    if (username) {
      const savedBio = localStorage.getItem(`${username}_bio`);
      const savedEmail = localStorage.getItem(`${username}_email`);
      const savedDob = localStorage.getItem(`${username}_dob`);
      const savedLocation = localStorage.getItem(`${username}_location`);
  
      if (savedBio && savedEmail && savedDob && savedLocation) {
        this.bio = savedBio;
        this.email = savedEmail;
        this.dob = savedDob;
        this.location = savedLocation;
      }
    }
    const savedEditMode = localStorage.getItem('isEditMode');
    this.isEditMode = savedEditMode === 'true';
  }

  // loadUserProfile() {
  //   const token = localStorage.getItem('token'); // Assuming you're using local storage for tokens
  //   this.http
  //     .get<{ username: string; email: string }>('http://localhost:3000/api/user/profile', {
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     })
  //     .subscribe(
  //       (profile) => {
  //         console.log('User profile:', profile);
  //         this.profile = profile; // Assign the fetched profile to the property
  //       },
  //       (error) => {
  //         console.error('Error fetching user profile:', error);
  //       }
  //     );
  // }
  
  getUsername(): string | null {
    return localStorage.getItem('username');
  }
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.profilePictureUrl = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  saveProfile(): void {
    // Logic to save the updated profile details
    const username = localStorage.getItem('username'); // Assuming the username is saved in localStorage after login
  if (username) {
    localStorage.setItem(`${username}_bio`, this.bio);
    localStorage.setItem(`${username}_email`, this.email);
    localStorage.setItem(`${username}_dob`, this.dob);
    localStorage.setItem(`${username}_location`, this.location);
  }
    // localStorage.setItem('bio', this.bio);
    // localStorage.setItem('email', this.email);
    // localStorage.setItem('dob', this.dob);
    // localStorage.setItem('location', this.location);
    this.isEditMode = false;
    console.log('Profile saved:', {
      fullName: this.fullName,
      bio: this.bio,
      dob: this.dob,
      location: this.location,
    });
    alert('Profile updated successfully!');
  }
}
