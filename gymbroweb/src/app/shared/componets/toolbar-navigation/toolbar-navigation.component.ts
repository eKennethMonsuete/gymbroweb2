import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-toolbar-navigation',
  templateUrl: './toolbar-navigation.component.html',
  styleUrls: [],
})
export class ToolbarNavigationComponent implements OnInit {
  sid: string | null = null;
  role: string | null = null;
  name: string | null = null;
  constructor(private router: Router, private authService: AuthService) {}
  ngOnInit(): void {
    const tokenData = this.authService.decodeToken();
    if (tokenData) {
      this.sid = tokenData.sid;
      this.role = tokenData.role;
      this.name = tokenData.name;
    }
    console.log('dados da tool bar', this.sid, this.role);
  }

  logout() {
    this.authService.logout();
    console.log('é para ter excluíto o token do local storage e do session');
    this.router.navigate(['']);
  }
}
