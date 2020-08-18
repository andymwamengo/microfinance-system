import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { UserFeedbackComponent } from '../../user/user-feedback/user-feedback.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {
  title = 'User Feedback Section';

  copyright: number = new Date().getFullYear();
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

  // Admin Feedback dialog component
  openUserFeedbackDialog(): any {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '600px';
    dialogConfig.height = '600px';

    dialogConfig.data = {
      title: 'Add User Feedback',
    };
    this.dialog.open(UserFeedbackComponent, dialogConfig);
  }
}
