import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as holidayActions from '../actions/holidays.actions';
import { switchMap, map } from 'rxjs/operators';
import { HolidayEntity } from '../reducers/holidays.reducer';
import { environment } from '../../../../environments/environment';

@Injectable()
export class HolidaysEffects {

  // when we get loadHolidays -> loadHolidaysSucceeded
  loadTheHolidays$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(holidayActions.loadHolidays),
        // casting to GetHolidaysResponse only gives you intellisense, it doesn't validate the response...
        switchMap(() => this.client.get<GetHolidaysResponse>(`${environment.rootApiUrl}holidays`)
          .pipe(
            map(response => response.holidays),
            map(holidays => holidayActions.loadHolidaysSucceeded({ payload: holidays }))
          )
        )
      )
    , { dispatch: true });

  constructor(private actions$: Actions, private client: HttpClient) { }
}


interface GetHolidaysResponse {
  holidays: HolidayEntity[];
}
