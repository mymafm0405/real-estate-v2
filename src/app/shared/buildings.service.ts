import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Building } from './building.model';
import { GeneralService } from './general.service';

@Injectable({ providedIn: 'root' })
export class BuildingsService {
  buildings: Building[] = [];

  buildingsChanged = new Subject<boolean>();
  buildingAddingStatus = new Subject<boolean>();

  constructor(private generalService: GeneralService) {}

  getBuildings() {
    return this.buildings;
  }

  getBuildingById(buildingId: string) {
    return this.buildings.find(building => building.id === buildingId);
  }

  getBuildingsByAreaId(areaId: string) {
    return this.buildings.filter(building => building.areaId === areaId);
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
