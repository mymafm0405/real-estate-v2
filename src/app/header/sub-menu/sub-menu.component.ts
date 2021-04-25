import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/shared/menu-item.model';

@Component({
  selector: 'app-sub-menu',
  templateUrl: './sub-menu.component.html',
  styleUrls: ['./sub-menu.component.css'],
})
export class SubMenuComponent implements OnInit {
  @Input() subMenu: MenuItem[];

  constructor() {}

  ngOnInit(): void {}
}
