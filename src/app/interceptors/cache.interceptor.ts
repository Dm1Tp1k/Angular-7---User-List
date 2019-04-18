import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpResponse, HttpHandler } from '@angular/common/http';
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import {CacheService} from '../services/cache.service';

const CACHED_URL = 'api/users?page=';

@Injectable()
export class CacheInterceptor implements HttpInterceptor {
    constructor(private cache: CacheService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRequestInCache(req)) {
            return next.handle(req);
        }
        const response = this.cache.get(req);
        if (response !== null) {
            return of(response);
        }
        return next.handle(req).pipe(
            tap(event => {
                if (event instanceof HttpResponse) {
                    this.cache.put(req, event);
                }
            })
        );
    }
    private isRequestInCache(req: HttpRequest<any>) {
        return (req.method === 'GET') && (req.url.indexOf(CACHED_URL) > -1);
    }
}
