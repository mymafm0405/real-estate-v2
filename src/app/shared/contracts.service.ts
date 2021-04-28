import { UnitsService } from 'src/app/shared/units.service';
import { Subject } from 'rxjs';
import { GeneralService } from './general.service';
import { Contract } from './contract.model';
import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class ContractsService {
  contracts: Contract[] = [];
  contractsChanged = new Subject<boolean>();
  contractAddingStatus = new Subject<boolean>();

  constructor(
    private generalService: GeneralService,
    private unitsService: UnitsService
  ) {}

  getContracts() {
    return this.contracts.filter((contract) => contract.status === 'active');
  }

  addContract(newContract: Contract) {
    this.generalService.addNewData('contracts', newContract).subscribe(
      (res: { name: string }) => {
        this.contracts.push({ ...newContract, id: res.name });
        this.contractsChanged.next(true);
        this.contractAddingStatus.next(true);
        this.unitsService.changeUnitRented(
          newContract.unitId,
          newContract.quantity
        );
      },
      (error) => {
        console.log(error);
        this.contractAddingStatus.next(false);
      }
    );
  }

  loadContracts() {
    this.generalService.getArrayOfData('contracts').subscribe(
      (res: Contract[]) => {
        this.contracts = res;
        this.contractsChanged.next(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
