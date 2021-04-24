import { Area } from './area.model';
import { GeneralService } from './general.service';

import { Injectable } from "@angular/core";
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AreasService {

  areasChanged = new Subject<boolean>();

  areas: Area[] = [];

  constructor(private generalService: GeneralService) {}

  addArea() {
    const newArea: Area = new Area('Aziziya', 'area 57');
    this.generalService.addNewData('areas', newArea)
    .subscribe(
      (res: { name: string }) => {
        this.areas.push({...newArea, id: res.name});
        this.areasChanged.next(true);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadAreas() {
    this.generalService.getArrayOfData('areas')
    .subscribe(
      (res) => {
        this.areas = res;
        this.areasChanged.next(true);
      }, error => {
        console.log(error);
      }
    )
  }

  updateArea(areaId: string, property: string, newData: string) {
    this.generalService.patchCurrentData('areas', areaId, { [property]: newData })
    .subscribe(
      () => {
        if (this.areas.find(area => area.id === areaId)) {
          this.areas.find(area => area.id === areaId)[property] = newData;
          this.areasChanged.next(true);
        }
      }, error => {
        console.log(error);
      }
    )
  }
}
