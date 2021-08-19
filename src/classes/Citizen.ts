export class Citizen {
  private aadharNumber: string = "";
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
