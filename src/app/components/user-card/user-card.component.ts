import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {User} from '../../interfaces/User';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent implements OnInit {
  @Input() user: User;
  @Output() clicked = new EventEmitter<number>();

  constructor() { }

  ngOnInit() {
  }

  onClickHandler() {
    const {id} = this.user;
    this.clicked.emit(id);
  }

}
