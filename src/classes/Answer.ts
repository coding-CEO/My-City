export class Answer {
  public id: number;
  public title: string = "";
  public description: string = "";
  public timestamp: Date = new Date();
  public img_url: string = "";

  constructor(
    id: number,
    title?: string,
    description?: string,
    timestamp?: Date,
    img_url?: string
  ) {
    this.id = id;
    if (title) this.title = title;
    if (description) this.description = description;
    if (timestamp) this.timestamp = timestamp;
    if (img_url) this.img_url = img_url;
  }

  public isAnswered = (): boolean => {
    return this.id >= 0;
  };
}
