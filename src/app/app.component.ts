import { ContractsService } from './shared/contracts.service';
import { AreasService } from './shared/areas.service';
import { Component, OnInit } from '@angular/core';
import { BuildingsService } from './shared/buildings.service';
import { UnitsService } from './shared/units.service';
import { ClientsService } from './shared/clients.service';
import { CompaniesService } from './shared/companies.service';
import { ReceiptsService } from './shared/receipts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'real-estate-v2';

  constructor(
    private areasService: AreasService,
    private buildingsService: BuildingsService,
    private unitsService: UnitsService,
    private contractsService: ContractsService,
    private clientsService: ClientsService,
    private companiesService: CompaniesService,
    private receiptsService: ReceiptsService
  ) {}

  ngOnInit() {
    this.areasService.loadAreas();
    this.buildingsService.loadBuildings();
    this.unitsService.loadUnits();
    this.clientsService.loadClients();
    this.contractsService.loadContracts();
    this.companiesService.loadCompanies();
    this.receiptsService.loadReceipts();
  }
}
