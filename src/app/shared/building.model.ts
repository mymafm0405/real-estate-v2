export class Building {
  constructor(
    public name: string,
    public description: string,
    public unitsQuantity: number,
    public areaId: string,
    public id?: string
  ) {}
}
