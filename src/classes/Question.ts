export class Question {
  public id: number;
  public title: string;
  public description: string;
  public timestamp: Date;
  //TODO: Add state, destrict, city, area according to ER diagram
  public img_url: string = "";
  public ansId: number = -1;

  constructor(
    id: number,
    title: string,
    description: string,
    timestamp: Date,
    img_url?: string,
    ansId?: number
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.timestamp = timestamp;
    if (img_url) this.img_url = img_url;
    if (ansId) this.ansId = ansId;
  }
}
