export class Citizen {
  private aadharNumber: string = "1"; //TODO: change this later
  constructor(aadharNumber?: string) {
    if (aadharNumber) this.aadharNumber = aadharNumber;
  }
  public static deepCopy = (source: Citizen): Citizen => {
    let temp = Object.create(source);
    Object.assign(temp, source);
    return temp;
  };
  public getAadharNumber = (): string => {
    return this.aadharNumber;
  };
  public setAadharNumber = (aadharNumber: string): void => {
    this.aadharNumber = aadharNumber;
  };
}
