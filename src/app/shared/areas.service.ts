import { Area } from './area.model';
import { GeneralService } from './general.service';

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AreasService {
  areasChanged = new Subject<boolean>();
  areaAddingStatus = new Subject<boolean>();

  areas: Area[] = [];

  constructor(private generalService: GeneralService) {}

  getAreas() {
    return this.areas.filter((area) => area.status === 'active');
  }

  getAreaById(areaId: string) {
    return this.areas.find((area) => area.id === areaId);
  }

  addArea(newArea: Area) {
    this.generalService.addNewData('areas', newArea).subscribe(
      (res: { name: string }) => {
        this.areas.push({ ...newArea, id: res.name });
        this.areasChanged.next(true);
        this.areaAddingStatus.next(true);
      },
      (error) => {
        console.log(error);
        this.areaAddingStatus.next(false);
      }
    );
  }

  loadAreas() {
    this.generalService.getArrayOfData('areas').subscribe(
      (res) => {
        this.areas = res;
        this.areasChanged.next(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  updateArea(areaId: string, property: string, newData: string) {
    this.generalService
      .patchCurrentData('areas', areaId, { [property]: newData })
      .subscribe(
        () => {
          if (this.areas.find((area) => area.id === areaId)) {
            this.areas.find((area) => area.id === areaId)[property] = newData;
            this.areasChanged.next(true);
          }
        },
        (error) => {
          console.log(error);
        }
      );
  }
}
