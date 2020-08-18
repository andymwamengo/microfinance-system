import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toastrMessage: ToastrService) {}

  showSuccess(message, title) {
    this.toastrMessage.success(message, title);
  }

  showError(message, title) {
    this.toastrMessage.error(message, title);
  }

  showInfo(message, title) {
    this.toastrMessage.info(message, title);
  }

  showWarning(message, title) {
    this.toastrMessage.warning(message, title);
  }
}
