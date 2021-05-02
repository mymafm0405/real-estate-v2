import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ContractsService } from 'src/app/shared/contracts.service';
import { MenuItem } from 'src/app/shared/menu-item.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.css'],
})
export class MenuItemComponent implements OnInit, OnDestroy {
  @Input() menuItem: MenuItem;
  numOfExpiredContracts = 0;
  contractChangedSub: Subscription;

  constructor(private contractsService: ContractsService) {}

  ngOnInit(): void {
    if (this.menuItem.name === 'Notifications') {
      this.contractsService.checkExpiredContracts();
      this.numOfExpiredContracts = this.contractsService.getExpiredContracts().length;

      this.contractChangedSub = this.contractsService.contractsChanged.subscribe(
        () => {
          this.contractsService.checkExpiredContracts();
          this.numOfExpiredContracts = this.contractsService.getExpiredContracts().length;
        }
      );
    }
  }

  ngOnDestroy() {
    if (this.menuItem.name === 'Notifications') {
      this.contractChangedSub.unsubscribe();
    }
  }
}
