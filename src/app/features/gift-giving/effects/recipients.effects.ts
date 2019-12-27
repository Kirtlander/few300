import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import * as recipientActions from '../actions/recipients.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { RecipientEntity } from '../reducers/recipients.reducer';

@Injectable()
export class RecipientsEffects {

  constructor(private actions$: Actions, private client: HttpClient) { }

  // when we get recipientAdded -> (addRecipientSucceeded | addRecipientFailed)
  saveTheRecipient$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(recipientActions.recipientAdded),
        switchMap(originalAction => this.client.post<RecipientEntity>(`${environment.rootApiUrl}recipients`, {
          name: originalAction.payload.name,
          email: originalAction.payload.email,
          // selectedHolidayIds: originalAction.payload.selectedHolidayIds
        }).pipe(
          map(newRecipient => recipientActions.addRecipientSucceeded({
            payload: newRecipient,
            oldId: originalAction.payload.id,
            selectedHolidayIds: originalAction.payload.selectedHolidayIds
          })),
          catchError((err) => of(recipientActions.addRecipientFailed({
            payload: originalAction.payload,
            message: 'Could not add the recipient.'
          })))
        ))
      )
    , { dispatch: true });

  saveTheRecipientHolidays$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(recipientActions.addRecipientSucceeded),
        switchMap(originalAction =>
          this.client.put<string[]>(
            `${environment.rootApiUrl}recipients/${originalAction.payload.id}/holidays`,
            originalAction.selectedHolidayIds).pipe(
              map(() => recipientActions.addRecipientHolidaysSucceeded({
                payload: { ...originalAction.payload, selectedHolidayIds: originalAction.selectedHolidayIds }
              })),
              catchError((err) => of(recipientActions.addRecipientHolidaysFailed({
                payload: originalAction.payload,
                message: 'Could not add the recipient.'
              })))
            ))
      )
    , { dispatch: true }
  );

  // when we get loadRecipients -> loadRecipientsSucceeded
  loadTheRecipients$ = createEffect(() =>
    this.actions$
      .pipe(
        ofType(recipientActions.loadRecipients),
        switchMap(() => this.client.get<GetRecipientsResponse>(`${environment.rootApiUrl}recipients`)
          .pipe(
            map(response => response.recipients.map(
              recipient => ({
                id: recipient.id,
                name: recipient.name,
                email: recipient.email,
                selectedHolidayIds: recipient.holidays
              })
            )),
            map(recipients => recipientActions.loadRecipientsSucceeded({ payload: recipients }))
          )
        )
      )
    , { dispatch: true });
}


interface GetRecipientsResponse {
  recipients: {
    id: string,
    name: string,
    email: string,
    holidays: string[]
  }[];
}
