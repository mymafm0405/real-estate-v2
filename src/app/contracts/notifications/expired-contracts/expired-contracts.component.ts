import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contract } from 'src/app/shared/contract.model';
import { ContractsService } from 'src/app/shared/contracts.service';

@Component({
  selector: 'app-expired-contracts',
  templateUrl: './expired-contracts.component.html',
  styleUrls: ['./expired-contracts.component.css'],
})
export class ExpiredContractsComponent implements OnInit, OnDestroy {
  contracts: Contract[] = [];
  contractsChangedSub: Subscription;

  constructor(private contractsService: ContractsService) {}

  ngOnInit(): void {
    this.contracts = this.contractsService.getExpiredContracts();
    this.contractsChangedSub = this.contractsService.contractsChanged.subscribe(
      () => {
        this.contracts = this.contractsService.getExpiredContracts();
      }
    );
  }

  ngOnDestroy() {
    this.contractsChangedSub.unsubscribe();
  }
}
