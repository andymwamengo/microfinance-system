import { Component, OnInit } from '@angular/core';
import { UserFeedback } from 'src/app/share/model/models';
import { UserService } from 'src/app/share/user/service/user.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss'],
  providers: [UserService],
})
export class ReviewComponent implements OnInit {
  userFeedback: UserFeedback[];
  // Pagination
  page = 1;
  total: number;
  loading = false;
  errorMessage = '';

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    // Find all user comments
    this.getUserFeedback();
  }

  /* Find all user feedback list*/
  getUserFeedback(): void {
    this.userService.getUserFeedback().subscribe(
      (resp: UserFeedback[]) => {
        this.userFeedback = resp;
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }
}
