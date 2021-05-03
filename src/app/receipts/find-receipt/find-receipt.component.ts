import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Receipt } from 'src/app/shared/receipt.model';
import { ReceiptsService } from 'src/app/shared/receipts.service';

@Component({
  selector: 'app-find-receipt',
  templateUrl: './find-receipt.component.html',
  styleUrls: ['./find-receipt.component.css'],
})
export class FindReceiptComponent implements OnInit {
  @ViewChild('searchForm', { static: false }) searchForm: NgForm;

  constructor(private receiptsService: ReceiptsService) {}

  ngOnInit(): void {}

  onChange() {
    this.receiptsService.findReceipt(this.searchForm.value.search);
    if (this.searchForm.value.search === '') {
      this.receiptsService.receiptSearchChanged.next(
        this.receiptsService.getReceipts()
      );
    }
  }
}
