import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GeneralService } from './general.service';
import { Receipt } from './receipt.model';

@Injectable({ providedIn: 'root' })
export class ReceiptsService {
  receipts: Receipt[] = [];

  receiptsChanged = new Subject<boolean>();
  receiptAddingStatus = new Subject<boolean>();

  constructor(private generalService: GeneralService) {}

  addReceipt(newReceipt: Receipt) {
    this.generalService.addNewData('receipts', newReceipt).subscribe(
      (res: { name: string }) => {
        this.receipts.push({ ...newReceipt, id: res.name });
        this.receiptsChanged.next(true);
        this.receiptAddingStatus.next(true);
      },
      (error) => {
        console.log(error);
        this.receiptAddingStatus.next(false);
      }
    );
  }

  getReceipts() {
    return this.receipts.filter((receipt) => receipt.status === 'active');
  }

  getReceiptsByContractId(contractId: string) {
    return this.receipts.filter((receipt) => receipt.contractId === contractId);
  }

  getTotalPaymentsByContractId(contractId: string) {
    let totalPayments = 0;
    for (let receipt of this.receipts.filter(
      (receipt) => receipt.contractId === contractId
    )) {
      totalPayments = totalPayments + receipt.amount;
    }
    return totalPayments;
  }

  loadReceipts() {
    this.generalService
      .getArrayOfData('receipts')
      .subscribe((res: Receipt[]) => {
        this.receipts = res;
        this.receiptsChanged.next(true);
      });
  }

  getTodayDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const currentDate = yyyy + '-' + mm + '-' + dd;
    return currentDate;
  }
}
