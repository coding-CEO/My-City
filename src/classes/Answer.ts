export class Answer {
  public answerId: number;
  public title: string = "";
  public description: string = "";
  public timestamp: Date = new Date();
  public img_url: string = "";

  constructor(
    answerId: number,
    title?: string,
    description?: string,
    timestamp?: Date,
    img_url?: string
  ) {
    this.answerId = answerId;
    if (title) this.title = title;
    if (description) this.description = description;
    if (timestamp) this.timestamp = timestamp;
    if (img_url) this.img_url = img_url;
  }

  public static deepCopy = (source: Answer): Answer => {
    let temp = Object.create(source);
    Object.assign(temp, source);
    return temp;
  };
}
