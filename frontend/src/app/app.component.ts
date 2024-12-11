import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';  // Import RouterModule
import { HeaderComponent } from './header/header.component';  // Import HeaderComponent

@Component({
  selector: 'app-root',
  standalone: true,  // Mark this as a standalone component
  imports: [RouterModule, HeaderComponent],  // Import RouterModule and other components here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'employee-app';
}
