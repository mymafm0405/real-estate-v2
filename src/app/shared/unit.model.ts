export class Unit {
  constructor(
    public name: string,
    public description: string,
    public quantity: number,
    public buildingId: string,
    public contractId: string,
    public status: string,
    public id?: string
  ) {}
}
