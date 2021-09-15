import { Component, Inject, ElementRef, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  name: string;
}

@Component({
  selector: 'dialog-content-dialog',
  templateUrl: 'dialog-content-dialog.html',
})
export class DialogContentDialog {

  constructor(
    public dialogRef: MatDialogRef<DialogContentDialog>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

    onClose() {
      this.dialogRef.close();
    }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('name', { static: true }) nameElement: ElementRef;
  @ViewChild('email', { static: true }) emailElement: ElementRef;
  @ViewChild('message', { static: true }) messageElement: ElementRef;
  
  constructor(
    public dialog: MatDialog,
    nameElement: ElementRef,
    emailElement: ElementRef,
    messageElement: ElementRef) {
    this.nameElement = nameElement;
    this.emailElement = emailElement;
    this.messageElement = messageElement;
  }

  onSave() {
    const dialogRef = this.dialog.open(DialogContentDialog, {
      width: '250px',
      data: {name: this.nameElement.nativeElement.value}
    });

    console.log("Name: ", this.nameElement.nativeElement.value);
    console.log("Email: ", this.emailElement.nativeElement.value);
    console.log("Message: ", this.messageElement.nativeElement.value);

    this.nameElement.nativeElement.value = "";
    this.emailElement.nativeElement.value = "";
    this.messageElement.nativeElement.value = "";
  }
}
