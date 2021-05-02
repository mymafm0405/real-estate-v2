import { Subject } from 'rxjs';
import { Contract } from './contract.model';
import { Injectable } from '@angular/core';
import { CompaniesService } from './companies.service';
import { ClientsService } from './clients.service';
import { GeneralService } from './general.service';
import { UnitsService } from './units.service';

@Injectable({ providedIn: 'root' })
export class ContractsService {
  contracts: Contract[] = [];
  contractsChanged = new Subject<boolean>();
  contractAddingStatus = new Subject<boolean>();
  expiredContracts: Contract[] = [];

  constructor(
    private generalService: GeneralService,
    private unitsService: UnitsService,
    private companiesSercice: CompaniesService,
    private clientsService: ClientsService
  ) {}

  getContracts() {
    return this.contracts.filter((contract) => contract.status === 'active');
  }

  getExpiredContracts() {
    return this.expiredContracts;
  }

  findContracts(search: string) {
    const allFoundsContracts: Contract[] = [];

    const foundCompanies = this.companiesSercice.companies.filter((company) =>
      company.name.toLowerCase().includes(search.toLowerCase())
    );
    const foundClients = this.clientsService.clients.filter(
      (client) =>
        client.name.toLowerCase().includes(search.toLowerCase()) ||
        client.phone === +search
    );

    if (foundCompanies.length > 0) {
      for (let company of foundCompanies) {
        const foundContract = this.contracts.find(
          (contract) => contract.companyId === company.id
        );
        if (foundContract) {
          if (allFoundsContracts.length > 0) {
            if (
              allFoundsContracts.filter(
                (currentContract) => currentContract.id === foundContract.id
              ).length === 0
            ) {
              allFoundsContracts.push(foundContract);
            }
          } else {
            allFoundsContracts.push(foundContract);
          }
        }
      }
    }

    if (foundClients.length > 0) {
      for (let client of foundClients) {
        const foundClientsContracts = this.contracts.filter(
          (contract) => contract.clientId === client.id
        );
        if (foundClientsContracts.length > 0) {
          for (let contract of foundClientsContracts) {
            if (allFoundsContracts.length > 0) {
              if (
                allFoundsContracts.filter((cont) => cont.id === contract.id)
                  .length === 0
              ) {
                allFoundsContracts.push(contract);
              }
            } else {
              allFoundsContracts.push(contract);
            }
          }
        }
      }
    }

    return allFoundsContracts;
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

  getTodayDate() {
    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const currentDate = yyyy + '-' + mm + '-' + dd;
    return currentDate;
  }

  checkExpiredContracts() {
    const todayTimestamp = new Date(this.getTodayDate()).getTime();
    for (let cont of this.getContracts()) {
      const expiredTime = new Date(cont.startDate).setMonth(+cont.months);
      if (expiredTime < todayTimestamp) {
        this.expiredContracts.push(cont);
      }
    }
  }
}
