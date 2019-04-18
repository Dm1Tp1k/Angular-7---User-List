import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserCardComponent } from './components/user-card/user-card.component';
import { UserListComponent } from './components/user-list/user-list.component';
import { HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { PaginationComponent } from './components/pagination/pagination.component';
import { UserComponent } from './components/user/user.component';
import { CacheInterceptor} from './interceptors/cache.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    UserCardComponent,
    UserListComponent,
    PaginationComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: CacheInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
