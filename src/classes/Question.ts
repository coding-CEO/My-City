export class Question {
  public questionId: number;
  public citizenHashedAadharNumber: string;
  public title: string;
  public description: string;
  public timestamp: Date;
  //Here state and city index are 0 based indexed
  public stateIndex: number;
  public cityIndex: number;
  public area: string = "";
  public img_url: string = "";
  public answerId: number = -1;

  constructor(
    questionId: number,
    citizenHashedAadharNumber: string,
    title: string,
    description: string,
    timestamp: Date,
    stateIndex: number,
    cityIndex: number,
    img_url?: string,
    area?: string,
    answerId?: number
  ) {
    this.questionId = questionId;
    this.citizenHashedAadharNumber = citizenHashedAadharNumber;
    this.title = title;
    this.description = description;
    this.timestamp = timestamp;
    this.stateIndex = stateIndex;
    this.cityIndex = cityIndex;
    if (area) this.area = area;
    if (img_url) this.img_url = img_url;
    if (answerId) this.answerId = answerId;
  }

  public static deepCopy = (source: Question): Question => {
    let temp = Object.create(source);
    Object.assign(temp, source);
    return temp;
  };

  public isAnswered = (): boolean => {
    return this.answerId >= 0;
  };
}
