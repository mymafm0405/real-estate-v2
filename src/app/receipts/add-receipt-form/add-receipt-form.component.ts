import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { CompaniesService } from 'src/app/shared/companies.service';
import { Company } from 'src/app/shared/company.model';
import { Contract } from 'src/app/shared/contract.model';
import { ContractsService } from 'src/app/shared/contracts.service';
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
  creationDate: string;
  status = 'active';
  addingStatus: boolean;
  contract: Contract;
  company: Company;
  companyId: string;

  addingReceiptStatusSub: Subscription;
  contractChangedSub: Subscription;
  companiesChangedSub: Subscription;

  constructor(
    private receiptsService: ReceiptsService,
    private companiesService: CompaniesService,
    private contractsService: ContractsService
  ) {}

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

    this.contract = this.contractsService.getContractById(this.contractId);
    if (this.contract && this.contract.contractType === 'company') {
      this.company = this.companiesService.getCompanyById(
        this.contract.companyId
      );
    }
    this.contractChangedSub = this.contractsService.contractsChanged.subscribe(
      () => {
        this.contract = this.contractsService.getContractById(this.contractId);
        if (this.contract && this.contract.contractType === 'company') {
          this.company = this.companiesService.getCompanyById(
            this.contract.companyId
          );
          this.companiesChangedSub = this.companiesService.companiesChanged.subscribe(
            () => {
              this.company = this.companiesService.getCompanyById(
                this.contract.companyId
              );
            }
          );
        }
      }
    );
  }

  onSubmit() {
    this.amount = this.addForm.value.amount;
    const { date, details } = this.addForm.value;
    this.serial = this.receiptsService.getReceipts().length + 1 + 1000;
    this.creationDate = this.receiptsService.getTodayDate();

    if (this.contract.contractType === 'company') {
      this.companyId = this.company.id;
    } else {
      this.companyId = '';
    }

    const newReceipt: Receipt = new Receipt(
      this.serial,
      this.creationDate,
      this.companyId,
      this.contractId,
      this.clientId,
      this.unitId,
      this.buildingId,
      this.amount,
      date,
      details,
      this.status
    );

    this.receiptsService.addReceipt(newReceipt);
  }

  ngOnDestroy() {
    this.addingReceiptStatusSub.unsubscribe();
    if (this.companiesChangedSub) {
      this.companiesChangedSub.unsubscribe();
    }
    this.contractChangedSub.unsubscribe();
  }
}
