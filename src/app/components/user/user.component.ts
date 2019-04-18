import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../../services/user.service';
import {Subscription} from 'rxjs';
import {User} from '../../interfaces/User';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit, OnDestroy {
  user$: Subscription;

  user: User;

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(({id}) => this.userData(id));
  }

  userData(id: number) {
   this.user$ = this.userService.getUser(id).subscribe(({data}) => this.user = data);
  }

  back() {
    this.router.navigateByUrl('users', {
      state: {
        page: history.state.page
      }
    });
  }

  ngOnDestroy(): void {
    this.user$.unsubscribe();
  }

}
