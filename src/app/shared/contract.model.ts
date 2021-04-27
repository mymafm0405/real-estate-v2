export class Contract {
  constructor(public buildingId: string, public unitId: string, public clientId: string, public startDate: string, public price: number, public months: number, public status: string, public quantity: number, public endDate?: string, public id?: string) { }
}
