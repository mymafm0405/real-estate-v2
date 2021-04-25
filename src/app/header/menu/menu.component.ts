import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/shared/menu-item.model';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css'],
})
export class MenuComponent implements OnInit {
  mainMenu: MenuItem[] = [
    new MenuItem('Areas', 'areas', 'glyphicon glyphicon-map-marker', 'main'),
    new MenuItem(
      'Buildings',
      'buildings',
      'glyphicon glyphicon-object-align-bottom',
      'main'
    ),
    new MenuItem(
      'Contracts',
      'contracts',
      'glyphicon glyphicon-duplicate',
      'main'
    ),
    new MenuItem('Clients', 'clients', 'glyphicon glyphicon-user', 'main'),
    new MenuItem('Payments', 'payments', 'glyphicon glyphicon-usd', 'main'),
  ];
  constructor() {}

  ngOnInit(): void {}
}
