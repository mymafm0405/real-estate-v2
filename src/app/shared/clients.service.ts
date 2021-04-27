import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Client } from './client.model';
import { GeneralService } from './general.service';

@Injectable({providedIn: 'root'})
export class ClientsService {
  clients: Client[] = [];

  newClientIdChanged = new Subject<string>();
  clientsChanged = new Subject<boolean>();
  clientAddingStatus = new Subject<boolean>();

  constructor(private generalService: GeneralService) {}

  addClient(newClient: Client) {
    this.generalService.addNewData('clients', newClient)
    .subscribe(
      (res: {name: string}) => {
        this.clients.push({...newClient, id: res.name});
        this.newClientIdChanged.next(res.name);
        this.clientsChanged.next(true);
        this.clientAddingStatus.next(true);
      }, error => {
        console.log(error);
        this.clientAddingStatus.next(false);
      }
    )
  }

  checkClientExist(qId: number, newClient: Client) {
    if (this.clients.find(client => client.qId === qId)) {
      this.newClientIdChanged.next(this.clients.find(client => client.qId === qId).id);
    } else {
      this.addClient(newClient);
    }
  }

  loadClients() {
    this.generalService.getArrayOfData('clients')
    .subscribe(
      (res: Client[]) => {
        this.clients = res;
        this.clientsChanged.next(true);
      }, error => {
        console.log(error);
      }
    )
  }
}
