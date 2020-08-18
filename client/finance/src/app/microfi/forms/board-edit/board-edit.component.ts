import { Component, OnInit, Inject } from '@angular/core';
import { ToastService } from '../../../share/message/service/toast.service';
import { MicrofiService } from '../../service/microfi.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-board-edit',
  templateUrl: './board-edit.component.html',
  styleUrls: ['./board-edit.component.scss'],
})
export class BoardEditComponent implements OnInit {
  boardUpdateForm: FormGroup;
  submitted = false;
  title = 'Edit Board';

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private toastMessage: ToastService,
    public mfiService: MicrofiService,
    public dialogRef: MatDialogRef<BoardEditComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.boardUpdateForm = fb.group({
      board_first_name: ['', Validators.required],
      board_middle_name: [''],
      board_last_name: ['', Validators.required],
      board_email: [''], // url validators
      board_phone_number: [''],
      board_citizenship: ['', Validators.required],
      board_position: ['', Validators.required],
      board_avatar: [''],
    });
  }

  ngOnInit() {
    this.boardUpdateForm.patchValue({
      board_first_name: this.data.board_first_name,
      board_middle_name: this.data.board_middle_name,
      board_last_name: this.data.board_last_name,
      board_email: this.data.board_email,
      board_phone_number: this.data.board_phone_number,
      board_citizenship: this.data.board_citizenship,
      board_position: this.data.board_position,
      board_avatar: this.data.board_avatar,
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.boardUpdateForm.controls;
  }

  updateBoard() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.boardUpdateForm.invalid) {
      return;
    }
    if (this.boardUpdateForm.valid) {
      this.mfiService
        .updateMfiBoard(this.data.id, this.boardUpdateForm.value)
        .subscribe(
          (resp) => {
            this.data = resp;
            this.toastMessage.showSuccess(
              'Board member updated successfully',
              'Institution panel'
            );
            this.router.navigate(['/microfi/home/']);
            this.dialogRef.close();
            console.log(this.data);
          },
          (error) => {
            console.log(error);
            this.toastMessage.showError(
              'Failed to update board member, try again',
              'Institution panel'
            );
          }
        );
    }
  }
}
