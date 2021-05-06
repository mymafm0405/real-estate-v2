import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ReceiptsService } from 'src/app/shared/receipts.service';

@Component({
  selector: 'app-receipts-by-date',
  templateUrl: './receipts-by-date.component.html',
  styleUrls: ['./receipts-by-date.component.css'],
})
export class ReceiptsByDateComponent implements OnInit {
  @ViewChild('findForm', { static: false }) findForm: NgForm;

  constructor(private receiptsService: ReceiptsService) {}

  ngOnInit(): void {}

  onSubmit() {
    const { start, end } = this.findForm.value;
    this.receiptsService.findReceiptsByDate(start, end);
    this.findForm.reset();
    console.log('find by date');
  }
}
