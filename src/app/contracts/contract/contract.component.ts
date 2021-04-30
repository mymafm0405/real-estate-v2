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

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.css']
})
export class ContractComponent implements OnInit, OnDestroy {
  @Input() contract: Contract;
  area: Area;
  building: Building;
  unit: Unit;
  company: Company;
  client: Client;

  areasChangedSub: Subscription;
  buildingsChangedSub: Subscription;
  unitsChangedSub: Subscription;
  companiesChangedSub: Subscription;
  clientsChangedSub: Subscription;

  constructor(
    private areasService: AreasService,
    private buildingsService: BuildingsService,
    private unitsService: UnitsService,
    private companiesService: CompaniesService,
    private clientsService: ClientsService) { }

  ngOnInit(): void {
    this.building = this.buildingsService.getBuildingById(this.contract.buildingId);
    if (this.building) {
      this.area = this.areasService.getAreaById(this.building.areaId);
    }

    this.unit = this.unitsService.getUnitById(this.contract.unitId);
    if (this.contract.contractType === 'company') {
      this.company = this.companiesService.getCompanyById(this.contract.companyId);
    }
    this.client = this.clientsService.getClientById(this.contract.clientId);

    this.areasChangedSub = this.areasService.areasChanged.subscribe(
      () => {
        if (this.building) {
          this.area = this.areasService.getAreaById(this.building.areaId);
        }
      }
    )

    this.buildingsChangedSub = this.buildingsService.buildingsChanged.subscribe(
      () => {
        this.building = this.buildingsService.getBuildingById(this.contract.buildingId);
        if (this.building) {
          this.area = this.areasService.getAreaById(this.building.areaId);
        }
      }
    )

    this.unitsChangedSub = this.unitsService.unitsChanged.subscribe(
      () => {
        this.unit = this.unitsService.getUnitById(this.contract.unitId);
      }
    )

    this.companiesChangedSub = this.companiesService.companiesChanged.subscribe(
      () => {
        if (this.contract.contractType === 'company') {
          this.company = this.companiesService.getCompanyById(this.contract.companyId);
        }
      }
    )

    this.clientsChangedSub = this.clientsService.clientsChanged.subscribe(
      () => {
        this.client = this.clientsService.getClientById(this.contract.clientId);
      }
    )
  }

  ngOnDestroy() {
    this.areasChangedSub.unsubscribe();
    this.buildingsChangedSub.unsubscribe();
    this.unitsChangedSub.unsubscribe();
    this.companiesChangedSub.unsubscribe();
    this.clientsChangedSub.unsubscribe();
  }

}
