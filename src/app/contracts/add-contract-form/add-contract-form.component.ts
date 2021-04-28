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

  addingContractStatus: boolean;

  newContract: Contract;
  newClient: Client;
  clientId: string;

  constructor(
    private clientsService: ClientsService,
    private contractsService: ContractsService,
    private unitsService: UnitsService
  ) {}

  ngOnInit(): void {
    this.newClientIdChangedSub = this.clientsService.newClientIdChanged.subscribe(
      (newClientId: string) => {
        this.newContract.clientId = newClientId;
        this.contractsService.addContract(this.newContract);
      }
    );

    this.addingContractSub = this.contractsService.contractAddingStatus.subscribe(
      (status: boolean) => {
        this.addingContractStatus = status;
        this.addForm.reset();

        setTimeout(() => {
          this.addingContractStatus = undefined;
        }, 2500);

        if (status) {
        }
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
    } = this.addForm.value;
    this.newClient = new Client(clientName, qId, phone);
    this.newContract = new Contract(
      this.building.id,
      this.unit.id,
      this.clientId,
      startDate,
      price,
      months,
      'active',
      quantity
    );
    this.clientsService.checkClientExist(qId, this.newClient);
  }

  ngOnDestroy() {
    this.newClientIdChangedSub.unsubscribe();
  }
}
