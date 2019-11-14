export class CommentCreateInfo {
  comment: string;
  user_name: string;
  news_id: number;

  constructor(comment: string, user_name: string, news_id: number) {
    this.comment = comment;
    this.user_name = user_name;
    this.news_id = news_id;
  }
}
export class CommentInfo extends CommentCreateInfo {
  id: string;
  created_at: string;
  updated_at: string;
  time: string;

  constructor(comment: string, news_id: number, id: string, created_at: string, updated_at: string, user_name: string, time: string) {
    super(comment, user_name, news_id);
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.time = time;
  }
}
