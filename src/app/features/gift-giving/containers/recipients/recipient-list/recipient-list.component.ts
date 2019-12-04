import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { Store } from '@ngrx/store';
import { GiftGivingState } from '../../../reducers';
import { RecipientListModel } from '../../../models';

@Component({
  selector: 'app-recipient-list',
  templateUrl: './recipient-list.component.html',
  styleUrls: ['./recipient-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RecipientListComponent implements OnInit {

  @Input() model: RecipientListModel[] = [];

  constructor() { }

  ngOnInit() {
  }

}
