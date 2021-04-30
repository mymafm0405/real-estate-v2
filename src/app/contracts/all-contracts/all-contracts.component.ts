import { Subscription } from 'rxjs';
import { ContractsService } from './../../shared/contracts.service';
import { Contract } from './../../shared/contract.model';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-all-contracts',
  templateUrl: './all-contracts.component.html',
  styleUrls: ['./all-contracts.component.css']
})
export class AllContractsComponent implements OnInit, OnDestroy {
  contracts: Contract[] = [];
  contractsChangedSub: Subscription;

  constructor(private contractsService: ContractsService) {}

  ngOnInit(): void {
    this.contracts = this.contractsService.getContracts();
    this.contractsChangedSub = this.contractsService.contractsChanged.subscribe(
      () => {
        this.contracts = this.contractsService.getContracts();
        console.log(this.contracts);
      }
    )
    console.log(this.contracts);
  }

  ngOnDestroy() {
    this.contractsChangedSub.unsubscribe();
  }

}
