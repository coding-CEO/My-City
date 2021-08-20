export class Question {
  public id: number;
  public title: string;
  public description: string;
  public timestamp: Date;
  public stateIndex: number;
  public cityIndex: number;
  public img_url: string = "";
  public ansId: number = -1;

  constructor(
    id: number,
    title: string,
    description: string,
    timestamp: Date,
    stateIndex: number,
    cityIndex: number,
    img_url?: string,
    ansId?: number
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.timestamp = timestamp;
    this.stateIndex = stateIndex;
    this.cityIndex = cityIndex;
    if (img_url) this.img_url = img_url;
    if (ansId) this.ansId = ansId;
  }

  public isAnswered = (): boolean => {
    return this.ansId >= 0;
  };
}
