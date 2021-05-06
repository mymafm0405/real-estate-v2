import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'src/app/shared/menu-item.model';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notificationsMenu: MenuItem[] = [
    new MenuItem(
      'Expired Contracts',
      'expired-contracts',
      'glyphicon glyphicon-exclamation-sign',
      'sub'
    ),
  ];
  constructor() {}

  ngOnInit(): void {}
}
