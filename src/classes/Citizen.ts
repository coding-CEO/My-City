export class Citizen {
  private hashedAadharNumber: string = "1"; //TODO: change this later
  constructor(hashedAadharNumber?: string) {
    if (hashedAadharNumber) this.hashedAadharNumber = hashedAadharNumber;
  }
  public static deepCopy = (source: Citizen): Citizen => {
    let temp = Object.create(source);
    Object.assign(temp, source);
    return temp;
  };
  public getHashedAadharNumber = (): string => {
    return this.hashedAadharNumber;
  };
  public setHashedAadharNumber = (hashedAadharNumber: string): void => {
    this.hashedAadharNumber = hashedAadharNumber;
  };
}
