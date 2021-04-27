import { Unit } from './../../shared/unit.model';
import { AreasService } from './../../shared/areas.service';
import { Area } from './../../shared/area.model';
import { BuildingsService } from './../../shared/buildings.service';
import { Building } from './../../shared/building.model';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { UnitsService } from 'src/app/shared/units.service';

@Component({
  selector: 'app-building-details',
  templateUrl: './building-details.component.html',
  styleUrls: ['./building-details.component.css'],
})
export class BuildingDetailsComponent implements OnInit, OnDestroy {
  building: Building;
  buildingsChangedSub: Subscription;
  remainingUnits = 0;
  createdUnits = 0;

  showAddForm = false;

  area: Area;
  areasChangedSub: Subscription;

  unitsChangedSub: Subscription;

  unitIdClickedForNewContractSub: Subscription;
  unitClicked = false;
  unitChoosed: Unit;

  constructor(
    private route: ActivatedRoute,
    private buildingsService: BuildingsService,
    private areasService: AreasService,
    private unitsService: UnitsService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this.building = this.buildingsService.getBuildingById(params.id);
      this.getArea();
      this.getRemainingUnits();
      this.getCreatedUnits();

      this.buildingsChangedSub = this.buildingsService.buildingsChanged.subscribe(
        () => {
          this.building = this.buildingsService.getBuildingById(params.id);
          this.getArea();
          this.getRemainingUnits();
          this.getCreatedUnits();
        }
      );

      this.areasChangedSub = this.areasService.areasChanged.subscribe(() => {
        this.getArea();
      });

      this.unitsChangedSub = this.unitsService.unitsChanged.subscribe(() => {
        this.getRemainingUnits();
        this.getCreatedUnits();
      });

      this.unitIdClickedForNewContractSub = this.unitsService.unitIdClickedForNewContract.subscribe(
        (unit: Unit) => {
          this.unitChoosed = unit;
          this.unitClicked = true;
        }
      )
    });
  }

  onShowAddForm() {
    this.showAddForm = !this.showAddForm;
  }

  getArea() {
    if (this.building !== undefined) {
      this.area = this.areasService.getAreaById(this.building.areaId);
    }
  }

  getRemainingUnits() {
    if (this.building) {
      this.remainingUnits =
        this.building.unitsQuantity -
        this.buildingsService.countUnitsRentedByBuildingId(this.building.id);
    }
  }

  getCreatedUnits() {
    if (this.building) {
      this.createdUnits = this.buildingsService.countUnitsCreatedByBuildingId(
        this.building.id
      );
    }
  }

  ngOnDestroy() {
    this.buildingsChangedSub.unsubscribe();
    this.areasChangedSub.unsubscribe();
    this.unitsChangedSub.unsubscribe();
  }
}
