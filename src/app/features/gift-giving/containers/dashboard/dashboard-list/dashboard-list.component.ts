import { Component, OnInit, Input, OnChanges, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { HolidayListItem, RecipientListModel } from '../../../models';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardListComponent implements OnChanges {

  @Input()
  holidays: HolidayListItem[];
  @Input()
  recipients: RecipientListModel[];
  holidaysHash: {
    holiday: HolidayListItem,
    recipients: RecipientListModel[]
  }[];

  constructor() { }

  ngOnChanges() {
    this.holidaysHash = this.holidays
      .filter(h => h.date >= new Date().toISOString())
      .sort((l, r) => l.date.localeCompare(r.date))
      .map(h =>
        ({
          holiday: h,
          recipients: this.recipients.filter(r =>
            r.holidays
              .some(rh => rh.id === h.id)
          ).sort((a, b) => a.name.localeCompare(b.name))
        }));
  }

}
