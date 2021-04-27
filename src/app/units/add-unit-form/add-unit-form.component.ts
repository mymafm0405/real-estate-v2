import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Building } from 'src/app/shared/building.model';
import { BuildingsService } from 'src/app/shared/buildings.service';
import { Unit } from 'src/app/shared/unit.model';
import { UnitsService } from 'src/app/shared/units.service';

@Component({
  selector: 'app-add-unit-form',
  templateUrl: './add-unit-form.component.html',
  styleUrls: ['./add-unit-form.component.css'],
})
export class AddUnitFormComponent implements OnInit, OnDestroy {
  @ViewChild('addForm', { static: false }) addForm: NgForm;
  @Input() building: Building;
  addingStatus: boolean;
  loading = false;
  addingStatusSub: Subscription;

  addQuantity = 1;

  unitsChangedSub: Subscription;
  remainingToCreateUnits = 0;

  constructor(
    private unitsService: UnitsService,
    private buildingsService: BuildingsService
  ) {}

  ngOnInit(): void {
    this.addingStatusSub = this.unitsService.unitAddingStatus.subscribe(
      (status: boolean) => {
        this.addForm.reset();
        this.loading = false;
        this.addingStatus = status;
        setTimeout(() => {
          this.addingStatus = undefined;
        });
      }
    );

    this.countRemaining();

    this.unitsChangedSub = this.unitsService.unitsChanged.subscribe(() => {
      this.countRemaining();
    });
  }

  onSubmit() {
    this.loading = true;
    const { name, description, quantity } = this.addForm.value;
    const newUnit: Unit = new Unit(
      name,
      description,
      quantity,
      this.building.id,
      'empty',
      'active'
    );
    this.unitsService.addUnit(newUnit);
  }

  countRemaining() {
    if (this.building) {
      this.remainingToCreateUnits =
        this.building.unitsQuantity -
        this.buildingsService.countUnitsCreatedByBuildingId(this.building.id);
    }
  }

  ngOnDestroy() {
    this.addingStatusSub.unsubscribe();
  }
}
