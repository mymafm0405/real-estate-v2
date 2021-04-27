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

  constructor(private generalService: GeneralService) {}

  getUnits() {
    return this.units.filter((unit) => unit.status === 'active');
  }
  getUnitsByBuildingId(buildingId: string) {
    return this.units.filter((unit) => unit.buildingId === buildingId);
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

  changeUnitContractId(unitId: string, contractId: string) {
    this.generalService.patchCurrentData('units', unitId, { contractId }).subscribe(
      () => {
        console.log('unit updated');
      }
    )
  }
}
