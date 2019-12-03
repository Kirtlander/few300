import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { HolidaysModel } from '../../models';
import { selectHolidayModel, GiftGivingState } from '../../reducers';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss']
})
export class HolidaysComponent implements OnInit {

  holidayModel$: Observable<HolidaysModel>;

  constructor(private store: Store<GiftGivingState>) { }

  ngOnInit() {
    this.holidayModel$ = this.store.select(selectHolidayModel);
  }

}
