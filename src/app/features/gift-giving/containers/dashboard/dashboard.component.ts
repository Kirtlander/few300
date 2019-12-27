import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { HolidayListItem, RecipientListModel } from '../../models';
import { GiftGivingState, selectHolidayListModel, selectRecipientModel } from '../../reducers';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardComponent implements OnInit {
  holidays$: Observable<HolidayListItem[]>;
  recipients$: Observable<RecipientListModel[]>;

  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
    this.holidays$ = this.store.select(selectHolidayListModel);
    this.recipients$ = this.store.select(selectRecipientModel);
  }

}
