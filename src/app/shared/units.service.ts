import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { GeneralService } from './general.service';
import { Unit } from './unit.model';

@Injectable({ providedIn: 'root' })
export class UnitsService {
  units: Unit[] = [];

  unitsChanged = new Subject<boolean>();
  unitAddingStatus = new Subject<boolean>();
  unitIdClickedForNewContract = new Subject<Unit>();
  unitUnClicked = new Subject<boolean>();

  constructor(private generalService: GeneralService) {}

  getUnits() {
    return this.units.filter((unit) => unit.status === 'active');
  }
  getUnitsByBuildingId(buildingId: string) {
    return this.units.filter((unit) => unit.buildingId === buildingId);
  }

  getUnitById(unitId: string) {
    return this.units.find((unit) => unit.id === unitId);
  }

  addUnit(newUnit: Unit) {
    this.generalService.addNewData('units', newUnit).subscribe(
      (res: { name: string }) => {
        this.units.push({ ...newUnit, id: res.name });
        this.unitsChanged.next(true);
        this.unitAddingStatus.next(true);
      },
      (error) => {
        console.log(error);
        this.unitAddingStatus.next(false);
      }
    );
  }

  loadUnits() {
    this.generalService.getArrayOfData('units').subscribe(
      (res: Unit[]) => {
        this.units = res;
        this.unitsChanged.next(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changeUnitRented(unitId: string, quantity: number) {
    const newNumOfRented =
      this.units.find((unit) => unit.id === unitId).numOfRented + quantity;
    this.generalService
      .patchCurrentData('units', unitId, { numOfRented: newNumOfRented })
      .subscribe(() => {
        this.units.find(
          (unit) => unit.id === unitId
        ).numOfRented = newNumOfRented;
        this.unitsChanged.next(true);
      });
  }
}
