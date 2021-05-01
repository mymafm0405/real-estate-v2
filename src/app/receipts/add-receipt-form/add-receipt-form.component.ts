import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Receipt } from 'src/app/shared/receipt.model';
import { ReceiptsService } from 'src/app/shared/receipts.service';

@Component({
  selector: 'app-add-receipt-form',
  templateUrl: './add-receipt-form.component.html',
  styleUrls: ['./add-receipt-form.component.css'],
})
export class AddReceiptFormComponent implements OnInit, OnDestroy {
  @ViewChild('addForm', { static: false }) addForm: NgForm;
  @Input() totalRemaining: number;
  @Input() contractId: string;
  @Input() clientId: string;
  @Input() unitId: string;
  @Input() buildingId: string;
  amount: number;
  serial: number;
  date: string;
  status = 'active';
  addingStatus: boolean;

  addingReceiptStatusSub: Subscription;

  constructor(private receiptsService: ReceiptsService) {}

  ngOnInit(): void {
    this.addingReceiptStatusSub = this.receiptsService.receiptAddingStatus.subscribe(
      (status: boolean) => {
        this.addForm.reset();
        this.addingStatus = status;

        setTimeout(() => {
          this.addingStatus = undefined;
        }, 2500);
      }
    );
  }

  onSubmit() {
    this.amount = this.addForm.value.amount;
    this.serial = this.receiptsService.getReceipts().length + 1;
    this.date = this.receiptsService.getTodayDate();

    const newReceipt: Receipt = new Receipt(
      this.serial,
      this.date,
      this.contractId,
      this.clientId,
      this.unitId,
      this.buildingId,
      this.amount,
      this.status
    );

    this.receiptsService.addReceipt(newReceipt);
  }

  ngOnDestroy() {
    this.addingReceiptStatusSub.unsubscribe();
  }
}
