export class Unit {
  constructor(
    public name: string,
    public description: string,
    public price: number,
    public quantity: number,
    public buildingId: string,
    public contractId: string,
    public id?: string
  ) {}
}
