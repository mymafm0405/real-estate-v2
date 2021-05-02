import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/shared/menu-item.model';

@Component({
  selector: 'app-contracts',
  templateUrl: './contracts.component.html',
  styleUrls: ['./contracts.component.css'],
})
export class ContractsComponent implements OnInit {
  contractsMenu: MenuItem[] = [
    new MenuItem(
      'View contracts',
      'view-contracts',
      'glyphicon glyphicon-list-alt',
      'sub'
    ),
    new MenuItem(
      'Find a contract',
      'find-contract',
      'glyphicon glyphicon-search',
      'sub'
    ),
  ];
  constructor() {}

  ngOnInit(): void {}
}
