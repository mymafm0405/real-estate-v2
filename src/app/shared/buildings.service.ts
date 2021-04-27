import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Building } from './building.model';
import { GeneralService } from './general.service';
import { UnitsService } from './units.service';

@Injectable({ providedIn: 'root' })
export class BuildingsService {
  buildings: Building[] = [];

  buildingsChanged = new Subject<boolean>();
  buildingAddingStatus = new Subject<boolean>();

  constructor(
    private generalService: GeneralService,
    private unitsService: UnitsService
  ) {}

  getBuildings() {
    return this.buildings.filter((building) => building.status === 'active');
  }

  getBuildingById(buildingId: string) {
    return this.buildings.find((building) => building.id === buildingId);
  }

  getBuildingsByAreaId(areaId: string) {
    return this.buildings.filter((building) => building.areaId === areaId);
  }

  countUnitsRentedByBuildingId(buildingId: string) {
    return this.unitsService
      .getUnits()
      .filter(
        (unit) => unit.buildingId === buildingId && unit.contractId !== 'empty'
      ).length;
  }

  countUnitsCreatedByBuildingId(buildingId: string) {
    let count = 0;
    for (let unit of this.unitsService
      .getUnits()
      .filter((unit) => unit.buildingId === buildingId)) {
      count = count + unit.quantity;
    }
    return count;
  }

  addBuilding(newBuilding: Building) {
    this.generalService.addNewData('buildings', newBuilding).subscribe(
      (res: { name: string }) => {
        this.buildings.push({ ...newBuilding, id: res.name });
        this.buildingsChanged.next(true);
        this.buildingAddingStatus.next(true);
      },
      (error) => {
        console.log(error);
        this.buildingAddingStatus.next(false);
      }
    );
  }

  loadBuildings() {
    this.generalService.getArrayOfData('buildings').subscribe(
      (res: Building[]) => {
        this.buildings = res;
        this.buildingsChanged.next(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
