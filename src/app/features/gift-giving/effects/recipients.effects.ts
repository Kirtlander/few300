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

  constructor(private actions$: Actions, private client: HttpClient) { }
}


interface GetRecipientsResponse {
  recipients: {
    id: string,
    name: string,
    email: string,
    holidays: string[]
  }[];
}
