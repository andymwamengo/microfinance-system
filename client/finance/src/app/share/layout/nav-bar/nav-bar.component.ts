import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Microfi } from '../../model/models';
import { AuthService } from '../../security/service/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
  providers: [AuthService]
})
export class NavBarComponent implements OnInit {

  currentUser: Microfi;
  displayNavbar: string;
  user: Microfi;

  constructor( private router: Router, public authService: AuthService) {
    // this.authService.user.subscribe(x => this.user = x);
    // this.authService.currentUser.subscribe(x => this.user);
    this.authService.currentUser.subscribe(x => this.currentUser = x);

  }

  ngOnInit() {
    this.displayNavbar = '1';
  }

  toggleNavbar() {

    if (this.displayNavbar === '0') {
        this.displayNavbar = '1';
    // alert(this.displayNavbar);
    }
    if (this.displayNavbar === '1') {
    // alert("1 - Changing to 0");
        this.displayNavbar = '0';
    } else {
        this.displayNavbar = '1';
    }
  }


  logout(){
    // this.authService.logout();
    // this.router.navigate(['/login']);
  }
}
