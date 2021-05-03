import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Receipt } from 'src/app/shared/receipt.model';
import { ReceiptsService } from 'src/app/shared/receipts.service';

@Component({
  selector: 'app-all-receipts',
  templateUrl: './all-receipts.component.html',
  styleUrls: ['./all-receipts.component.css'],
})
export class AllReceiptsComponent implements OnInit, OnDestroy {
  foundReceipts: Receipt[] = [];
  totalPayments = 0;

  receiptsChangedSub: Subscription;
  searchChangedSub: Subscription;

  constructor(private receiptsService: ReceiptsService) {}

  ngOnInit(): void {
    this.foundReceipts = this.receiptsService.getReceipts();
    this.calculateTotalPayments();
    this.receiptsChangedSub = this.receiptsService.receiptsChanged.subscribe(
      () => {
        this.foundReceipts = this.receiptsService.getReceipts();
        this.calculateTotalPayments();
      }
    );

    this.searchChangedSub = this.receiptsService.receiptSearchChanged.subscribe(
      (searchReceipts: Receipt[]) => {
        this.foundReceipts = searchReceipts;
        this.calculateTotalPayments();
      }
    );
  }

  calculateTotalPayments() {
    this.totalPayments = 0;
    for (let receipt of this.foundReceipts) {
      this.totalPayments = this.totalPayments + receipt.amount;
    }
  }

  ngOnDestroy() {
    this.receiptsChangedSub.unsubscribe();
    this.searchChangedSub.unsubscribe();
  }
}
