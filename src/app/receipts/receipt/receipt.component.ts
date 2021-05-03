import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Client } from 'src/app/shared/client.model';
import { ClientsService } from 'src/app/shared/clients.service';
import { CompaniesService } from 'src/app/shared/companies.service';
import { Company } from 'src/app/shared/company.model';
import { Contract } from 'src/app/shared/contract.model';
import { ContractsService } from 'src/app/shared/contracts.service';
import { Receipt } from 'src/app/shared/receipt.model';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css'],
})
export class ReceiptComponent implements OnInit, OnDestroy {
  @Input() receipt: Receipt;
  @Input() indexNumber: number;
  contract: Contract;
  company: Company;
  client: Client;

  contractsChangedSub: Subscription;
  clientsChangedSub: Subscription;
  companiesChangedSub: Subscription;

  constructor(
    private contractsService: ContractsService,
    private companiesService: CompaniesService,
    private clientsService: ClientsService
  ) {}

  ngOnInit(): void {
    this.contract = this.contractsService.getContractById(
      this.receipt.contractId
    );

    this.contractsChangedSub = this.contractsService.contractsChanged.subscribe(
      () => {
        this.contract = this.contractsService.getContractById(
          this.receipt.contractId
        );
      }
    );

    if (this.contract.contractType === 'company') {
      this.company = this.companiesService.getCompanyById(
        this.contract.companyId
      );
    }

    this.companiesChangedSub = this.companiesService.companiesChanged.subscribe(
      () => {
        if (this.contract.contractType === 'company') {
          this.company = this.companiesService.getCompanyById(
            this.contract.companyId
          );
        }
      }
    );

    this.client = this.clientsService.getClientById(this.receipt.clientId);

    this.clientsChangedSub = this.clientsService.clientsChanged.subscribe(
      () => {
        this.client = this.clientsService.getClientById(this.receipt.clientId);
      }
    );
  }

  ngOnDestroy() {
    this.contractsChangedSub.unsubscribe();
    this.clientsChangedSub.unsubscribe();
    this.companiesChangedSub.unsubscribe();
  }
}
