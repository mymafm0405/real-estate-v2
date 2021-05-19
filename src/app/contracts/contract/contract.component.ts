import { ContractsService } from 'src/app/shared/contracts.service';
import { Subscription } from 'rxjs';
import { CompaniesService } from './../../shared/companies.service';
import { UnitsService } from './../../shared/units.service';
import { BuildingsService } from './../../shared/buildings.service';
import { AreasService } from './../../shared/areas.service';
import { Client } from './../../shared/client.model';
import { Company } from './../../shared/company.model';
import { Unit } from './../../shared/unit.model';
import { Building } from './../../shared/building.model';
import { Area } from './../../shared/area.model';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Contract } from 'src/app/shared/contract.model';
import { ClientsService } from 'src/app/shared/clients.service';
import { ReceiptsService } from 'src/app/shared/receipts.service';
import { GeneralService } from 'src/app/shared/general.service';

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css'],
})
export class ContractComponent implements OnInit, OnDestroy {
  @Input() contract: Contract;
  area: Area;
  building: Building;
  unit: Unit;
  company: Company;
  client: Client;
  expired = false;
  totalPayments = 0;
  totalRequired = 0;
  totalRemaining = 0;
  paymentClicked = false;
  expiredDate: any;

  terminateClicked = false;
  usedMonths: number;
  limitPassed = false;
  overPaid = false;

  areasChangedSub: Subscription;
  buildingsChangedSub: Subscription;
  unitsChangedSub: Subscription;
  companiesChangedSub: Subscription;
  clientsChangedSub: Subscription;
  receiptsChangedSub: Subscription;
  contractChangedSub: Subscription;

  constructor(
    private areasService: AreasService,
    private buildingsService: BuildingsService,
    private unitsService: UnitsService,
    private companiesService: CompaniesService,
    private clientsService: ClientsService,
    private receiptsService: ReceiptsService,
    private contractsService: ContractsService
  ) {}

  ngOnInit(): void {
    this.getExpireDate();

    this.contractChangedSub = this.contractsService.contractsChanged.subscribe(
      () => {
        this.contract = this.contractsService.getContractById(this.contract.id);
        this.calculateTotals();
        this.getExpireDate();
      }
    );

    this.building = this.buildingsService.getBuildingById(
      this.contract.buildingId
    );
    if (this.building) {
      this.area = this.areasService.getAreaById(this.building.areaId);
    }

    this.unit = this.unitsService.getUnitById(this.contract.unitId);
    if (this.contract.contractType === 'company') {
      this.company = this.companiesService.getCompanyById(
        this.contract.companyId
      );
    }
    this.client = this.clientsService.getClientById(this.contract.clientId);

    this.areasChangedSub = this.areasService.areasChanged.subscribe(() => {
      if (this.building) {
        this.area = this.areasService.getAreaById(this.building.areaId);
      }
    });

    this.buildingsChangedSub = this.buildingsService.buildingsChanged.subscribe(
      () => {
        this.building = this.buildingsService.getBuildingById(
          this.contract.buildingId
        );
        if (this.building) {
          this.area = this.areasService.getAreaById(this.building.areaId);
        }
      }
    );

    this.unitsChangedSub = this.unitsService.unitsChanged.subscribe(() => {
      this.unit = this.unitsService.getUnitById(this.contract.unitId);
    });

    this.companiesChangedSub = this.companiesService.companiesChanged.subscribe(
      () => {
        if (this.contract.contractType === 'company') {
          this.company = this.companiesService.getCompanyById(
            this.contract.companyId
          );
        }
      }
    );

    this.clientsChangedSub = this.clientsService.clientsChanged.subscribe(
      () => {
        this.client = this.clientsService.getClientById(this.contract.clientId);
      }
    );

    this.calculateTotals();

    this.receiptsChangedSub = this.receiptsService.receiptsChanged.subscribe(
      () => {
        // this.totalPayments = this.receiptsService.getTotalPaymentsByContractId(
        //   this.contract.id
        // );
        // this.totalRemaining = this.totalRequired - this.totalPayments;
        this.calculateTotals();

        setTimeout(() => {
          this.paymentClicked = false;
        }, 1500);
      }
    );
  }

  calculateTotals() {
    if (this.contract) {
      this.totalRequired =
        this.contract.price * this.contract.months * this.contract.quantity;
      this.totalPayments = this.receiptsService.getTotalPaymentsByContractId(
        this.contract.id
      );
      this.totalRemaining = this.totalRequired - this.totalPayments;

      if (this.totalRemaining < 0) {
        this.totalRemaining = 0;
      }
    }
  }

  addClicked() {
    this.paymentClicked = !this.paymentClicked;
  }

  getExpireDate() {
    if (this.contract) {
      const start = new Date(this.contract.startDate);
      const expired = start.setMonth(start.getMonth() + this.contract.months);
      this.expiredDate = new Date(expired).toDateString();
      if (this.contract.terminate) {
        this.expiredDate = new Date(this.contract.endDate).toDateString();
      }
      if (
        this.contractsService
          .getExpiredContracts()
          .find((cont) => cont.id === this.contract.id)
      ) {
        this.expired = true;
      }
    }
  }

  onTerminate() {
    this.terminateClicked = !this.terminateClicked;
    const todayDate = new Date();
    const todayMonth = todayDate.getMonth();
    const startDate = new Date(this.contract.startDate).getMonth();
    this.usedMonths = todayMonth - startDate;
    if (todayDate.getDate() > 7) {
      this.limitPassed = true;
      this.usedMonths = this.usedMonths + 1;
    }

    this.checkIfPaidIsMoreThanRequiredTemporary();
  }

  checkIfPaidIsMoreThanRequiredTemporary() {
    const totalRequired = this.contract.price * this.usedMonths;
    const totalPayments = this.receiptsService.getTotalPaymentsByContractId(
      this.contract.id
    );
    const totalRemaining = this.totalRequired - this.totalPayments;

    if (totalPayments > totalRequired) {
      this.overPaid = true;
    }
  }

  cancelTerminate() {
    this.terminateClicked = false;
  }
  confirmTerminate() {
    this.contractsService.terminate(this.contract);
    this.terminateClicked = false;
  }

  onDelete() {
    this.contractsService.setContractInActive(this.contract.id);
  }

  onRenew() {
    console.log('renew');
  }

  ngOnDestroy() {
    this.areasChangedSub.unsubscribe();
    this.buildingsChangedSub.unsubscribe();
    this.unitsChangedSub.unsubscribe();
    this.companiesChangedSub.unsubscribe();
    this.clientsChangedSub.unsubscribe();
    this.receiptsChangedSub.unsubscribe();
    this.contractChangedSub.unsubscribe();
  }
}
