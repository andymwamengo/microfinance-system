import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Title } from '@angular/platform-browser';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { AuthService } from '../share/security/service/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [AuthService],
})
export class AdminComponent implements OnInit {
  @ViewChild('sidenav') sidenav: MatSidenav;
  isExpanded = true;
  isShowing = false;
  showSubmenuThree = false;
  errorMessage = '';

  mouseEnter(): void {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseLeave(): void {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }
  constructor(
    private titleService: Title,
    private router: Router,
    private authService: AuthService,
    private activatedRoute: ActivatedRoute
  ) {
    /** Keep user logged in page refresh */
    if (this.authService.currentUserValue !== null) {
      if (this.authService.currentUserValue.is_superuser === true) {
        router.navigate(['/admin/home/']);
      } else {
        router.navigate(['/microfi/home/']);
      }
    }
  }

  ngOnInit(): void {
    const appTitle = this.titleService.getTitle();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          const child = this.activatedRoute.firstChild;
          if (child.snapshot.data.title) {
            return child.snapshot.data.title;
          }
          return appTitle;
        })
      )
      .subscribe((ttl: string) => {
        this.titleService.setTitle(ttl);
      });
  }

  logout(): void {
    this.authService.logout().subscribe(resp => {
      this.router.navigate(['/auth/login', resp]);
    }, error => {
      this.errorMessage = error;
    });
  }
}
