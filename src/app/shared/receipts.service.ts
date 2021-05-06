import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ClientsService } from './clients.service';
import { CompaniesService } from './companies.service';
import { GeneralService } from './general.service';
import { Receipt } from './receipt.model';

@Injectable({ providedIn: 'root' })
export class ReceiptsService {
  receipts: Receipt[] = [];
  searchReceipts: Receipt[] = [];

  receiptsChanged = new Subject<boolean>();
  receiptAddingStatus = new Subject<boolean>();
  receiptSearchChanged = new Subject<Receipt[]>();

  constructor(
    private generalService: GeneralService,
    private companiesService: CompaniesService,
    private clientsService: ClientsService
  ) {}

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

  findReceipt(search: string) {
    this.searchReceipts = [];
    this.receiptSearchChanged.next(this.searchReceipts);

    // Find receipts by company name
    const foundCompanies = this.companiesService
      .getCompanies()
      .filter(
        (company) =>
          company.name.toLowerCase().includes(search) ||
          company.crNo === +search
      );

    if (foundCompanies.length > 0) {
      for (let comp of foundCompanies) {
        const foundReceipts = this.getReceipts().filter(
          (receipt) => receipt.companyId === comp.id
        );
        if (foundReceipts.length > 0) {
          if (this.searchReceipts.length > 0) {
            for (const rece of foundReceipts) {
              if (!this.searchReceipts.find((re) => re.id === rece.id)) {
                this.searchReceipts.push(rece);
              }
            }
          } else {
            for (const rece of foundReceipts) {
              this.searchReceipts.push(rece);
            }
          }
        }
      }
    }
    //
    // Find receipts by client name or phone
    const foundClients = this.clientsService
      .getClients()
      .filter(
        (client) =>
          client.name.toLowerCase().includes(search.toLowerCase()) ||
          client.phone === +search
      );

    console.log(this.clientsService.getClients());
    console.log(foundClients);
    if (foundClients.length > 0) {
      for (let cli of foundClients) {
        const foundReceipts = this.getReceipts().filter(
          (rece) => rece.clientId === cli.id
        );
        if (foundReceipts.length > 0) {
          if (this.searchReceipts.length > 0) {
            for (let rec of foundReceipts) {
              if (
                !this.searchReceipts.find((receipt) => receipt.id === rec.id)
              ) {
                this.searchReceipts.push(rec);
              }
            }
          } else {
            for (let rec of foundReceipts) {
              this.searchReceipts.push(rec);
            }
          }
        }
      }
    }
    //

    // Find receipts by serial number
    const oneReceiptFoundBySerail = this.getReceipts().find(
      (rec) => rec.serial === +search
    );
    if (oneReceiptFoundBySerail) {
      if (this.searchReceipts.length > 0) {
        if (
          !this.searchReceipts.find(
            (receipt) => receipt.id === oneReceiptFoundBySerail.id
          )
        ) {
          this.searchReceipts.push(oneReceiptFoundBySerail);
        }
      } else {
        this.searchReceipts.push(oneReceiptFoundBySerail);
      }
    }
    //

    this.receiptSearchChanged.next(this.searchReceipts);
  }

  findReceiptsByDate(startDate: string, endDate: string) {
    const foundReceipts = this.getReceipts().filter(
      (receipt) =>
        new Date(receipt.date).getTime() >= new Date(startDate).getTime() &&
        new Date(receipt.date).getTime() <= new Date(endDate).getTime()
    );
    this.receiptSearchChanged.next(foundReceipts);
    console.log(foundReceipts);
  }
}
