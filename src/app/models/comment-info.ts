export class CommentCreateInfo {
  comment: string;
  user_id: string;
  news_id: number;

  constructor(comment: string, user_id: string, news_id: number) {
    this.comment = comment;
    this.user_id = user_id;
    this.news_id = news_id;
  }
}
export class CommentInfo extends CommentCreateInfo{
  id: string;
  created_at: string;
  updated_at: string;
  user_name: string;

  constructor(comment: string, user_id: string, news_id: number, id: string, created_at: string, updated_at: string, user_name: string) {
    super(comment, user_id, news_id);
    this.id = id;
    this.created_at = created_at;
    this.updated_at = updated_at;
    this.user_name = user_name;
  }
}
