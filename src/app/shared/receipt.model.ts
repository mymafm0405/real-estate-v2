export class Receipt {
  constructor(
    public serial: number,
    public date: string,
    public contractId: string,
    public clientId: string,
    public unitId: string,
    public buildingId: string,
    public amount: number,
    public status: string,
    public id?: string
  ) {}
}
