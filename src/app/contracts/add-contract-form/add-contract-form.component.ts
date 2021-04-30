import { CompaniesService } from './../../shared/companies.service';
import { Company } from './../../shared/company.model';
import { ContractsService } from './../../shared/contracts.service';
import { Client } from './../../shared/client.model';
import { Contract } from './../../shared/contract.model';
import { Unit } from './../../shared/unit.model';
import { Building } from './../../shared/building.model';
import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ClientsService } from 'src/app/shared/clients.service';
import { Subscription } from 'rxjs';
import { UnitsService } from 'src/app/shared/units.service';

@Component({
  selector: 'app-add-contract-form',
  templateUrl: './add-contract-form.component.html',
  styleUrls: ['./add-contract-form.component.css'],
})
export class AddContractFormComponent implements OnInit, OnDestroy {
  @ViewChild('addForm', { static: false }) addForm: NgForm;
  @Input() building: Building;
  @Input() unit: Unit;
  quantity = 1;

  newClientIdChangedSub: Subscription;
  addingContractSub: Subscription;
  newCompanyIdSub: Subscription;

  addingContractStatus: boolean;

  newContract: Contract;
  newClient: Client;
  clientId: string;

  newCompany: Company;

  contractType = '';

  constructor(
    private clientsService: ClientsService,
    private contractsService: ContractsService,
    private unitsService: UnitsService,
    private companiesService: CompaniesService
  ) { }

  ngOnInit(): void {

    this.newClientIdChangedSub = this.clientsService.newClientIdChanged.subscribe(
      (newClientId: string) => {
        this.newContract.clientId = newClientId;
        console.log('client id updated');
        if (this.newContract.contractType === 'personal') {
          console.log('personal only');
          this.contractsService.addContract(this.newContract);
        } else if (this.newContract.contractType === 'company') {

          this.companiesService.checkExistCompany(this.newCompany);

        }
      }
    );

    this.newCompanyIdSub = this.companiesService.newCompanyId.subscribe(
      (companyId: string) => {
        this.newCompany.id = companyId;
        this.newContract.companyId = this.newCompany.id;
        this.contractsService.addContract(this.newContract);
        console.log('company type and company id updated');
      }
    )

    this.addingContractSub = this.contractsService.contractAddingStatus.subscribe(
      (status: boolean) => {
        this.addingContractStatus = status;
        this.addForm.reset();

        setTimeout(() => {
          this.addingContractStatus = undefined;
          if (status) {
            this.unitsService.unitUnClicked.next(true);
          }
        }, 2500);
      }
    );
  }

  onSubmit() {
    console.log(this.addForm);
    const {
      clientName,
      qId,
      phone,
      startDate,
      price,
      months,
      quantity,
      contractType
    } = this.addForm.value;

    this.newClient = new Client(clientName, qId, phone);

    if (contractType === 'company') {
      const { company, crNo } = this.addForm.value;
      this.newCompany = new Company(company, crNo);
    }

    this.newContract = new Contract(
      this.building.id,
      this.unit.id,
      this.clientId,
      startDate,
      price,
      months,
      'active',
      quantity,
      contractType
    );
    this.clientsService.checkClientExist(qId, this.newClient);
  }

  onTypeChange() {
    this.contractType = this.addForm.value.contractType;
  }

  ngOnDestroy() {
    this.newClientIdChangedSub.unsubscribe();
    if (this.newCompanyIdSub) {
      this.newCompanyIdSub.unsubscribe();
    }
  }
}
