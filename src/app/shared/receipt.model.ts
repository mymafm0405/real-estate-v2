export class Receipt {
  constructor(
    public serial: number,
    public creationDate: string,
    public companyId: string,
    public contractId: string,
    public clientId: string,
    public unitId: string,
    public buildingId: string,
    public amount: number,
    public date: string,
    public details: string,
    public status: string,
    public id?: string
  ) {}
}
