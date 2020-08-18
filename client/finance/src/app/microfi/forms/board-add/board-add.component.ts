import { Component, OnInit, Inject } from '@angular/core';
import { MicrofiService } from '../../service/microfi.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Board } from 'src/app/share/model/models';
import { Router } from '@angular/router';
import { ToastService } from '../../../share/message/service/toast.service';

@Component({
  selector: 'app-board-add',
  templateUrl: './board-add.component.html',
  styleUrls: ['./board-add.component.scss'],
  providers: [MicrofiService],
})
export class BoardAddComponent implements OnInit {

  boardForm: FormGroup;
  submitted = false;
  title = 'Add Board Members';




    constructor(private router: Router, private toastMessage: ToastService,
                private fb: FormBuilder, private mfiService: MicrofiService,
                private dialogRef: MatDialogRef<BoardAddComponent>, @Inject(MAT_DIALOG_DATA)  {
          board_first_name, board_middle_name, board_last_name,
          board_email, board_citizenship, board_position,
          board_avatar, board_phone_number
            }: Board
          ) {

        this.boardForm = fb.group({
          board_first_name: [board_first_name, Validators.required],
          board_middle_name: [board_middle_name],
          board_last_name: [board_last_name, Validators.required],
          board_email: [board_email, Validators.email], // url validators
          board_phone_number: [board_phone_number],
          board_citizenship: [board_citizenship, Validators.required],
          board_position: [board_position, Validators.required],
          board_avatar: [board_avatar],
        });
    }

    ngOnInit(): void {
    }

    // convenience getter for easy access to form fields
    get f(): any{ return this.boardForm.controls; }

    saveBoard(): void {
        this.submitted = true;

        // stop here if form is invalid
        if (this.boardForm.invalid) {
            return;
        }
        if (this.boardForm.valid){
          this.mfiService.registerMfiBoard(this.boardForm.value).subscribe(resp => {
            this.toastMessage.showSuccess(
              'Institution board member added successfully',
              'Institution panel'
            );
            this.dialogRef.close();
            this.router.navigate(['/microfi/home/']);
          }, error => {
            this.toastMessage.showError(
              'Failed to add board member, try again',
              'Institution panel'
            );
          });
      }
    }

    close(): void {
      this.dialogRef.close();
    }
}
