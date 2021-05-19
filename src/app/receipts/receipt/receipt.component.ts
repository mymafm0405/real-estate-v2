import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Area } from 'src/app/shared/area.model';
import { AreasService } from 'src/app/shared/areas.service';
import { Building } from 'src/app/shared/building.model';
import { BuildingsService } from 'src/app/shared/buildings.service';
import { Client } from 'src/app/shared/client.model';
import { ClientsService } from 'src/app/shared/clients.service';
import { CompaniesService } from 'src/app/shared/companies.service';
import { Company } from 'src/app/shared/company.model';
import { Contract } from 'src/app/shared/contract.model';
import { ContractsService } from 'src/app/shared/contracts.service';
import { Receipt } from 'src/app/shared/receipt.model';
import { Unit } from 'src/app/shared/unit.model';
import { UnitsService } from 'src/app/shared/units.service';

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
  area: Area;
  building: Building;
  unit: Unit;

  contractsChangedSub: Subscription;
  clientsChangedSub: Subscription;
  companiesChangedSub: Subscription;
  areasChangedSub: Subscription;
  buildingsChangedSub: Subscription;

  constructor(
    private contractsService: ContractsService,
    private companiesService: CompaniesService,
    private clientsService: ClientsService,
    private areasService: AreasService,
    private buildingsService: BuildingsService,
    private unitsService: UnitsService
  ) {}

  ngOnInit(): void {
    this.contract = this.contractsService.getContractById(
      this.receipt.contractId
    );

    if (this.contract) {
      this.getBuilding(this.contract.buildingId);
    }

    this.contractsChangedSub = this.contractsService.contractsChanged.subscribe(
      () => {
        this.contract = this.contractsService.getContractById(
          this.receipt.contractId
        );

        if (this.contract) {
          this.getBuilding(this.contract.buildingId);
        }
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

  getArea(areaId: string) {
    this.area = this.areasService.getAreaById(areaId);
    this.areasChangedSub = this.areasService.areasChanged.subscribe(() => {
      this.area = this.areasService.getAreaById(areaId);
    });
  }

  getBuilding(buildingId: string) {
    this.building = this.buildingsService.getBuildingById(buildingId);
    if (this.building) {
      this.getArea(this.building.areaId);
    }

    this.buildingsChangedSub = this.buildingsService.buildingsChanged.subscribe(
      () => {
        this.building = this.buildingsService.getBuildingById(buildingId);

        if (this.building) {
          this.getArea(this.building.areaId);
        }
      }
    );
  }

  getUnit(unitId: string) {
    this.unit = this.unitsService.getUnitById(unitId);
  }

  ngOnDestroy() {
    this.contractsChangedSub.unsubscribe();
    this.clientsChangedSub.unsubscribe();
    this.companiesChangedSub.unsubscribe();
    this.areasChangedSub.unsubscribe();
    this.buildingsChangedSub.unsubscribe();
  }
}
