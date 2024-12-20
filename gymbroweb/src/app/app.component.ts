import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private router: Router) {}

  ngOnInit(): void {
    this.router.events.subscribe(() => {
      const currentRoute = this.router.url;
      this.showToolbar = !(
        currentRoute === '/' || currentRoute === '/personal/add'
      );
    });
  }
  title = 'gymbroweb';
  showToolbar: boolean = true;
}
