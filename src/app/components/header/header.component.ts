import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  currentRoute: string = '';

  constructor(private router: Router) { }

  ngOnInit(): void {
    this.currentRoute = this.cleanRoute(this.router.url);
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = this.cleanRoute(event.urlAfterRedirects);
      }
    });
  }

  private cleanRoute(url: string): string {
    return url.split('?')[0]; // removes query params like ?jobTitle=...&mode=edit
  }

  isMenuDisabled(): boolean {
    return this.currentRoute === '/sign-in';
  }

  logout() {
    this.router.navigateByUrl('/sign-in');
  }
}
