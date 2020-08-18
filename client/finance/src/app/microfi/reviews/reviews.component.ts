import { Component, OnInit } from '@angular/core';
import { AdminFeedback } from 'src/app/share/model/models';
import { AdminService } from 'src/app/admin/service/admin.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  feedbacks: AdminFeedback[];
  loading = false;
  // Ngx pagination
  p = 1;
  total: number;
  id: number;
  errorMessage = '';

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    // Find all admin feedback
    this.loading = true;
    this.adminService
      .getAdminFeedback()
      .pipe(first())
      .subscribe(
        (resf) => {
          this.loading = false;
          this.feedbacks = resf;
          this.total = this.feedbacks.length;
        },
        (error) => {
          this.errorMessage = error;
        }
      );
  }
}
