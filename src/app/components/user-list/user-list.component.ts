import {Component, OnDestroy, OnInit} from '@angular/core';
import {UserService} from '../../services/user.service';
import { Subscription} from 'rxjs';
import {Router} from '@angular/router';
import {User} from '../../interfaces/User';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  users$: Subscription;

  isLoading: boolean;
  usersList: User[] = [];
  page: number;
  total: number;
  totalPages: number;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
   const page = history.state.page || 1;
   this.getUsers(page);
  }

  getUsers(pageNumber: number) {
    this.isLoading = true;

    this.users$ =  this.userService.getUserList(pageNumber).subscribe(
        ({data, page, total, total_pages}) => {
          this.usersList = data;
          this.page = page;
          this.total = total;
          this.totalPages = total_pages;

          this.isLoading = false;
        }
    );
  }

  nextPageHandler(page: number) {
    this.getUsers(page);
  }

  onClickCardHandler(id: number) {
    this.router.navigateByUrl(`users/${id}`, {
        state: { page: this.page }
    });
  }

  ngOnDestroy(): void {
    this.users$.unsubscribe();
  }

}
