import {Injectable} from '@angular/core';

// TODO: Remove 'HTTP_'

@Injectable()
export class Domain {
  public static domain = 'http://127.0.0.1:8000';
  public static path = 'http://localhost:80/news-server/storage/app/';
}
