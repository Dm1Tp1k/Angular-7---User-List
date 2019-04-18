import { Injectable } from '@angular/core';
import {HttpRequest, HttpResponse} from '@angular/common/http';

const MAX_CACHE_AGE = 30000;

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  cache = new Map();

  constructor() { }

  get(req: HttpRequest<any>): HttpResponse<any> | null {
    const entry = this.cache.get(req.urlWithParams);
    if (!entry) {
      return null;
    }
    const isExpired = (Date.now() - entry.entryTime) > MAX_CACHE_AGE;
    return isExpired ? null : entry.response;
  }

  put(req: HttpRequest<any>, res: HttpResponse<any>): void {
    const entry = { url: req.urlWithParams, response: res, entryTime: Date.now() };
    this.cache.set(req.urlWithParams, entry);
    this.deleteExpiredCache();
  }

  private deleteExpiredCache() {
    this.cache.forEach(entry => {
      if ((Date.now() - entry.entryTime) > MAX_CACHE_AGE) {
        this.cache.delete(entry.url);
      }
    });
  }

}
