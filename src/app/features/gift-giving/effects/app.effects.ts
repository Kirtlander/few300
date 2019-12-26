import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import * as appActions from '../../../actions/app.actions';
import * as holidayActions from '../actions/holidays.actions';
import * as recipientActions from '../actions/recipients.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class AppEffects {

  constructor(private actions$: Actions) { }

  // turn addHolidayFailed -> applicationError
  addHolidayFailure$ = createEffect(() =>
    this.actions$.pipe(
      ofType(holidayActions.addHolidayFailed),
      map(x => appActions.applicationError({
        message: x.message, feature: 'Gift Giving'
      }))
    ));

  // turn applicationStarted into loadHolidays & load recipients
  loadHolidaysOnAppStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => holidayActions.loadHolidays())
    )
  );

  // turn applicationStarted into loadHolidays & load recipients
  loadRecipientsOnAppStart$ = createEffect(() =>
    this.actions$.pipe(
      ofType(appActions.applicationStarted),
      map(() => recipientActions.loadRecipients())
    )
  );

}
