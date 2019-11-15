export class NewsCreateInfo {
  title: string;
  short_intro: string;
  content: string;
  user_id: string;
  category_id: string;
  tags_id: number[];
  image: string;

  constructor(title: string, short_intro: string, content: string, user_id: string, category_id: string, tags_id: number[], image: string) {
    this.title = title;
    this.short_intro = short_intro;
    this.content = content;
    this.user_id = user_id;
    this.category_id = category_id;
    this.tags_id = tags_id;
    this.image = image;
  }
}
